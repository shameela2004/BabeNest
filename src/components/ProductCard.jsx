// import React from 'react'
// import { useCart } from '../context/CartProvider'
// import Button from './common/Button'
// import { useNavigate } from 'react-router-dom'
// import { useWishlist } from '../context/WishlistProvider'
// import { FaHeart } from 'react-icons/fa'

// function ProductCard({ product }) {
//   const navigate = useNavigate()
//   const { addToCart } = useCart()
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()

//   const isInWishlist = wishlistItems.some(item => item.id === product.id)

//   const toggleWishlist = (e) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (isInWishlist) {
//       removeFromWishlist(product.id)
//     } else {
//       addToWishlist(product)
//     }
//   }

//   const handleNavigate = () => {
//     navigate(`/products/${product.id}`)
//   }
//   // const displayStars=(rating)=>{
//   //   const fullstars=Math.floor(rating || 0)
//   //   const stars=[]
//   //   for(let i=0;i<5;i++){
//   //     stars.push(
//   //       <span key={i} className={i<fullstars?"text-yellow-400":"text-gray-400"}>★</span>
//   //     )
//   //   } 
//   //   return <div className='text-lg'>
//   //       {stars}
//   //      </div>
//   // }

//   return (
//     <div
//       className="w-74 p-4 border rounded-2xl shadow hover:shadow-lg bg-white text-center transition duration-300 ease-in-out relative cursor-pointer"
//       onClick={handleNavigate}
//     >
      

//       <FaHeart
//         onClick={toggleWishlist}
//         className={`absolute top-3 right-3 cursor-pointer  ${
//           isInWishlist ? 'text-red-600' : 'text-gray-400 hover:text-red-400'
//         }`}
//         size={24}
//         title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//       />

//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-70 object-cover rounded"
//         loading="lazy"
//       />
//       <h3 className="text-lg text-gray-800 font-semibold mt-2">{product.name}</h3>
//       <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
//       <p className="text-pink-600 font-bold mt-1">{product.category}</p>
//       <div className=' mt-1'> <span className={product.rating>3.5?"text-white bg-green-600 font-bold px-2 rounded":product.rating>2.5 &&product.rating<=3.5?"text-white bg-yellow-500 font-bold px-2 rounded":product.rating<=2.5 &&product.rating>0?"text-white bg-red-600 font-bold px-2 rounded":null}>
//           {product.rating} {product.rating>0?"★":null}
//         </span></div>

//       <Button
//         onClick={(e) => {
//           e.preventDefault()
//           e.stopPropagation()
//           addToCart(product)
//         }}
//         text="Add to Cart"
//         className="mt-2 !bg-orange-500 !hover:bg-orange-600 text-white px-4 py-2 rounded"
//       />
//     </div>
//   )
// }

// export default ProductCard













import React from 'react'
import { useCart } from '../context/CartProvider'
import Button from './common/Button'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistProvider'
import { FaHeart } from 'react-icons/fa'

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

  return (
    <div
  className="bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer border hover:border-pink-400"
  onClick={handleNavigate}
>
      {/* Wishlist Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FaHeart
          size={20}
          className={`${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 rounded-t-xl">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-contain p-3 hover:scale-105 transition duration-500"
    loading="lazy"
  />
</div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-pink-600 font-bold text-lg mt-1">₹{product.price}</p>
        <p className="text-gray-500 text-sm">{product.category}</p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full
            ${product.rating > 3.5
              ? 'bg-green-100 text-green-700'
              : product.rating > 2.5
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
            }`}>
            ★ {product.rating || 0}
          </span>
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addToCart(product)
          }}
          text="Add to Cart"
          className="mt-3 !bg-pink-600 hover:!bg-pink-700 text-white w-full py-2 rounded"
        />
      </div>
    </div>
  )
}

export default ProductCard


