import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const WishlistContext = createContext()
export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const { user, login } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const navigate=useNavigate()

  useEffect(() => {
    if (user && user.wishlist) {
      setWishlistItems(user.wishlist)
    } else {
      setWishlistItems([])
    }
  }, [user])

  const updateWishlistOnServer = async (newWishlist) => {
    if (!user || !user.id) return
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, { wishlist: newWishlist })
      login({ ...user, wishlist: newWishlist })
    } catch (error) {
      console.error("Failed to update wishlist on server", error)
      toast.error("Failed to update wishlist. Please try again.")
    }
  }

  const addToWishlist = (product) => {
    if(!user|| !user.id) {
        navigate("/login")
        toast.error('login first!');
        return
      }
    const exists = wishlistItems.find(item => item.id === product.id)
    if (exists) {
      toast('Item already in wishlist!')
      return
    }
    const newWishlist = [...wishlistItems, product]
    setWishlistItems(newWishlist)
    updateWishlistOnServer(newWishlist)
    toast.success("Added to wishlist!")
  }

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(newWishlist)
    updateWishlistOnServer(newWishlist)
    toast('Removed from wishlist!')
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
