import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for authentication status directly from localStorage
  const token = localStorage.getItem("token"); // Optionally check for token as well

  // If authenticated (e.g., flag is true AND token exists), render the child component
  if (token) {
    return children;
  }

  // Otherwise, redirect to the sign-in page
  // 'replace' prevents the user from navigating back to the protected route via browser history
  return <Navigate to='/signin' replace />;
};

export default ProtectedRoute;
