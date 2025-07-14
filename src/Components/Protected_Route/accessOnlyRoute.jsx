import React, { useContext } from 'react'
import {useAuth} from "../../Context/authContext.jsx"
import { Navigate } from 'react-router';

const accessOnlyRoute = ({children}) => {

  const {isLogin} = useAuth();

  if(!isLogin) return <Navigate to="/Login" replace/>

  return children;


  return children;
}

export default accessOnlyRoute
