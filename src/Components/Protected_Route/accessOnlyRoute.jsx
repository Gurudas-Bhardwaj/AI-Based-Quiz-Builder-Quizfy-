
import React from 'react'
import { useAuth } from "../../Context/authContext.jsx"
import { Navigate } from 'react-router';

const accessOnlyRoute = ({ children }) => {
  const { isLogin, isLoading } = useAuth();

  // Show a loading spinner or fallback while checking auth
  if (isLoading) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  }

  if (!isLogin) return <Navigate to="/Login" replace />;

  return children;
}

export default accessOnlyRoute
