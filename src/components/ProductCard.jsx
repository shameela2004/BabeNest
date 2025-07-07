import React from 'react'
import { useCart } from '../context/CartProvider'
import Button from './common/Button'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistProvider'
import { FaHeart } from 'react-icons/fa'  // <-- Import heart icon

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()

  const isInWishlist = wishlistItems.some(item => item.id === product.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleNavigate = () => {
    navigate(`/products/${product.id}`)
  }
  const displayStars=(rating)=>{
    const fullstars=Math.floor(rating || 0)
    const stars=[]
    for(let i=0;i<5;i++){
      stars.push(
        <span key={i} className={i<fullstars?"text-yellow-400":"text-gray-400"}>★</span>
      )
    } 
    return <div className='text-lg'>
        {stars}
       </div>
  }

  return (
    <div
      className="w-74 p-4 border rounded-2xl shadow hover:shadow-lg bg-white text-center transition duration-300 ease-in-out relative cursor-pointer"
      onClick={handleNavigate}
    >
      {/* Heart icon - top right corner */}
      <FaHeart
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 cursor-pointer  ${
          isInWishlist ? 'text-red-600' : 'text-gray-400 hover:text-red-400'
        }`}
        size={24}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      />

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-70 object-cover rounded"
        loading="lazy"
      />
      <h3 className="text-lg text-gray-800 font-semibold mt-2">{product.name}</h3>
      <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
      <p className="text-pink-600 font-bold mt-1">{product.category}</p>
      <p className='font-bold mt-1"'>{displayStars(product.rating)}</p>

      <Button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          addToCart(product)
        }}
        text="Add to Cart"
        className="mt-2 !bg-yellow-500 !hover:bg-yellow-600 text-white px-4 py-2 rounded"
      />
    </div>
  )
}

export default ProductCard

// import React from 'react'

// function ProductCard({product}) {
//   return (
//     <div className="w-64 p-4 border rounded-2xl shadow hover:shadow-lg bg-white text-center transition duration-300 ease-in-out">
//        <img src={product.image} alt={product.name}    className="w-full h-40 object-cover rounded" loading="lazy"/>
//        <h3 className="text-lg text-gray-800 font-semibold mt-2 ">{product.name}</h3>
//        <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
//        <p className="text-pink-600 font-bold mt-1">{product.category}</p>

//     </div>
//   )
// }

// export default ProductCard