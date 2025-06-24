import { Suspense } from 'react'
import ArtistListClient from '@/components/ArtistListClient'

export default function ArtistListingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading artists...</div>}>
      <ArtistListClient />
    </Suspense>
  )
}
