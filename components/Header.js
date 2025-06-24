'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState,useEffect} from 'react'
export default function Header() {
  
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null // or return a placeholder


  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-black/50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Artistly</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink href="/" label="Home" active={pathname === '/'} />
          <NavLink href="/artists" label="Artists" active={pathname === '/artists'} />
          <NavLink href="/onboard" label="Onboard" active={pathname === '/onboard'} />
          <NavLink href="/dashboard" label="Dashboard" active={pathname === '/dashboard'} />
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 px-2 py-1 border rounded bg-white dark:bg-black"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`hover:text-purple-600 transition ${
        active ? 'underline font-semibold text-purple-600' : ''
      }`}
    >
      {label}
    </Link>
  )
}
