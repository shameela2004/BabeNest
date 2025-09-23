// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider";
// import Navbar from "../components/common/Navbar";

// function Checkout() {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const { user, login } = useAuth();
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
//     // toast.error("Please login first.");
//     navigate("/login");
//     return;
//   }
  
//   if (cartItems.length === 0) {
//     toast.error("Your cart is empty.");
//     return;
//   }

//   if (!validate()) return;

//   const newOrder = {
//     orderId: generateOrderId(),
//     customerName: formData.name,
//     customerEmail: formData.email,
//     customerPhone: formData.phone,
//     customerAddress: formData.address,
//     items: cartItems,
//     totalAmount: totalPrice,
//     status: "pending", 
//     orderDate: new Date().toISOString(),
//   };

//   try {
//     const updatedOrders = [...(user.orders || []), newOrder];
//     const updatedUser = { ...user, cart: [], orders: updatedOrders };

//     await axios.patch(`http://localhost:3001/users/${user.id}`, {
//       cart: [],
//       orders: updatedOrders,
//     });

//     login(updatedUser); // update user context

   


// setTimeout(() => {
//   clearCart();  //clear cart
// }, 3100); 
//   } catch (error) {
//     console.error("ORDER ERROR:", error.response?.data || error.message);
//     toast.error("Failed to place order. Please try again.");
//   }
//   navigate("/") //navigate to home
//    toast.success("🎉 Order placed successfully!", {
//   duration: 3000,
// });
// };


//   return (
//     <>
//     <Navbar></Navbar>
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       {/* Cart Items Display*/}
//       <div className="space-y-4 mb-6">
//         {cartItems.map((item) => (
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

//       {/*form*/}
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
//     </>
//   );
// }

// export default Checkout;












// // src/pages/Checkout.jsx
// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import Navbar from "../components/common/Navbar";
// import api from "../api/axios";

// async function loadRazorpayScript() {
//   return new Promise((resolve) => {
//     if (window.Razorpay) return resolve(true);
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// function getRazorpayKey() {
//   // safely detect env key without using `process` directly at runtime
//   if (typeof import.meta !== "undefined" && import.meta.env?.VITE_RAZORPAY_KEY) {
//     return import.meta.env.VITE_RAZORPAY_KEY;
//   }
//   if (typeof process !== "undefined" && process?.env?.REACT_APP_RAZORPAY_KEY) {
//     return process.env.REACT_APP_RAZORPAY_KEY;
//   }
//   // fallback: allow putting key on window for dev: window.__RAZORPAY_KEY__ = '...'
//   return window?.__RAZORPAY_KEY__ || "";
// }

// export default function Checkout() {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: user?.username || "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "online"
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errs = {};
//     if (!formData.name.trim() || formData.name.trim().length < 3)
//       errs.name = "Name must be at least 3 characters.";
//     if (formData.email.trim()) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email.trim()))
//         errs.email = "Enter a valid email.";
//     }
//     if (!formData.address.trim() || formData.address.trim().length < 10)
//       errs.address = "Address must be at least 10 characters.";
//     if (!formData.phone.trim()) errs.phone = "Phone number required.";
//     else if (!/^\d{10,}$/.test(formData.phone.trim()))
//       errs.phone = "Phone must be at least 10 digits.";

//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     if (!user) return navigate("/login");
//     if (!cartItems || cartItems.length === 0) {
//       toast.error("Your cart is empty.");
//       return;
//     }
//     if (!validate()) return;

//     try {
//       // NOTE: backend uses server-side cart to build items.
//       // Send only the fields CreateOrderDto expects.
//       const orderPayload = {
//         customerName: formData.name,
//         customerEmail: formData.email,
//         customerPhone: formData.phone,
//         customerAddress: formData.address,
//         totalAmount: totalPrice,
//         paymentMethodId: paymentMethod === "cod" ? 1 : 2, 
//         items: cartItems.map((item) => ({
//   productId: item.productId,  // not item.id
//   quantity: item.quantity
// }))
// // 1=COD, 2=Online
//       };

//       const res = await api.post("/orders", orderPayload);
//       // ApiResponse wrapper: data is in res.data.data
//       const payload = res?.data?.data ?? null;

//       // controller may return created either directly or nested in `created`
//       const createdOrder =
//         (payload && payload.created) || payload || res?.data || null;

//       // unify id and amount
//       const orderId = createdOrder?.id ?? createdOrder?.Id ?? createdOrder?.created?.id;
//       const orderAmount = createdOrder?.totalAmount ?? createdOrder?.TotalAmount ?? orderPayload.totalAmount;

//       if (!orderId) {
//         console.warn("Order created but response missing order id:", res);
//       }

//       if (paymentMethod === "online") {
//         // load Razorpay sdk
//         const ok = await loadRazorpayScript();
//         if (!ok) {
//           toast.error("Failed to load payment SDK. Try again later.");
//           return;
//         }

