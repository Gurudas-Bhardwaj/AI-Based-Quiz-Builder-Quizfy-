import React, { useState } from 'react'
import logo from "../../assests/Images/Logo/LOGO.png"
import { NavLink } from 'react-router'
import menu from "../../assests/Images/Logo/menu.png"
import close from "../../assests/Images/Logo/close.png"
import Sliding_Navbar from './Sliding_Navbar'
import { useAuth } from '../../Context/authContext'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {isLogin} = useAuth();

  return (
    <div className='relative h-16 w-screen border-b border-b-gray-200 flex justify-center items-center'>
      <div className='flex justify-center items-center gap-32'>
        <div>
          <NavLink to="/">
            <img src={logo} alt="" className='w-36 mt-4' />
          </NavLink>
        </div>
        <div className="hidden lg:flex">
          <div className='flex w-auto justify-center text-sm items-center gap-7 font-Outfit'>
            <NavLink to="/">Home</NavLink>
            <a href="">How To Use</a>
            <a href="">Pricing</a>
            <a href="">About Us</a>
            <a href="">ReadMe</a>
          </div>
        </div>
        <div className='flex gap-9'>
          {isLogin?(
              <div>
                <NavLink to="/App/Home" className='pt-1 text-xs cursor-pointer bg-in pb-1 pl-4 pr-4 rounded-3xl border border-blue-500 text-white font-poppins z-10' style={{ backgroundColor: "#5769e7" }}>Go to Home</NavLink>
              </div>
            ):(
              <div className='hidden lg:flex '>
                <NavLink to="/Login" className='pt-1 font-semibold text-xs cursor-pointer bg-in pb-1 pl-6 pr-6 rounded-3xl font-poppins z-10'>Login</NavLink>
                <NavLink to="/SignUp" className='pt-1 text-xs cursor-pointer bg-in pb-1 pl-6 pr-6 rounded-3xl border border-blue-500 text-white font-poppins z-10' style={{ backgroundColor: "#5769e7" }}>SignUp</NavLink>
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
