export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 mt-12 border-t dark:border-gray-800 relative z-10">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Artistly. All rights reserved.
      </p>
      <div className="flex justify-center mt-3 gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xl hover:scale-110 transition">📸</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xl hover:scale-110 transition">🐦</a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xl hover:scale-110 transition">▶️</a>
      </div>
    </footer>
  )
}
