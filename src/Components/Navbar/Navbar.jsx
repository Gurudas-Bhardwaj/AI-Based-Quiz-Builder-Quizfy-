import React, { useState } from 'react'
import logo from "../../assets/Images/Logo/LOGO.png"
import { NavLink } from 'react-router'
import menu from "../../assets/Images/Logo/menu.png"
import Sliding_Navbar from './Sliding_Navbar'
import { useAuth } from '../../Context/authContext'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {isLogin} = useAuth();

  return (
    <div className='relative h-16 w-screen border-b border-b-gray-200 flex justify-center items-center'>
      <div className='flex justify-center items-center gap-36'>
        <div>
          <NavLink to="/">
            <img src={logo} alt="" className='w-40 mt-4' />
          </NavLink>
        </div>
        <div className="hidden lg:flex">
          <div className='flex w-auto justify-center text-base items-center gap-7 font-Outfit'>
            <NavLink className={({isActive})=>isActive?"text-indigo-500":"text-black"} to="/">Home</NavLink>
            <NavLink className={({isActive})=>isActive?"text-indigo-500":"text-black"} to="/HowToUse">How To Use</NavLink>
            <NavLink className={({isActive})=>isActive?"text-indigo-500":"text-black"} to="/Billing">Pricing</NavLink>
            <NavLink className={({isActive})=>isActive?"text-indigo-500":"text-black"} to="/AboutUs">About Us</NavLink>
            <NavLink className={({isActive})=>isActive?"text-indigo-500":"text-black"} to="/ReadMe">ReadMe</NavLink>
          </div>
        </div>
        <div className='flex gap-10'>
          {isLogin?(
              <div>
                <NavLink to="/App/Admin/Home" className='pt-1 hidden sm:flex text-sm cursor-pointer bg-in pb-1 pl-4 pr-4 rounded-3xl border border-blue-500 text-white font-Outfit z-10' style={{ backgroundColor: "#5769e7" }}>Go to Home</NavLink>
              </div>
            ):(
              <div className='hidden lg:flex '>
                <NavLink to="/Login" className='pt-1 font-semibold text-sm cursor-pointer bg-in pb-1 pl-6 pr-6 rounded-3xl font-Outfit z-10'>Login</NavLink>
                <NavLink to="/SignUp" className='pt-1 text-sm cursor-pointer bg-in pb-1 pl-6 pr-6 rounded-3xl border border-blue-500 text-white font-Outfit z-10' style={{ backgroundColor: "#5769e7" }}>SignUp</NavLink>
              </div>
            )
          }
          <div className='flex lg:hidden'>
            <img src={menu} onClick={() => setOpen(!open)} className="w-6 cursor-pointer transition-all" />
          </div>
        </div>
      </div>
      <Sliding_Navbar isopen={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Navbar
