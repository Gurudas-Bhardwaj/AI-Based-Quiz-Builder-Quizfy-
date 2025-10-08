import React, { useState } from 'react'
import SideBar from './Home/SideBar'
import { Outlet } from 'react-router'
import menu from "../../assets/Images/Logo/menu.png"
import SlidingSideBar from './Home/SlidingSideBar'

const appLayout = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className='overflow-hidden w-[99%] relative flex justify-center'>

      <div className='hidden md:block  w-1/5'>
        <SideBar/>
      </div>

      <div className='overflow-x-hidden w-[100%] md:w-4/5'>
        <Outlet/>
      </div>

      <div className='absolute right-3 overflow-x-hidden' onClick={()=>{setOpen(!open)}}>
        <img src={menu} className='w-5 flex md:hidden displayMenu mt-8' alt="" />
        <SlidingSideBar isopen={open} onClose={() => setOpen(false)}/>
      </div>
      
    </div>
  )
}

export default appLayout
