// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useCart } from '../context/CartProvider'
// import Navbar from './common/Navbar'
// import axios from 'axios'

// function ProductDetails() {
//   const {id}=useParams()
//   const [product,setProduct]=useState(null)
//   const {addToCart}=useCart()
//   const navigate=useNavigate()
//   useEffect(()=>{
//     axios.get(`http://localhost:3000/products/${id}`).
//     then((res)=>setProduct(res.data))
//     .catch((e)=>console.log("error in fetching..",e))
//   },[id])
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
//   const handleBuyNow=()=>{
//     addToCart(product)
//     navigate("/checkout")
//   }
//       if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center text-gray-600 mt-10">Loading product details...</div>
//       </>
//     );
//   }
//   return (
    
//      <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full md:w-1/2 h-130 object-cover rounded-lg shadow"
//         />
//         <div className="md:w-1/2 space-y-4">
//           <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
//           <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>

//           {/* Rating */}
//           <div>            
//         <span className={product.rating>3.5?"text-white bg-green-600 font-bold text-xl px-2 rounded":product.rating>2.5 &&product.rating<=3.5?"text-white bg-yellow-500 font-bold text-xl px-2 rounded":product.rating<=2.5 &&product.rating>0?"text-white bg-red-600 text-xl font-bold px-2 rounded":null}>
//           {product.rating} {product.rating ?"★":null}
//         </span>
    
//           </div>

//           <p className="text-gray-600">{product.description}</p>
//           <p className="text-sm text-gray-500">Stock: {product.stock}</p>

//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={() => addToCart(product)}
//               className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded shadow"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* === REVIEWS SECTION === */}
// {product.reviews && product.reviews.length > 0 ? (
//   <div className="mt-10">
//     {/* Average rating + total */}
//     <div className="mb-6 text-center">
//       <h3 className="text-2xl font-bold text-pink-700">Customer Reviews</h3>
     
//       <p className="text-gray-500">{product.reviews.length} reviews</p>
//     </div>

//     {/* Review Cards */}
//     <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
//       {product.reviews.map((r, index) => (
//         <div
//           key={index}
//           className="bg-white shadow-sm border border-gray-200 rounded-lg p-5"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             {/* Circle Avatar*/}
//             <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
//               {r.userName.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <p className="text-pink-700 font-semibold">{r.userName}</p>
//               <p className="text-sm text-gray-400">
//                 {new Date(r.date).toLocaleDateString()}
//               </p>
//             </div>
//           </div>

//           {/* Star Rating */}
//           <div className="flex gap-1 text-yellow-500 mb-1">
//             {Array.from({ length: 5 }, (_, i) => (
//               <span key={i}>{i < r.rating ? "★" : "☆"}</span>
//             ))}
//           </div>

//           {/* Review Text */}
//           <p className="text-gray-800 mt-2">{r.review}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// ) : (
//   <p className="text-gray-500 italic mt-6">No reviews yet. Be the first to review!</p>
// )}


//     </>
//   );
// }

// export default ProductDetails












// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCart } from '../context/CartProvider';
// import Navbar from './common/Navbar';
// import axios from 'axios';
// import { FaHeart } from 'react-icons/fa';
// import { useWishlist } from '../context/WishlistProvider';
// import api from '../api/axios';

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  
// const isInWishlist = wishlistItems.some(item => item.id === Number(id))
  
//     const toggleWishlist = (e) => {
//       e.preventDefault()
//       e.stopPropagation()
  
//       if (isInWishlist) {
//         removeFromWishlist(product.id)
//       } else {
//         addToWishlist(product)
//       }
//     }

// useEffect(() => {
//   api.get(`/products/${id}`)
//     .then(res => setProduct(res.data.data))  // your backend wraps data inside "data"
//     .catch(e => console.log('error in fetching..', e));
// }, [id]);

//   const handleBuyNow = () => {
//     addToCart(product);
//     navigate('/checkout');
//   };

//   if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center text-gray-600 mt-10">
//           Loading product details...
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6 md:flex gap-10 ">
          
//         {/* Left Side Sticky: Image & Buttons */}
//         <div className="md:w-1/2 sticky top-24 self-start space-y-6 ">
//           {/* Wishlist Icon */}
//               <button
//                 onClick={toggleWishlist}
//                 className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
//                 title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//               >
//                 <FaHeart
//                   size={20}
//                   className={`${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
//                 />
//               </button>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[450px] object-contain rounded-xl border shadow"
//           />

//           <div className="flex gap-4">
//             <button
//               onClick={() => addToCart(product)}
//               className="flex-1 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow text-lg"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-lg"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Right Side Scrollable */}
//         <div className="md:w-1/2 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] pr-4">
//           <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
//           <p className="text-xl font-semibold text-gray-800">
//             ₹{product.price}
//           </p>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <span
//               className={`text-white px-2 py-1 rounded text-lg font-bold ${
//                 product.rating > 3.5
//                   ? 'bg-green-600'
//                   : product.rating > 2.5
//                   ? 'bg-yellow-500'
//                   : product.rating > 0
//                   ? 'bg-red-600'
//                   : 'bg-gray-400'
//               }`}
//             >
//               {product.rating} ★
//             </span>
//             <span className="text-gray-600 text-sm">
//               ({product.reviews?.length || 0} reviews)
//             </span>
//           </div>

//           <p className="text-gray-700">{product.description}</p>
//           <p className="text-sm text-gray-500">Stock: {product.stock}</p>

