export default function ArtistCard({ artist }) {
  const categories = Array.isArray(artist.category) ? artist.category : [artist.category]
  const languages = Array.isArray(artist.languages) ? artist.languages : [artist.languages]

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:scale-[1.03] transition-transform duration-200">
      
      <div className="aspect-square w-full overflow-hidden">
  <img
    src={artist.image || '/assets/default-avatar.png'}
    alt={artist.name}
    className="object-cover object-center w-full h-full"
  />
</div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 text-center">{artist.name}</h3>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, i) => (
            <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{cat}</span>
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 text-center">{artist.location}</div>

        <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
          {artist.priceRange || artist.price}
        </div>

        <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Ask for Quote
        </button>
      </div>
    </div>
  )
}
