import React from 'react'

function CategoryFilter({categories,selectedCategory,setSelectedCategory}) {

  return (
    <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
        <option value="">All Categories</option>
        {categories.map((category,index)=>(
            <option key={index} value={category}>{category}</option>

        ))}
    </select>
  )
}

export default CategoryFilter