import React from 'react'
import { useAuth } from '../../context/AuthProvider'
import { Navigate } from 'react-router-dom'

const AdminRoute=({children})=>{
    const {user,loading}=useAuth()
    if(loading) return null;
    if(!user || user.roll!=="admin")
        <Navigate to="/" replace/>
   return children
 }
export default AdminRoute