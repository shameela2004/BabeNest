// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthProvider";

// function UserRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (!user) return <Navigate to="/" replace />;
//   if (user.role === "admin") return <Navigate to="/admin" replace />;

//   return children;
// }

// export default UserRoute;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function UserRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default UserRoute;

