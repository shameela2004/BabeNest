
import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }
  if (user.role === 'admin') {
    return <Navigate to='/admin' replace />;
  }
  if (user.blocked) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'Your account has been blocked. Please contact support.',
      timer: 3000,
      showConfirmButton: false,
    });
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
