'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast'

const schema = yup.object({
  name: yup.string().required(),
  bio: yup.string().required(),
  category: yup.string().required(), // changed to string
  languages: yup.array().min(1).required(),
  price: yup.string().required(),
  location: yup.string().required(),
  image: yup.string().optional()
})

export default function OnboardFormPage() {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      languages: []
    }
  })

  const [preview, setPreview] = useState(null)

  const onSubmit = data => {
    const existing = JSON.parse(localStorage.getItem('artists') || '[]')
    localStorage.setItem('artists', JSON.stringify([...existing, data]))
    toast.success('Artist successfully onboarded!')
  }

  const categories = ['Singer', 'Dancer', 'DJ', 'Speaker']
  const languages = ['Hindi', 'English', 'Kannada', 'Tamil']
  const prices = ['₹5k–₹10k', '₹10k–₹20k', '₹20k+']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">Onboard as Artist</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow space-y-6">
        
        <input {...register('name')} placeholder="Full Name" className="w-full px-4 py-2 rounded border dark:bg-gray-800" />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <textarea {...register('bio')} placeholder="Artist Bio" rows={4} className="w-full px-4 py-2 rounded border dark:bg-gray-800" />
        {errors.bio && <p className="text-red-500 text-sm">Bio is required</p>}

        <select {...register('category')} className="w-full px-4 py-2 rounded border dark:bg-gray-800">
          <option value="">Select a Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">Category is required</p>}

        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block mb-1 font-medium">Languages Spoken</label>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, i) => (
                  <label key={i} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={lang}
                      checked={field.value.includes(lang)}
                      onChange={e => {
                        const value = e.target.value
                        field.onChange(
                          field.value.includes(value)
                            ? field.value.filter(v => v !== value)
                            : [...field.value, value]
                        )
                      }}
                    />
                    {lang}
                  </label>
                ))}
              </div>
              {errors.languages && <p className="text-red-500 text-sm">Pick at least one</p>}
            </div>
          )}
        />

        <select {...register('price')} className="w-full px-4 py-2 rounded border dark:bg-gray-800">
          <option value="">Select Fee Range</option>
          {prices.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>
        {errors.price && <p className="text-red-500 text-sm">Price range is required</p>}

        <input {...register('location')} placeholder="City or Location" className="w-full px-4 py-2 rounded border dark:bg-gray-800" />
        {errors.location && <p className="text-red-500 text-sm">Location is required</p>}

        <input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files?.[0]
            if (!file) return

            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'artist_preset') // your Cloudinary preset

            try {
              const res = await fetch('https://api.cloudinary.com/v1_1/ds7avp92g/image/upload', {
                method: 'POST',
                body: formData
              })

              const data = await res.json()
              if (data.secure_url) {
                setValue('image', data.secure_url)
                setPreview(data.secure_url)
                toast.success('Image uploaded!')
              } else {
                toast.error('Upload failed')
              }
            } catch (err) {
              toast.error('Something went wrong!')
            }
          }}
          className="w-full"
        />

        {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded object-cover mt-4" />}

        <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  )
}
