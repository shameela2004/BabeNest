import React from 'react'

function PriceFilter({ priceRange, setPriceRange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Min Price"
        value={priceRange.min}
        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceRange.max}
        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  )
}

export default PriceFilter
