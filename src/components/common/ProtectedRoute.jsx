
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

  return children;
}

export default ProtectedRoute;
