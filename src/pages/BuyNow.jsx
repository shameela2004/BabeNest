// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider";
// import { useProduct } from "../components/ProductDetails";

// function BuyNow() {
// //  const { cartItems, totalPrice, clearCart } = useCart();
//   const { user, login } = useAuth();
//   const [product,setProduct]=useProduct()
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errs = {};
//     if (!formData.name.trim() || formData.name.trim().length < 3) {
//       errs.name = "Name must be at least 3 characters.";
//     }
//     if (formData.email.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email.trim())) {
//         errs.email = "Enter a valid email.";
//       }
//     }
//     if (!formData.address.trim() || formData.address.trim().length < 10) {
//       errs.address = "Address must be at least 10 characters.";
//     }
//     if (!formData.phone.trim()) {
//       errs.phone = "Phone number required.";
//     } else if (!/^\d{10,}$/.test(formData.phone.trim())) {
//       errs.phone = "Phone must be at least 10 digits.";
//     }

//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [e.target.name]: "",
//     }));
//   };

//   const generateOrderId = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 10000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   const handlePlaceOrder = async (e) => {
//   e.preventDefault();

//   if (!user) {
//     toast.error("Please login first.");
//     navigate("/login");
//     return;
//   }
  
// //   if (cartItems.length === 0) {
// //     toast.error("Your cart is empty.");
// //     return;
// //   }

//   if (!validate()) return;

//   const newOrder = {
//     orderId: generateOrderId(),
//     customerName: formData.name,
//     customerEmail: formData.email,
//     customerPhone: formData.phone,
//     customerAddress: formData.address,
//     items: cartItems,
//     totalAmount: totalPrice,
//     orderDate: new Date().toISOString(),
//   };

//   try {
//     const updatedOrders = [...(user.orders || []), newOrder];
//     const updatedUser = { ...user, orders: updatedOrders };

//     await axios.patch(`http://localhost:3000/users/${user.id}`, {
//       orders: updatedOrders,
//     });

//     login(updatedUser); // update user context

   

// // Wait 3s, then clear cart and navigate safely
// setTimeout(() => {
//   clearCart();           // update context
// }, 3100); 
//   } catch (error) {
//     console.error("ORDER ERROR:", error.response?.data || error.message);
//     toast.error("Failed to place order. Please try again.");
//   }
//   navigate("/")
//    toast.success("🎉 Order placed successfully!", {
//   duration: 3000,
// });
// };


//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       {/* Cart Items Preview */}
//       <div className="space-y-4 mb-6">
//         {product.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center gap-4 border p-4 rounded"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-cover rounded"
//               loading="lazy"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.name}</h3>
//               <p>
//                 ₹{item.price} x {item.quantity}
//               </p>
//               <p className="font-semibold">
//                 Total: ₹{item.price * item.quantity}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Address Form */}
//       <form onSubmit={handlePlaceOrder} className="space-y-4" noValidate>
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             required
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={`w-full border px-3 py-2 rounded ${
//               errors.name ? "border-red-600" : ""
//             }`}
//             type="text"
//             placeholder="Your full name"
//           />
//           {errors.name && (
//             <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Email (optional)</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full border px-3 py-2 rounded ${
//               errors.email ? "border-red-600" : ""
//             }`}
//             type="email"
//             placeholder="Your email address"
//           />
//           {errors.email && (
//             <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Shipping Address</label>
//           <textarea
//             required
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className={`w-full border px-3 py-2 rounded ${
//               errors.address ? "border-red-600" : ""
//             }`}
//             rows="3"
//             placeholder="Your shipping address"
//           />
//           {errors.address && (
//             <p className="text-red-600 text-sm mt-1">{errors.address}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Phone Number</label>
//           <input
//             required
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className={`w-full border px-3 py-2 rounded ${
//               errors.phone ? "border-red-600" : ""
//             }`}
//             type="tel"
//             placeholder="Your phone number"
//           />
//           {errors.phone && (
//             <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
//           )}
//         </div>

//         <div className="text-right font-bold text-lg">
//           Grand Total: ₹{totalPrice.toFixed(2)}
//         </div>

//         <button
//           type="submit"
//           className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }

// export default BuyNow



