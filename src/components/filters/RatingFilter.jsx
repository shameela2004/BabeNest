import React from 'react'

function RatingFilter({selectedRating,setSelectedRating}) {
  return (
     <select
      value={selectedRating}
      onChange={(e) => setSelectedRating(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
        <option value={0}>Rating</option>
        {[5,4,3,2,1].map((rating)=>(
            <option key={rating} value={rating}>{rating}</option>
        ))}
        </select>
  )
}

export default RatingFilter