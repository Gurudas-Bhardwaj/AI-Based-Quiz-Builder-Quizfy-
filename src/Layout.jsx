import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import { Outlet } from 'react-router'
import Footer from './Components/Footer/Footer'

const Layout = () => {
  return (
    <div className='overflow-hidden'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout
