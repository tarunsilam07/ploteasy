import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import clsx from 'clsx';
import { FormValues } from '../AddPropertyForm';

type PropertyDetailsStepProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  inputClass: string;
  errorClass: string;
};

const PropertyDetailsStep = ({ register, errors, watch, inputClass, errorClass }: PropertyDetailsStepProps) => {
  const selectedType = watch('type');
  const bedroomOptions = Array.from({ length: 6 }, (_, i) => i + 1).map(String).concat('6+');
  const bathroomOptions = Array.from({ length: 6 }, (_, i) => i + 1).map(String).concat('6+');
  const facingOptions = ['Not Specified', 'North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">Property Address <span className="text-red-500">*</span></label>
          <input
            id="address"
            {...register('address', { required: 'Property address is required' })}
            placeholder="Property Address"
            className={clsx(inputClass, errors.address && errorClass)}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">Title <span className="text-red-500">*</span></label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            placeholder="e.g., Prime Land for Sale, Spacious 3BHK Apartment"
            className={clsx(inputClass, errors.title && errorClass)}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="type" className="block text-gray-700 text-sm font-medium mb-2">Property Type</label>
          <select id="type" {...register('type')} className={inputClass}>
            <option value="land">Open Land / Farm Land</option>
            <option value="building">House Property</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="saleType" className="block text-gray-700 text-sm font-medium mb-2">Sale/Rent</label>
          <select id="saleType" {...register('saleType')} className={inputClass}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        
        {selectedType === 'land' && (
          <div>
            <label htmlFor="landCategory" className="block text-gray-700 text-sm font-medium mb-2">Land Category</label>
            <select id="landCategory" {...register('landCategory', { required: 'Land category is required' })} className={inputClass}>
              <option value="">Select Category</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {errors.landCategory && <p className="text-red-500 text-xs mt-1">{errors.landCategory.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="area" className="block text-gray-700 text-sm font-medium mb-2">Total Area <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input
              id="area"
              {...register('area', {
                required: 'Area is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Area cannot be negative' },
                validate: (value) => Number(value) > 0 || 'Area must be a positive number'
              })}
              placeholder="e.g., 1200"
              type="number"
              step="any"
              className={clsx(inputClass, errors.area && errorClass, 'flex-grow')}
            />
            <select
              {...register('areaUnit', { required: 'Area unit is required' })}
              className={clsx(inputClass, errors.areaUnit && errorClass, 'w-32')}
            >
              <option value="sqft">sq.ft</option>
              <option value="sqyd">sq.yd</option>
              <option value="sqm">sq.m</option>
              <option value="acres">acres</option>
            </select>
          </div>
          {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
          {errors.areaUnit && <p className="text-red-500 text-xs mt-1">{errors.areaUnit.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Price cannot be negative' },
              validate: (value) => Number(value) > 0 || 'Price must be a positive number'
            })}
            placeholder="e.g., 5000000"
            type="number"
            className={clsx(inputClass, errors.price && errorClass)}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="discount" className="block text-gray-700 text-sm font-medium mb-2">Discount (%)</label>
          <input
            id="discount"
            {...register('discount', {
              valueAsNumber: true,
              min: { value: 0, message: 'Discount cannot be negative' },
              max: { value: 100, message: 'Discount cannot be more than 100%' }
            })}
            placeholder="e.g., 10"
            type="number"
            className={clsx(inputClass, errors.discount && errorClass)}
          />
          {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount.message}</p>}
        </div>

        {selectedType === 'building' && (
          <>
            <div>
              <label htmlFor="floors" className="block text-gray-700 text-sm font-medium mb-2">Number of Floors</label>
              <input
                id="floors"
                {...register('floors', {
                  valueAsNumber: true,
                  min: { value: 0, message: 'Floors cannot be negative' }
                })}
                placeholder="e.g., 2"
                type="number"
                className={clsx(inputClass, errors.floors && errorClass)}
              />
              {errors.floors && <p className="text-red-500 text-xs mt-1">{errors.floors.message}</p>}
            </div>
            <div>
              <label htmlFor="parking" className="block text-gray-700 text-sm font-medium mb-2">Parking</label>
              <input
                id="parking"
                {...register('parking', {
                  valueAsNumber: true,
                  min: { value: 0, message: 'Parking spots cannot be negative' }
                })}
                placeholder="e.g., 1"
                type="number"
                className={clsx(inputClass, errors.parking && errorClass)}
              />
              {errors.parking && <p className="text-red-500 text-xs mt-1">{errors.parking.message}</p>}
            </div>
          </>
        )}
      </div>

      {selectedType === 'building' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-medium mb-2">Bedrooms</label>
            <select id="bedrooms" {...register('bedrooms')} className={inputClass}>
              <option value="">Select</option>
              {bedroomOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-gray-700 text-sm font-medium mb-2">Bathrooms</label>
            <select id="bathrooms" {...register('bathrooms')} className={inputClass}>
              <option value="">Select</option>
              {bathroomOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="propertyAge" className="block text-gray-700 text-sm font-medium mb-2">Property Age</label>
            <select id="propertyAge" {...register('propertyAge')} className={inputClass}>
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="<5 Years">&lt; 5 Years</option>
              <option value="5-10 Years">5-10 Years</option>
              <option value=">10 Years">&gt; 10 Years</option>
            </select>
          </div>
          <div>
            <label htmlFor="furnishing" className="block text-gray-700 text-sm font-medium mb-2">Furnishing</label>
            <select id="furnishing" {...register('furnishing')} className={inputClass}>
              <option value="">Select</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Fully-furnished">Fully-furnished</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="facing" className="block text-gray-700 text-sm font-medium mb-2">Facing</label>
          <select id="facing" {...register('facing')} className={inputClass}>
            {facingOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      {selectedType === 'building' && (
        <div>
          <label htmlFor="otherDetails" className="block text-gray-700 text-sm font-medium mb-2">Other Details</label>
          <textarea
            id="otherDetails"
            {...register('otherDetails')}
            placeholder="e.g., Amenities, nearby landmarks, or any other relevant information."
            rows={4}
            className={inputClass}
          ></textarea>
        </div>
      )}

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">Add as a Premium?</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input type="radio" {...register('isPremium')} value="yes" className="form-radio" />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input type="radio" {...register('isPremium')} value="no" className="form-radio" />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;