//         // Try to get razorpayOrderId returned from backend (if any)
//         let razorpayOrderId =
//           createdOrder?.razorpayOrderId ||
//           createdOrder?.RazorpayOrderId ||
//           payload?.razorpayOrderId ||
//           payload?.RazorpayOrder?.id ||
//           null;

//         // If razorpayOrderId is missing, fetch full order from backend (GET /orders/{id})
//         if (!razorpayOrderId && orderId) {
//           try {
//             const fetchRes = await api.get(`/orders/${orderId}`);
//             const fetched = fetchRes?.data?.data ?? null;
//             razorpayOrderId = fetched?.razorpayOrderId || fetched?.RazorpayOrderId || fetched?.razorpayOrderId;
//           } catch (err) {
//             // continue — we'll try to open RZP without an order_id if absolutely necessary,
//             // but Razorpay strongly prefers server-side order_id.
//             console.warn("Could not fetch order to get razorpay id:", err);
//           }
//         }

//         const RAZORPAY_KEY = getRazorpayKey();
//         if (!RAZORPAY_KEY) {
//           toast.error("Payment key not configured. Set REACT_APP_RAZORPAY_KEY or VITE_RAZORPAY_KEY.");
//           return;
//         }

//         const options = {
//           key: RAZORPAY_KEY,
//           amount: Math.round((orderAmount ?? totalPrice) * 100), // paise
//           currency: "INR",
//           name: "BabeNest",
//           description: "Order Payment",
//           order_id: razorpayOrderId || undefined, // if undefined, Razorpay will create session-based flow (less ideal)
//           handler: async function (response) {
//             // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
//             try {
//               const verifyRes = await api.post("/orders/verify-payment", {
//                  OrderId: order.created.Id,                     // match DTO: int
//       RazorpayOrderId: response.razorpay_order_id,   // match DTO
//       RazorpayPaymentId: response.razorpay_payment_id,
//       RazorpaySignature: response.razorpay_signature,
//               });

//               const verified = verifyRes?.data?.data ?? verifyRes?.data ?? null;
//               toast.success("🎉 Payment successful! Order placed.");

//               // try to clear frontend cart (backend may already have cleared)
//               try {
//                 await clearCart();
//               } catch (_) {
//                 /* ignore clear errors */
//               }

//               // navigate to order success page (use verified id or original orderId)
//               const successOrderId = verified?.id ?? orderId;
//               navigate(`/order-success/${successOrderId}`);
//             } catch (err) {
//               console.error("Payment verification failed:", err);
//               toast.error("Payment verification failed. Contact support.");
//             }
//           },
//           prefill: {
//             name: formData.name,
//             email: formData.email,
//             contact: formData.phone,
//           },
//           theme: { color: "#F472B6" },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } else {
//         // COD
//         toast.success("🎉 Order placed successfully! (COD)");
//         // backend likely cleared cart; still attempt frontend clear
//         try {
//           await clearCart();
//         } catch (_) {}
//         navigate(`/order-success/${orderId ?? ""}`);
//       }
//     } catch (err) {
//       // more helpful error messages
//       console.error("Order error:", err?.response?.data ?? err?.message ?? err);
//       // If backend returns validation object show a friendly message
//       const serverData = err?.response?.data;
//       if (serverData?.title || serverData?.errors) {
//         const errMsgs = [];
//         if (serverData.errors) {
//           for (const k of Object.keys(serverData.errors)) {
//             errMsgs.push(...(serverData.errors[k] || []));
//           }
//         }
//         toast.error(errMsgs.length ? errMsgs.join(" | ") : (serverData?.title || "Order failed"));
//       } else {
//         toast.error("Failed to place order.");
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//         {/* Cart Items */}
//         <div className="space-y-4 mb-6">
//           {cartItems && cartItems.length ? (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 border p-4 rounded"
//               >
//                 <img
//                   src={item.productImage || item.image || item.product?.image}
//                   alt={item.productName || item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{item.productName || item.name}</h3>
//                   <p>
//                     ₹{(item.productPrice ?? item.price ?? 0)} x {item.quantity}
//                   </p>
//                   <p className="font-semibold">
//                     Total: ₹{((item.productPrice ?? item.price ?? 0) * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-600">Cart is empty.</div>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handlePlaceOrder} className="space-y-4" noValidate>
//           <div>
//             <label className="block mb-1 font-semibold">Full Name</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-600" : ""}`}
//               type="text"
//               placeholder="Your full name"
//             />
//             {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Email (optional)</label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border px-3 py-2 rounded ${errors.email ? "border-red-600" : ""}`}
//               type="email"
//               placeholder="Your email"
//             />
//             {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Shipping Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className={`w-full border px-3 py-2 rounded ${errors.address ? "border-red-600" : ""}`}
//               rows="3"
//               placeholder="Your shipping address"
//             />
//             {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Phone Number</label>
//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full border px-3 py-2 rounded ${errors.phone ? "border-red-600" : ""}`}
//               type="tel"
//               placeholder="Your phone number"
//             />
//             {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
//           </div>

