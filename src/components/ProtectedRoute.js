import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role');

  if (!roles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export  default ProtectedRoute;
