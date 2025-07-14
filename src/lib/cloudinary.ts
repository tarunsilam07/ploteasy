export const cloudinaryUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ploteasy') 

  const res = await fetch('https://api.cloudinary.com/v1_1/dkm46q09h/image/upload', {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return data.secure_url as string
}
