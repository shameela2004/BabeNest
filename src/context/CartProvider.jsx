// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
// import toast from 'react-hot-toast';
// import { useAuth } from './AuthProvider';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const Cartcontext=createContext()
// export const useCart=()=>useContext(Cartcontext);
// export const CartProvider=({children})=>{
//   const navigate=useNavigate()
//     const [cartItems,setCartItems]=useState([])
//     const {user,login,loading}=useAuth()
    
//       useEffect(() => {
//     if (!loading && user && user.cart) {
//       setCartItems(user.cart);
//     }
//   }, [user,loading]);




//   //  const addToServer=async(newCart)=>{
//   //         if (!user || !user.id) return; 
//   //         try{
//   //         // const updatedUser = { ...user, cart: newCart }; 
//   //         await axios.patch(`http://localhost:3000/users/${user.id}`,{cart:newCart});   
//   //         login({ ...user, cart: newCart })
           
//   //        }
//   //        catch(er){
//   //           console.log("err",er)
//   //        }
//   //   }




// const addToServer = async (newCart) => {
//   if (!user || !user.id) return;
//   try {
//     await axios.patch(`http://localhost:3001/users/${user.id}`, {
//       cart: newCart,
//     });

//     //  Only update localStorage directly, avoid triggering context updates
//     const updatedUser = { ...user, cart: newCart };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error("Error syncing cart to server:", err);
//   }
// };


//     const addToCart=(product)=>{
//       if (loading) return;
//       if(!user|| !user.id) {
//         navigate("/login")
//         // toast.error('login first!');
//         return
//       }
//         const UpdatedCart=(()=>{
//              if (!user || !user.id) return
//             const existing=cartItems.find(item=>item.id===product.id)
            
//              if(existing){
//                 toast.success('Increased quantity!');
//                 return cartItems.map(item=>
//                     item.id===product.id?{...item,quantity:item.quantity+1}:item
//                 );
//              }
//              else{
//                 toast.success("Item Added Successfully!!")
//                 return [...cartItems,{...product,quantity:1}]
                
//              }
//         })();
//         setCartItems(UpdatedCart)
//         addToServer(UpdatedCart)

//     }
//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) return; 
//     const updatedCart = cartItems.map((item) =>
//       item.id === productId ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart)
//     addToServer(updatedCart)
//   };

//     const removeFromCart=(productId)=>{
//         const updatedCart=cartItems.filter((item)=>item.id!=productId)
//         setCartItems(updatedCart)
//         addToServer(updatedCart)
//         toast.error('Removed from cart!');
//     }
//       const clearCart=()=>{
//         setCartItems([])
//         addToServer([])
//         toast('Cart cleared!', { icon: '🗑️' });
//       }
//     const totalPrice=cartItems.reduce((acc ,item)=>acc+item.price*item.quantity,0);


//     const value = useMemo(() => ({
//   cartItems,
//   addToCart,
//   removeFromCart,
//   clearCart,
//   totalPrice,
//   updateQuantity
// }), [cartItems]);




//     return(
//         <Cartcontext.Provider value={value}>
//             {children}
//         </Cartcontext.Provider>
//     )
// }





// context/CartProvider.jsx
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, refreshToken } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend
const fetchCart = async () => {
  if (!user) return;
  try {
    console.log("🔍 Fetching cart with headers:", api.defaults.headers.common);
    const res = await api.get("/cart");
    if (res.data?.data) {
      setCartItems(res.data.data);
    } else {
      setCartItems([]); // empty cart
    }
  } catch (err) {
    if (err.response?.status === 404) {
      // Backend says empty cart
      setCartItems([]);
      console.warn("Cart empty");
    } else {
      console.error("❌ Failed to fetch cart:", err.response?.data || err.message);
    }
  }
};


  useEffect(() => {
    if (user) fetchCart();
    else setCartItems([]); // clear on logout
  }, [user]);

  // Add to cart
  const addToCart = async (product) => {
    if (!user) {
      navigate("/login");
      toast.error("Login first!");
      return;
    }

    try {
      const existing = cartItems.find((item) => item.productId === product.id);
      let updatedCart;

      if (existing) {
        const res = await api.put(`/cart/${existing.id}`, {
          quantity: existing.quantity + 1,
        });
        updatedCart = cartItems.map((item) =>
          item.id === existing.id ? res.data.data : item
        );
        toast.success("Increased quantity!");
      } else {
        const res = await api.post("/cart", { productId: product.id });
        updatedCart = [...cartItems, res.data.data];
        toast.success("Item added to cart!");
      }

      setCartItems(updatedCart);
    } catch (err) {
      console.error("❌ Add to cart failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        await refreshToken();
        fetchCart(); // safer retry
      } else {
        toast.error("Failed to add to cart!");
      }
    }
  };

  // Update quantity
  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await api.put(`/cart/${cartId}`, { quantity });
      const updatedCart = cartItems.map((item) =>
        item.id === cartId ? res.data.data : item
      );
      setCartItems(updatedCart);
    } catch (err) {
      console.error("❌ Update quantity failed:", err.response?.data || err.message);
    }
  };

  // Remove from cart
  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartId));
      toast("Removed from cart!", { icon: "🗑️" });
    } catch (err) {
      console.error("❌ Remove from cart failed:", err.response?.data || err.message);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCartItems([]);
      toast("Cart cleared!", { icon: "🗑️" });
    } catch (err) {
      console.error("❌ Clear cart failed:", err.response?.data || err.message);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.productPrice || 0) * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalPrice,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

