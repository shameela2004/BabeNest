// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useAuth } from './AuthProvider'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const WishlistContext = createContext()
// export const useWishlist = () => useContext(WishlistContext)

// export const WishlistProvider = ({ children }) => {
//   const { user, login } = useAuth()
//   const [wishlistItems, setWishlistItems] = useState([])
//   const navigate=useNavigate()

//   useEffect(() => {
//     if (user && user.wishlist) {
//       setWishlistItems(user.wishlist)
//     } else {
//       setWishlistItems([])
//     }
//   }, [user])

//   const updateWishlistOnServer = async (newWishlist) => {
//     if (!user || !user.id) return
//     try {
//       await axios.patch(`http://localhost:3001/users/${user.id}`, { wishlist: newWishlist })
//       login({ ...user, wishlist: newWishlist })
//     } catch (error) {
//       console.error("Failed to update wishlist on server", error)
//       toast.error("Failed to update wishlist. Please try again.")
//     }
//   }

//   const addToWishlist = (product) => {
//     if(!user|| !user.id) {
//         navigate("/login")
//         // toast.error('login first!');
//         return
//       }
//     const exists = wishlistItems.find(item => item.id === product.id)
//     if (exists) {
//       toast('Item already in wishlist!')
//       return
//     }
//     const newWishlist = [...wishlistItems, product]
//     setWishlistItems(newWishlist)
//     updateWishlistOnServer(newWishlist)
//     toast.success("Added to wishlist!")
//   }

//   const removeFromWishlist = (productId) => {
//     const newWishlist = wishlistItems.filter(item => item.id !== productId)
//     setWishlistItems(newWishlist)
//     updateWishlistOnServer(newWishlist)
//     toast.error('Removed from wishlist!')
//   }

//   return (
//     <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   )
// }














// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useAuth } from './AuthProvider';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const navigate = useNavigate();

//   // Fetch wishlist from backend
//   const fetchWishlist = async () => {
//     if (!user) return;
//     try {
//       const res = await api.get('/Wishlist');
//       setWishlistItems(res.data.data); // backend returns WishlistDto[]
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//       toast.error('Failed to load wishlist');
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [user]);

//   // Add product to wishlist
//   const addToWishlist = async (product) => {
//     if (!user) {
//       navigate('/login');
//       toast.error('Login first!');
//       return;
//     }

//     // Check if product is already in wishlist (using ProductId)
//     const exists = wishlistItems.find((item) => item.productId === product.id || item.ProductId === product.id);
//     if (exists) {
//       toast('Item already in wishlist!');
//       return;
//     }

//     try {
//       const res = await api.post(`/Wishlist/${product.id}`);
//       setWishlistItems((prev) => [...prev, res.data.data]); // res.data.data = WishlistDto
//       toast.success('Added to wishlist!');
//     } catch (error) {
//       console.error('Add to wishlist failed:', error);
//       toast.error('Failed to add to wishlist');
//     }
//   };

//   // Remove product from wishlist
//   const removeFromWishlist = async (wishlistId) => {
//     try {
//       await api.delete(`/wishlist/${wishlistId}`);
//       setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));
//       toast.success('Removed from wishlist!');
//     } catch (error) {
//       console.error('Remove from wishlist failed:', error);
//       toast.error('Failed to remove from wishlist');
//     }
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const res = await api.get('/wishlist'); // matches GET /api/Wishlist
      setWishlistItems(res.data.data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // Add to wishlist
  const addToWishlist = async (product) => {
    if (!user) {
      navigate('/login');
      toast.error('Login first!');
      return;
    }

    const exists = wishlistItems.some((item) => item.productId === product.id);
    if (exists) {
      toast('Item already in wishlist!');
      return;
    }

    try {
      const res = await api.post(`/Wishlist/${product.id}`); // ✅ backend expects /Wishlist/{productId}
      setWishlistItems((prev) => [...prev, res.data.data]);
      toast.success('Added to wishlist!');
    } catch (error) {
      console.error('Add to wishlist failed:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (wishlistId) => {
    try {
      await api.delete(`/Wishlist/${wishlistId}`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== wishlistId));
      toast.success('Removed from wishlist!');
    } catch (error) {
      console.error('Remove from wishlist failed:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

