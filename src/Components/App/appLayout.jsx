import React, { useState } from 'react'
import SideBar from './Home/SideBar'
import { Outlet } from 'react-router'
// import "./layout.css"
import menu from "../../assests/Images/Logo/menu.png"
import SlidingSideBar from './Home/SlidingSideBar'
import AccountSettingPOPUP from './Home/AccountSettingPOPUP'

const appLayout = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className='overflow-hidden w-[99%] flex justify-center'>

      <div className='hidden md:block w-1/5'>
        <SideBar/>
      </div>

      <div className='overflow-x-hidden w-[90%] md:w-4/5'>
        <Outlet/>
      </div>

      <div className='w-[10%] md:w-[0%] overflow-x-hidden' onClick={()=>{setOpen(!open)}}>
        <img src={menu} className='w-5 flex md:hidden displayMenu mt-8' alt="" />
        <SlidingSideBar isopen={open} onClose={() => setOpen(false)}/>
      </div>
      
    </div>
  )
}

export default appLayout
