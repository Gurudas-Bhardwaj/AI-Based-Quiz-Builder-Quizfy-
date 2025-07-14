import React, { lazy,Suspense } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router';
const LazyLandingPage = lazy(()=> import("./Components/Landing/Landing_Page.jsx"));
import Layout from './Layout.jsx';
import Basic from './Components/Loader/Basic.jsx';
import AuthProvider from './Context/authContext.jsx';
import LoggedInRoute from './Components/Protected_Route/LoggedInRoute.jsx';
import ForUnLoggedUser from './Components/Protected_Route/accessOnlyRoute.jsx';
const Login = lazy(()=> import("./Components/Authentications/Login.jsx"))
const SignUp = lazy(()=> import("./Components/Authentications/SignUp.jsx"))
const App = lazy(()=> import("./Components/App/appLayout.jsx"));
const Home = lazy(()=> import("./Components/App/Home/Home.jsx"));

const route = createBrowserRouter([
  {
    path:"",
    element : <Layout/>,
    children : [
      { path : "/", element : <Suspense fallback={<Basic/>}><LazyLandingPage/></Suspense>},
      { path : "/Login", element : <Suspense fallback={<Basic/>}>
          <LoggedInRoute>
            <Login/>
          </LoggedInRoute>
        </Suspense>},
      { path : "/SignUp", element : <Suspense fallback={<Basic/>}>
          <LoggedInRoute>
            <SignUp/>
          </LoggedInRoute>
        </Suspense>},
    ]
  },
  {
    path:"/App",
    element : <Suspense fallback={<Basic/>}> 
        {/* <ForUnLoggedUser> */}
          <App/>
        {/* </ForUnLoggedUser> */}
      </Suspense>
    ,
    children:[
      {path : "Home" ,element : <Home/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </StrictMode>
)
