import React from 'react'
import close from "../../assets/Images/Logo/close.png"
import logo from "../../assets/Images/Logo/LOGO.png"
import { NavLink } from 'react-router'
import classNames from 'classnames'
import { useAuth } from '../../Context/authContext'

const Sliding_Navbar = ({ isopen, onClose }) => {

  const {isLogin} = useAuth();
  return (
    <nav className={classNames(
      'fixed top-0 left-0 flex justify-end w-screen h-screen z-50 bg-black/40 backdrop-blur-md transition-transform duration-300 ease-in-out',
      {
        'translate-x-0': isopen,
        'translate-x-full': !isopen
      }
    )}>

      <div className='w-[90%] h-full  bg-white flex flex-col justify-between'>
        <div className='w-full flex justify-end'>
          <div onClick={onClose} className='mr-[12%] mt-[6%] flex justify-start items-center'>
            <img src={close} className='w-7 p-1  ' alt="" />
          </div>
        </div>
        <div className='font-medium pt-9 text-xl pl-7 flex flex-col gap-5 font-Outfit'>
          <div>
            <NavLink to='/' className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>Home</NavLink>
          </div>
          <div><NavLink to='/HowToUse' className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>How to use</NavLink></div>
          <div><NavLink to='/Billing' className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>Pricing</NavLink></div>
          <div><NavLink to='/AboutUs' className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>About us</NavLink></div>
          <div><NavLink to="/Readme" className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>ReadMe</NavLink></div>
          {
            isLogin ?
              <div><NavLink to="App/Admin/Home" className={`text-white pt-1 pb-1 pr-4 pl-4 mt-4 rounded-3xl bg-indigo-400`} onClick={onClose}>Go To Home</NavLink></div>
              :
          <div className='flex flex-col gap-3'>
            <div><NavLink to="/Login" className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>Login</NavLink></div>
            <div><NavLink to="/SignUp" className={({ isActive }) => isActive ? 'text-indigo-600' : 'text-black'} onClick={onClose}>Sign Up</NavLink></div>
          </div>
}
        </div>
        <div>
          <img src={logo} className="w-34 ml-5 mb-16" alt="" />
        </div>
      </div>
    </nav >
  )
}

export default Sliding_Navbar
