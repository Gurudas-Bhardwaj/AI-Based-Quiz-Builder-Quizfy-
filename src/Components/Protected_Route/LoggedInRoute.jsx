import React, { useContext } from 'react'
import { useAuth } from "../../Context/authContext.jsx"
import { Navigate, useLocation } from 'react-router';


const LoggedInRoute = ({ children }) => {

   const { isLogin, isLoading } = useAuth();
   const location = useLocation();

   
   if (isLoading) {
      return (
         <div className='w-screen h-screen flex justify-center items-center'>
            <div className='h-10 w-10 rounded-full border-2 border-white border-b-black animate-spin'>

            </div>
         </div>
      )
   }

   if (isLogin) {
      const redirectTo = location?.state?.redirectTo || "/App/Admin/Home";
      return <Navigate to={redirectTo} replace />;
   }

   return children;
}

export default LoggedInRoute;