//           {/* Payment Method */}
//           <div className="space-y-2">
//             <label className="block mb-1 font-semibold">Payment Method</label>
//             <div className="flex gap-4">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
//                 Cash on Delivery
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
//                 Online Payment
//               </label>
//             </div>
//           </div>

//           <div className="text-right font-bold text-lg">Grand Total: ₹{totalPrice.toFixed(2)}</div>

//           <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded">
//             Place Order
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import api from "../api/axios";

async function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getRazorpayKey() {
  return (
    import.meta.env?.VITE_RAZORPAY_KEY ||
    process.env.REACT_APP_RAZORPAY_KEY ||
    window?.__RAZORPAY_KEY__ ||
    ""
  );
}

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "online"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 3)
      errs.name = "Name must be at least 3 characters.";
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim()))
        errs.email = "Enter a valid email.";
    }
    if (!formData.address.trim() || formData.address.trim().length < 10)
      errs.address = "Address must be at least 10 characters.";
    if (!formData.phone.trim()) errs.phone = "Phone number required.";
    else if (!/^\d{10,}$/.test(formData.phone.trim()))
      errs.phone = "Phone must be at least 10 digits.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!validate()) return;

    try {
      const orderPayload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        totalAmount: totalPrice,
        paymentMethodId: paymentMethod === "cod" ? 1 : 2,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const res = await api.post("/orders", orderPayload);
      const payload = res?.data?.data ?? null;
      const createdOrder =
        (payload && payload.created) || payload || res?.data || null;

      const orderId = createdOrder?.id ?? createdOrder?.Id;
      const orderAmount = createdOrder?.totalAmount ?? totalPrice;
      let razorpayOrderId = createdOrder?.razorpayOrderId ?? createdOrder?.RazorpayOrderId;

      if (paymentMethod === "online") {
        const ok = await loadRazorpayScript();
        if (!ok) {
          toast.error("Failed to load payment SDK. Try again later.");
          return;
        }

        if (!razorpayOrderId) {
          const fetchRes = await api.get(`/orders/${orderId}`);
          const fetched = fetchRes?.data?.data ?? null;
          razorpayOrderId = fetched?.razorpayOrderId || fetched?.RazorpayOrderId;
        }

        const RAZORPAY_KEY = getRazorpayKey();
        if (!RAZORPAY_KEY) {
          toast.error("Payment key not configured.");
          return;
        }

        const options = {
          key: RAZORPAY_KEY,
          amount: Math.round(orderAmount * 100),
          currency: "INR",
          name: "BabeNest",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await api.post("/orders/verify-payment", {
                OrderId: orderId,
                RazorpayOrderId: response.razorpay_order_id,
                RazorpayPaymentId: response.razorpay_payment_id,
                RazorpaySignature: response.razorpay_signature,
              });

              toast.success("🎉 Payment successful! Order placed.");
             await clearCart(); 
setTimeout(() => {
  navigate(`/order-success/${orderId}`);
}, 50); // 50ms delay is enough for React to flush state
            } catch (err) {
              console.error("Payment verification failed:", err);
              toast.error("Payment verification failed. Contact support.");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#F472B6" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.success("🎉 Order placed successfully! (COD)");
        clearCart();
        navigate(`/order-success/${orderId ?? ""}`);
      }
    } catch (err) {
      console.error("Order error:", err?.response?.data ?? err?.message ?? err);
      toast.error("Failed to place order.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="space-y-4 mb-6">
          {cartItems && cartItems.length ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border p-4 rounded">
                <img
                  src={item.productImage || item.image || item.product?.image}
                  alt={item.productName || item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productName || item.name}</h3>
                  <p>₹{(item.productPrice ?? item.price ?? 0)} x {item.quantity}</p>
                  <p className="font-semibold">
                    Total: ₹{((item.productPrice ?? item.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">Cart is empty.</div>
          )}
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-4" noValidate>
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-600" : ""}`}
              type="text"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email (optional)</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.email ? "border-red-600" : ""}`}
              type="email"
              placeholder="Your email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Shipping Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.address ? "border-red-600" : ""}`}
              rows="3"
              placeholder="Your shipping address"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.phone ? "border-red-600" : ""}`}
              type="tel"
              placeholder="Your phone number"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="block mb-1 font-semibold">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
                Online Payment
              </label>
            </div>
          </div>

          <div className="text-right font-bold text-lg">Grand Total: ₹{totalPrice.toFixed(2)}</div>
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
