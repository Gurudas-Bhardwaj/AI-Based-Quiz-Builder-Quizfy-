
import React from 'react'
import { useAuth } from "../../Context/authContext.jsx"
import { Navigate, useLocation } from 'react-router';

const accessOnlyRoute = ({ children }) => {
  const { isLogin, isLoading } = useAuth();
  const location = useLocation();

  // Show a loading spinner or fallback while checking auth
  if (isLoading) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-10 h-10 border border-white border-b border-b-gray-500 rounded-full '></div>
    </div>;
  }

  if (!isLogin) return <Navigate to="/Login" replace state={{ message: "Please Login to go access the presentation!", redirectTo: location.pathname + location.search }} />;

  return children;
}

export default accessOnlyRoute
