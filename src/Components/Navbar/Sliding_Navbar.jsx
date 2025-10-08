import React from 'react'
import close from "../../assets/Images/Logo/close.png"
import logo from "../../assets/Images/Logo/LOGO.png"
import { NavLink } from 'react-router'
import classNames from 'classnames'

const Sliding_Navbar = ({ isopen, onClose }) => {
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
          <div><NavLink to='/' onClick={onClose}>Home</NavLink></div>
          <div><NavLink onClick={onClose}>How to use</NavLink></div>
          <div><NavLink onClick={onClose}>Pricing</NavLink></div>
          <div><NavLink onClick={onClose}>About us</NavLink></div>
          <div><NavLink onClick={onClose}>ReadMe</NavLink></div>
          <div><NavLink to="/Login" onClick={onClose}>Login</NavLink></div>
          <div><NavLink to="/SignUp" onClick={onClose}>Sign Up</NavLink></div>
        </div>
        <div>
          <img src={logo} className="w-34 ml-5 mb-4" alt="" />
        </div>
      </div>
    </nav>
  )
}

export default Sliding_Navbar
