// import React from 'react'
// import { useWishlist } from '../context/WishlistProvider'
// import { useCart } from '../context/CartProvider'

// import Button from '../components/common/Button'
// import Navbar from '../components/common/Navbar'
// import { useNavigate } from 'react-router-dom'

// function Wishlist() {
//   const { wishlistItems, removeFromWishlist } = useWishlist()
//   const navigate=useNavigate()
//   const { addToCart } = useCart()
//   //   const handleNavigate = () => {
//   //   navigate(`/products/${product.id}`)
//   // }

//   if (wishlistItems.length === 0) {
//     return (
//       <>
//         <Navbar/>
//         <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
//           <h2 className="text-2xl font-semibold mb-4">Your Wishlist is empty 😔</h2>
//           <p>Add some products you love!</p>
//         </div>
//       </>
//     )
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-pink-600 mb-6">My Wishlist</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   {wishlistItems.map((product) => (
//     <div
//       key={product.id}
//       className="border rounded-lg shadow p-4 bg-white flex flex-col cursor-pointer"
//       onClick={() => navigate(`/products/${product.id}`)}  
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-48 object-cover rounded mb-4"
//         loading="lazy"
//       />
//       <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//       <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
//       <p className="text-gray-600 mt-1">{product.category}</p>

//       <div
//         className="mt-auto flex gap-2 pt-4"
//         onClick={(e) => e.stopPropagation()} // stop click bubbling for buttons
//       >
//         <Button
//         onClick={(e) => {
//           e.preventDefault()
//           e.stopPropagation()
//           addToCart({
//   id: product.ProductId,
//   name: product.ProductName,
//   price: product.ProductPrice,
//   image: product.ProductImage,
//   category: product.CategoryName
// })
//         }}
//         text="Add to Cart"
//           className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded py-2"
//         />
//         <Button
//   onClick={() => removeFromWishlist(product.Id)} // backend wishlist id
//   text="Remove"
//   className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2"
// />
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </>
//   )
// }

// export default Wishlist



import React from 'react';
import { useWishlist } from '../context/WishlistProvider';
import { useCart } from '../context/CartProvider';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Your Wishlist is empty 😔</h2>
          <p>Add some products you love!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id} // WishlistDto Id
              className="border rounded-lg shadow p-4 bg-white flex flex-col cursor-pointer"
              onClick={() => navigate(`/products/${item.productId}`)}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover rounded mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
              <p className="text-pink-600 font-bold mt-1">₹{item.productPrice}</p>
              <p className="text-gray-600 mt-1">{item.categoryName}</p>

              <div
                className="mt-auto flex gap-2 pt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({
                      id: item.productId,
                      name: item.productName,
                      price: item.productPrice,
                      image: item.productImage,
                      category: item.categoryName,
                    });
                  }}
                  text="Add to Cart"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded py-2"
                />
                <Button
                  onClick={() => removeFromWishlist(item.id)}
                  text="Remove"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;

