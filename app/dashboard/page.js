'use client'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import staticData from '@/data/artists.json'
import toast from 'react-hot-toast'

export default function ManagerDashboardPage() {
  const [submissions, setSubmissions] = useState([])
  const [selected, setSelected] = useState(null)
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('artists') || '[]')
  const merged = [...staticData, ...saved]

  const unique = []
  const seen = new Set()

  for (const artist of merged) {
    const key = `${artist.name}-${artist.location}`
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(artist)
    }
  }

  setSubmissions(unique)
}, [])


const deleteArtist = (index) => {
  const updated = [...submissions]
  updated.splice(index, 1)
  localStorage.setItem('artists', JSON.stringify(updated))
  setSubmissions(updated)
  toast.success('Artist deleted!')
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">Manager Dashboard</h2>
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700">
       <table className="min-w-full table-auto">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Fee</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            {submissions.map((artist, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">{artist.name}</td>
                <td className="px-6 py-4">{artist.category}</td>
                <td className="px-6 py-4">{artist.location}</td>
                <td className="px-6 py-4">{artist.price || artist.priceRange}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => setSelected(artist)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">View</button>
                  <button onClick={() => deleteArtist(idx)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal artist={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
