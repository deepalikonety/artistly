'use client'
export default function Modal({ artist, onClose }) {
  if (!artist) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-bold text-purple-700 mb-2">{artist.name}</h3>
        <p><strong>Category:</strong> {artist.category}</p>
        <p><strong>Location:</strong> {artist.location}</p>
        <p><strong>Fee:</strong> {artist.price || artist.priceRange}</p>
        <p><strong>Languages:</strong> {artist.languages?.join(', ')}</p>
        <p className="mt-4 text-sm text-gray-600">{artist.bio}</p>
        <button onClick={onClose} className="mt-6 w-full bg-purple-600 text-white py-2 rounded">Close</button>
      </div>
    </div>
  )
}
