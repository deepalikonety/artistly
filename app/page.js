'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const categories = [
    { title: 'Singer', image: '/assets/singers.jpg' },
    { title: 'Dancer', image: '/assets/dancers.jpg' },
    { title: 'Speaker', image: '/assets/speakers.jpg' },
    { title: 'DJ', image: '/assets/djs.jpg' }
  ]

  const eventTypes = ['Weddings', 'College Fests', 'Corporate Events', 'Birthdays', 'Community Shows', 'Concerts', 'Open-Mic', 'Art-Exhibition']

  const benefits = [
    ['✅ Verified Artists', 'Handpicked professionals only'],
    ['💸 Transparent Pricing', 'No hidden charges ever'],
    ['📅 Easy Booking', 'Just a few clicks to confirm'],
    ['📞 24/7 Support', 'We’re here for you always']
  ]

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-white dark:bg-black overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-purple-400 via-blue-300 to-pink-100/50 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Bring Your Event to Life</h1>
          <p className="mb-6 text-lg max-w-xl mx-auto">Find the perfect artist for weddings, fests, and corporate events.</p>
          <Link href="/artists" className="bg-white text-purple-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            Explore Artists
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Why Choose Artistly?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map(([title, desc], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center"
              >
                <h4 className="font-bold text-purple-600 dark:text-purple-300">{title}</h4>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Browse by Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/artists?category=${encodeURIComponent(cat.title)}`}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:scale-105 transition block"
              >
                <img src={cat.image} alt={cat.title} className="h-48 w-full object-cover object-center" />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-center text-purple-600 dark:text-purple-300">{cat.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-12 px-4 md:px-6 bg-white dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Perfect For Every Occasion</h3>
          <div className="flex gap-4 overflow-x-auto max-w-full scrollbar-hide px-1">
            {eventTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[150px] sm:min-w-[180px] bg-purple-100 dark:bg-gray-800 text-center p-4 rounded-xl shadow text-purple-700 dark:text-white"
              >
                {type}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
