'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ArtistCard from '@/components/ArtistCard'
import FilterPanel from '@/components/FilterPanel'
import staticData from '@/data/artists.json'

export default function ArtistListClient() {
  const [filters, setFilters] = useState({ category: '', location: '', price: '' })
  const [allArtists, setAllArtists] = useState([])

  const searchParams = useSearchParams()
  const categoryFromURL = searchParams.get('category') || ''

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('artists') || '[]')
    const filtered = saved.filter(
      newArtist => !staticData.some(
        staticArtist =>
          staticArtist.name === newArtist.name &&
          staticArtist.location === newArtist.location
      )
    )
    setAllArtists([...staticData, ...filtered])
    setFilters(prev => ({ ...prev, category: categoryFromURL }))
  }, [categoryFromURL])

const parseRange = str => {
  if (!str) return [0, Infinity]

  // Handle ₹20k+
  if (str.includes('+')) {
    const min = parseInt(str.replace(/[₹,\s,+]/g, ''))
    return [min, Infinity]
  }

  // Handle ₹5k–₹10k
  const numbers = str
    .replace(/[₹,\s]/g, '')
    .split(/[–-]/)
    .map(n => parseInt(n))

  if (numbers.length === 2 && numbers.every(n => !isNaN(n))) {
    return numbers
  }

  return [0, Infinity]
}

  const filteredArtists = allArtists.filter(artist => {
    const categoryMatch = filters.category
      ? Array.isArray(artist.category)
        ? artist.category.includes(filters.category)
        : artist.category === filters.category
      : true

    const locationMatch = filters.location
      ? artist.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true

    const [artistMin, artistMax] = parseRange(artist.price || artist.priceRange || '')
    const [filterMin, filterMax] = parseRange(filters.price)

    const priceMatch = filters.price
      ? artistMin <= filterMax && artistMax >= filterMin
      : true

    return categoryMatch && locationMatch && priceMatch
  })

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-black">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-white">Discover Artists</h2>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredArtists.map((artist, idx) => (
          <ArtistCard key={idx} artist={artist} />
        ))}
      </div>
    </div>
  )
}
