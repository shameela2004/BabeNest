import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Cartcontext=createContext()
export const useCart=()=>useContext(Cartcontext);
export const CartProvider=({children})=>{
  const navigate=useNavigate()
    const [cartItems,setCartItems]=useState([])
    const {user,login,loading}=useAuth()
    
      useEffect(() => {
    if (!loading && user && user.cart) {
      setCartItems(user.cart);
    }
  }, [user,loading]);




  //  const addToServer=async(newCart)=>{
  //         if (!user || !user.id) return; 
  //         try{
  //         // const updatedUser = { ...user, cart: newCart }; 
  //         await axios.patch(`http://localhost:3000/users/${user.id}`,{cart:newCart});   
  //         login({ ...user, cart: newCart })
           
  //        }
  //        catch(er){
  //           console.log("err",er)
  //        }
  //   }




const addToServer = async (newCart) => {
  if (!user || !user.id) return;
  try {
    await axios.patch(`http://localhost:3001/users/${user.id}`, {
      cart: newCart,
    });

    //  Only update localStorage directly, avoid triggering context updates
    const updatedUser = { ...user, cart: newCart };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (err) {
    console.error("Error syncing cart to server:", err);
  }
};


    const addToCart=(product)=>{
      if (loading) return;
      if(!user|| !user.id) {
        navigate("/login")
        toast.error('login first!');
        return
      }
        const UpdatedCart=(()=>{
             if (!user || !user.id) return
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


    const value = useMemo(() => ({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  totalPrice,
  updateQuantity
}), [cartItems]);




    return(
        <Cartcontext.Provider value={value}>
            {children}
        </Cartcontext.Provider>
    )
}




// import React, { createContext, useContext, useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { useAuth } from './AuthProvider';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Cartcontext = createContext();
// export const useCart = () => useContext(Cartcontext);

// export const CartProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (!loading && user?.cart) {
//       setCartItems(user.cart);
//     }
//   }, [user, loading]);

//   const syncCartWithServer = async (newCart) => {
//     if (!user || !user.id) return;

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: newCart });

//       // ✅ Only update localStorage directly — avoid login()
//       const updatedUser = { ...user, cart: newCart };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     } catch (err) {
//       console.error('Error syncing cart:', err);
//     }
//   };

//   const addToCart = (product) => {
//     if (loading) return;
//     if (!user || !user.id) {
//       navigate('/login');
//       toast.error('Please login first!');
//       return;
//     }

//     const updatedCart = (() => {
//       const existing = cartItems.find(item => item.id === product.id);
//       if (existing) {
//         toast.success('Increased quantity!');
//         return cartItems.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         toast.success('Item Added Successfully!');
//         return [...cartItems, { ...product, quantity: 1 }];
//       }
//     })();

//     setCartItems(updatedCart);
//     syncCartWithServer(updatedCart);
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) return;
//     const updatedCart = cartItems.map(item =>
//       item.id === productId ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart);
//     syncCartWithServer(updatedCart);
//   };

//   const removeFromCart = (productId) => {
//     const updatedCart = cartItems.filter(item => item.id !== productId);
//     setCartItems(updatedCart);
//     syncCartWithServer(updatedCart);
//     toast.error('Removed from cart!');
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     syncCartWithServer([]);
//     toast('Cart cleared!', { icon: '🗑️' });
//   };

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <Cartcontext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         totalPrice,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </Cartcontext.Provider>
//   );
// };

