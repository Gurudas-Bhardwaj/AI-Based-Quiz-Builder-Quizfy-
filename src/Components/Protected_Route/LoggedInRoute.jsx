import React, { useContext } from 'react'
import {useAuth} from "../../Context/authContext.jsx"
import { Navigate } from 'react-router';


const LoggedInRoute = ({children}) => {
   const {isLogin} = useAuth();
 
   if(isLogin) return <Navigate to="/" replace/>
 
   return children;
}

export default LoggedInRoute
