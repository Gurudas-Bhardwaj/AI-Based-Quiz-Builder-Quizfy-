import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router';
import Layout from './Layout.jsx';
import Basic from './Components/Loader/Basic.jsx';
import AuthProvider from './Context/authContext.jsx';
import LoggedInRoute from './Components/Protected_Route/LoggedInRoute.jsx';
import ForUnLoggedUser from './Components/Protected_Route/accessOnlyRoute.jsx';
import AdminLiveSession from './Components/App/Going Live Functionality/Admin Controlled/AdminLiveSession.jsx';
import Example from './Example.jsx';

const MyPresentation = lazy(() => import("./Components/App/Home/MyPresentation/MyPresentation.jsx"))

const LazyLandingPage = lazy(() => import("./Components/Landing/Landing_Page.jsx"));
const Login = lazy(() => import("./Components/Authentications/Login.jsx"))
const SignUp = lazy(() => import("./Components/Authentications/SignUp.jsx"))
const App = lazy(() => import("./Components/App/appLayout.jsx"));
const Home = lazy(() => import("./Components/App/Home/Home.jsx"));
const PresentationView = lazy(() => import("./Components/App/Presentation/PresentationView.jsx"));


const LazyAdminControlledLive = lazy(() => import("./Components/User/Going Live/Live.jsx"));
const LazyUserControlledLive = lazy(() => import("./Components/User/User Live Session/Live.jsx"));

const UserLiveSession = lazy(() => import("./Components/App/Going Live Functionality/User Controlled/UserControlledQuiz.jsx"))

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Suspense fallback={<Basic />}><LazyLandingPage /></Suspense> },
      {
        path: "/Login", element: <Suspense fallback={<Basic />}>
          <LoggedInRoute>
            <Login />
          </LoggedInRoute>
        </Suspense>
      },
      {
        path: "/SignUp", element: <Suspense fallback={<Basic />}>
          <LoggedInRoute>
            <SignUp />
          </LoggedInRoute>
        </Suspense>
      },
    ]
  },
  {
    path: "/App/Admin",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <App />
      </ForUnLoggedUser>
    </Suspense>
    ,
    children: [
      { path: "Home", element: <Home /> },
      {
        path: "MyPresentation", element: <Suspense fallback={<Basic />}>
          <MyPresentation />
        </Suspense>
      }
    ]
  },
  {
    path: "App/AdminPanel/Presentation/:presentationId/:questionId?",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <PresentationView />
      </ForUnLoggedUser>
    </Suspense>
  },
  {
    path: "App/AdminPanel/Presentation/:presentationId",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <PresentationView />
      </ForUnLoggedUser>
    </Suspense>
  },
  {
    path: "/AdminControlled/Quiz/Live/:presentationId",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <AdminLiveSession />
      </ForUnLoggedUser>
    </Suspense>
  },
  {
    path: "/Join/AdminControlledQuiz/Live/:presentationId",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <LazyAdminControlledLive />
      </ForUnLoggedUser>
    </Suspense>
  },
  {
    path: "/UserControlled/Quiz/Live/:presentationId",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <UserLiveSession />
      </ForUnLoggedUser>
    </Suspense>
  },
  {
    path: "/Join/UserControlledQuiz/Live/:presentationId",
    element: <Suspense fallback={<Basic />}>
      <ForUnLoggedUser>
        <LazyUserControlledLive />
      </ForUnLoggedUser>
    </Suspense>
  },{
    path : "/sample",
    element : <Example/>,
  }

])

createRoot(document.getElementById('root')).render(
  //  <StrictMode>
  <AuthProvider>
    <RouterProvider router={route} />
  </AuthProvider>
  // </StrictMode>
)
