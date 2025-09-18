  import React, { lazy, Suspense } from 'react';
  import { createRoot } from 'react-dom/client'
  import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router';
  const LazyLandingPage = lazy(() => import("./Components/Landing/Landing_Page.jsx"));
  import Layout from './Layout.jsx';
  import Basic from './Components/Loader/Basic.jsx';
  import AuthProvider from './Context/authContext.jsx';
  import LoggedInRoute from './Components/Protected_Route/LoggedInRoute.jsx';
  import ForUnLoggedUser from './Components/Protected_Route/accessOnlyRoute.jsx';
  import AdminLiveSession from './Components/App/Going Live Functionality/Admin Controlled/AdminLiveSession.jsx';


  const MyPresentation = lazy(() => import("./Components/App/Home/MyPresentation/MyPresentation.jsx"))

  const Login = lazy(() => import("./Components/Authentications/Login.jsx"))
  const SignUp = lazy(() => import("./Components/Authentications/SignUp.jsx"))
  const App = lazy(() => import("./Components/App/appLayout.jsx"));
  const Home = lazy(() => import("./Components/App/Home/Home.jsx"));
  const PresentationView = lazy(() => import("./Components/App/Presentation/PresentationView.jsx"));

  const LazyLive = lazy(() => import("./Components/User/Going Live/Live.jsx"));


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
      path: "/Admin/Quiz/Live/:presentationId",
      element: <AdminLiveSession />
    },
    {
      path: "/Join/Quiz/Live/:presentationId",
      element: <Suspense fallback={<Basic />}>
        <ForUnLoggedUser>
        <LazyLive />
        </ForUnLoggedUser>
      </Suspense>
    },

  ])

  createRoot(document.getElementById('root')).render(
    //  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
    // </StrictMode>
  )
