'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import axios from 'axios'
import { cloudinaryUpload } from '@/lib/cloudinary'

import FormSteps from './AddPropertyFormUI'

const center = { lat: 17.385044, lng: 78.486671 }

export type FormValues = {
  username: string
  contact: string
  address: string
  title: string
  type: 'building' | 'land'
  saleType: 'sale' | 'rent'
  landCategory?: 'Agricultural' | 'Residential' | 'Commercial'
  floors?: number
  bedrooms?: string
  bathrooms?: string
  propertyAge?: 'New' | '<5 Years' | '5-10 Years' | '>10 Years'
  furnishing?: 'Unfurnished' | 'Semi-furnished' | 'Fully-furnished'
  facing?: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West' | 'Not Specified'
  otherDetails?: string
  area: number
  areaUnit: 'sqft' | 'sqyd' | 'sqm' | 'acres'
  location: { lat: number; lng: number }
  images: string[]
  description: string
  price: number
  discount?: number
  parking?: number
  isPremium?: 'yes' | 'no'
}

export default function AddPropertyForm() {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      type: 'land',
      saleType: 'sale',
      location: center,
      images: [],
      areaUnit: 'sqft',
      isPremium: 'no',
      facing: 'Not Specified'
    }
  })

  const selectedType = watch('type')

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return
    setUploading(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const url = await cloudinaryUpload(file)
      uploaded.push(url)
    }
    const updatedImages = [...images, ...uploaded]
    setImages(updatedImages)
    setValue('images', updatedImages)
    setUploading(false)
  }

  const handleRemoveImage = (index: number) => {
    const updated = [...images]
    updated.splice(index, 1)
    setImages(updated)
    setValue('images', updated)
  }

  const steps = ['Owner Details', 'Property Info', 'Upload Images', 'Location', 'Review & Submit']

  const goToNextStep = async () => {
    let fields: (keyof FormValues)[] = []
    if (currentStep === 0) fields = ['username', 'contact']
    if (currentStep === 1) {
      fields = ['address', 'title', 'type', 'saleType', 'area', 'areaUnit', 'price']
      if (selectedType === 'land') {
        fields.push('landCategory')
      }
    }
    if (currentStep === 2) fields = ['images']
    if (currentStep === 3) fields = ['location']
    
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const firstErrorField = fields.find(field => errors[field]);
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.focus();
      }
      toast.error('Please fill in all required fields.');
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = {
        ...getValues(),
        area: `${getValues('area')} ${getValues('areaUnit')}`,
        price: `${getValues('price')}`,
        facing: getValues('facing') === 'Not Specified' ? null : getValues('facing'),
        isPremium: getValues('isPremium') === 'yes'
      };
      
      if (data.type === 'land') {
        delete data.bedrooms;
        delete data.bathrooms;
        delete data.floors;
        delete data.furnishing;
        delete data.propertyAge;
        delete data.otherDetails;
        delete data.parking;
      } else if (data.type === 'building') {
        delete data.landCategory;
      }
      
      const response = await axios.post('/api/property/add', data);
      
      console.log('Form data submitted:', response.data.data);
      toast.success('Property submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatReviewValue = (value: string | number | null | undefined, placeholder: string = 'N/A') => {
    if (value === 'Not Specified' || value === null || value === undefined || value === '') {
      return placeholder;
    }
    return value;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 mt-10 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#20b4b1] mb-8">Add New Property</h1>

      {/* Stepper with integrated progress line */}
      <div className="flex flex-row justify-between mb-10 overflow-x-auto whitespace-nowrap relative">
        {/* Progress Line Track */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-300 z-0">
          {/* Progress Line Fill */}
          <div 
            className="h-full bg-[#20b4b1] transition-all duration-500 ease-in-out" 
            style={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%` 
            }} 
          />
        </div>

        {steps.map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative mb-4 sm:mb-0 px-2 z-10">
            <div
              className={clsx(
                'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shadow-md shrink-0 transition-colors duration-300',
                currentStep >= i ? 'bg-[#20b4b1] text-white' : 'bg-gray-200 text-gray-600'
              )}
            >
              {i + 1}
            </div>
            {/* The label is hidden on mobile and shown on larger screens */}
            <span className={clsx('text-xs mt-2 text-center hidden sm:block', currentStep >= i ? 'text-[#20b4b1]' : 'text-gray-400')}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <FormSteps
          currentStep={currentStep}
          register={register}
          errors={errors}
          watch={watch}
          images={images}
          uploading={uploading}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          location={getValues('location')}
          setLocation={(latlng) => setValue('location', latlng)}
          getValues={getValues}
          formatReviewValue={formatReviewValue}
        />

        <div className="flex justify-between mt-10">
          {currentStep > 0 && (
            <button type="button" onClick={goToPreviousStep} className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition" disabled={isSubmitting}>
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={goToNextStep} className="bg-[#20b4b1] text-white px-6 py-2 rounded-lg hover:bg-[#1ca8a5] transition" disabled={isSubmitting}>
              Next
            </button>
          ) : (
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <button type="button" className="bg-[#20b4b1] text-white px-6 py-2 rounded-lg hover:bg-[#1ca8a5] transition" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Property'}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
                <DialogTitle className="text-lg font-semibold mb-4">Confirm Submission</DialogTitle>
                <p className="mb-6 text-sm text-gray-600">
                  Are you sure you want to submit this property? Please confirm.
                </p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition">Cancel</button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded bg-[#20b4b1] text-white hover:bg-[#1ca8a5] transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm'}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </form>
    </div>
  )
}