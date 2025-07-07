import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';
import axios from 'axios';
const Cartcontext=createContext()
export const useCart=()=>useContext(Cartcontext);
export const CartProvider=({children})=>{
    const [cartItems,setCartItems]=useState([])
    const {user,login}=useAuth()
      useEffect(() => {
    if (user && user.cart) {
      setCartItems(user.cart);
    }
  }, [user]);
    const addToServer=async(newCart)=>{
          if (!user || !user.id) return; 
          try{
          const updatedUser = { ...user, cart: newCart }; 
          await axios.patch(`http://localhost:5000/users/${user.id}`,{cart:newCart});   
           
         }
         catch(er){
            console.log("err",er)
         }
    }

    const addToCart=(product)=>{
        const UpdatedCart=(()=>{
            const existing=cartItems.find(item=>item.id===product.id)
             if(existing){
                toast.success('Increased quantity!');
                return cartItems.map(item=>
                    item.id===product.id?{...item,quantity:item.quantity+1}:item
                );
             }
             else{
                toast.success("Item Added Successfully!!")
                return [...cartItems,{...product,quantity:1}]
                
             }
        })();
        setCartItems(UpdatedCart)
        addToServer(UpdatedCart)

    }
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; 
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart)
    addToServer(updatedCart)
  };

    const removeFromCart=(productId)=>{
        const updatedCart=cartItems.filter((item)=>item.id!=productId)
        setCartItems(updatedCart)
        addToServer(updatedCart)
        toast.error('Removed from cart!');
    }
      const clearCart=()=>{
        setCartItems([])
        addToServer([])
        toast('Cart cleared!', { icon: '🗑️' });
      }
    const totalPrice=cartItems.reduce((acc ,item)=>acc+item.price*item.quantity,0);
    return(
        <Cartcontext.Provider value={{cartItems,addToCart,removeFromCart,clearCart,totalPrice,updateQuantity}}>
            {children}
        </Cartcontext.Provider>
    )
}
