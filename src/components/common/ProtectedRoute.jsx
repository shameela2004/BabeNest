// import React from 'react'
// import { useAuth } from '../../context/AuthProvider'
// import { Navigate} from 'react-router-dom'

// function ProtectedRoute({children}) {
//     const {user}=useAuth()
//     if(!user){
//          return <Navigate to='/login' replace/>
//     }
//     return children
// }

// export default ProtectedRoute
import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // You can replace with a spinner if you have one
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

export default ProtectedRoute;
