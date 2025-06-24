export default function FilterPanel({ filters, setFilters }) {
  const categories = ['Singer', 'Dancer', 'Speaker', 'DJ']
  const priceRanges = ['₹5k–₹10k', '₹10k–₹20k', '₹20k+']

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
        className="px-4 py-2 rounded border dark:bg-gray-900"
      >
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
        className="px-4 py-2 rounded border dark:bg-gray-900"
      />

      <select
        value={filters.price}
        onChange={e => setFilters({ ...filters, price: e.target.value })}
        className="px-4 py-2 rounded border dark:bg-gray-900"
      >
        <option value="">All Prices</option>
        {priceRanges.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>
    </div>
  )
}