//           {/* === REVIEWS SECTION === */}
//           <hr className="my-4 border-pink-300" />
//           <h3 className="text-2xl font-bold text-pink-700 mb-4">
//             Customer Reviews
//           </h3>

//           {product.reviews && product.reviews.length > 0 ? (
//             <div className="space-y-6">
//               {product.reviews.map((r, index) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-4 bg-white shadow-sm"
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* Avatar */}
//                     <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-bold text-white text-lg">
//                       {r.userName.charAt(0).toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="text-pink-700 font-semibold">
//                         {r.userName}
//                       </p>
//                       <p className="text-sm text-gray-400">
//                         {new Date(r.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Stars */}
//                   <div className="flex gap-1 text-yellow-500 mt-2 text-lg">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <span key={i}>{i < r.rating ? '★' : '☆'}</span>
//                     ))}
//                   </div>

//                   {/* Review Text */}
//                   <p className="mt-3 text-gray-800 text-sm">{r.review}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 italic">No reviews yet.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;




//working code after connecting to backend and implementing cart, wishlist , order
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCart } from '../context/CartProvider';
// import Navbar from './common/Navbar';
// import { FaHeart } from 'react-icons/fa';
// import { useWishlist } from '../context/WishlistProvider';
// import api from '../api/axios';

// function ProductDetails() {
//   const { id } = useParams(); // product id from URL
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

//   // Check if product is in wishlist
//   const isInWishlist = wishlistItems.some((item) => item.productId === Number(id));

//   // Toggle wishlist
//   const toggleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!product) return;

//     if (isInWishlist) {
//       const wishlistItem = wishlistItems.find((item) => item.productId === Number(id));
//       if (wishlistItem) removeFromWishlist(wishlistItem.id);
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         category: product.category,
//       });
//     }
//   };

//   // Fetch product details
//   useEffect(() => {
//     if (!id) return;
//     api
//       .get(`/products/${id}`)
//       .then((res) => setProduct(res.data.data))
//       .catch((e) => console.error('Error fetching product:', e));
//   }, [id]);

//   const handleBuyNow = () => {
//     if (!product) return;
//     addToCart(product);
//     navigate('/checkout');
//   };

//   if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center text-gray-600 mt-10">Loading product details...</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6 md:flex gap-10">
//         {/* Left Side */}
//         <div className="md:w-1/2 sticky top-24 self-start space-y-6 relative">
//           <button
//             onClick={toggleWishlist}
//             className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
//             title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             <FaHeart size={20} className={isInWishlist ? 'text-red-500' : 'text-gray-400'} />
//           </button>

//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[450px] object-contain rounded-xl border shadow"
//           />

//           <div className="flex gap-4">
//             <button
//               onClick={() => addToCart(product)}
//               className="flex-1 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow text-lg"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-lg"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="md:w-1/2 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] pr-4">
//           <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
//           <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>
//           <p className="text-gray-700">{product.description}</p>
//           <p className="text-sm text-gray-500">Stock: {product.stock}</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar";
import { useWishlist } from "../context/WishlistProvider";
import { FaHeart, FaStar } from "react-icons/fa";
import api from "../api/axios";
import { useCart } from "../context/CartProvider";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isInWishlist = wishlistItems.some(
    (item) => item.productId === Number(id)
  );

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    if (isInWishlist) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === Number(id)
      );
      if (wishlistItem) removeFromWishlist(wishlistItem.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.categoryName,
      });
    }
  };

  useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // 1️⃣ Fetch product
      let productData;
      try {
        const res = await api.get(`/products/${id}`);
        productData = res.data.data;
        if (!productData) {
          setProduct(null);
          return;
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // Product not found
          setProduct(null);
          return;
        } else {
          throw err;
        }
      }

      // 2️⃣ Fetch reviews safely
      let reviews = [];
      try {
        const reviewRes = await api.get(`/reviews/product/${id}`);
        reviews = reviewRes.data.data || [];
      } catch (err) {
        if (err.response?.status === 404) {
          reviews = []; // no reviews yet
        } else {
          throw err;
        }
      }

      productData.reviews = reviews;

      // 3️⃣ Calculate average rating safely
      productData.rating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      setProduct(productData);
    } catch (err) {
      console.error("Unexpected error fetching product or reviews:", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product);
    navigate("/checkout");
  };

  const displayStars = (rating, size = 18) => {
    const fullStars = Math.floor(rating || 0);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            size={size}
            className={
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && halfStar
                ? "text-yellow-300"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-gray-600">
          Loading product details...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-red-500">Product not found.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 p-6 hover:shadow-2xl transition duration-300 relative">
          {/* Image Section */}
          <div className="md:w-1/2 relative flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] md:h-[450px] object-cover rounded-lg"
            />
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FaHeart
                size={24}
                className={isInWishlist ? "text-red-500" : "text-gray-400"}
              />
            </button>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
              <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>

              {/* Average Rating */}
              <div className="flex items-center gap-3">
                {displayStars(product.rating, 20)}
                <span className="text-lg font-semibold text-gray-800">
                  {product.rating.toFixed(1)} / 5
                </span>
                <span className="text-gray-500">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              <p className="text-gray-700 min-h-[80px]">
                {product.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow text-lg transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-lg transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-pink-700 mb-6">
            Customer Reviews
          </h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-pink-700 font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Review Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {displayStars(review.rating)}
                  </div>

                  <p className="text-gray-800">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;






