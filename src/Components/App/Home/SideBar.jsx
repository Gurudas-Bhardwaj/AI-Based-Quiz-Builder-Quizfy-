import React from 'react'
import Logo from "../../../assests/Images/Logo/Logo.png"
import home from "../../../assests/Images/HomePageImages/homeIcon.png"
import user from "../../../assests/Images/HomePageImages/user.png"
import users from "../../../assests/Images/HomePageImages/users.png"
import share from "../../../assests/Images/HomePageImages/share.png"
import template from "../../../assests/Images/HomePageImages/template.png"
import airplane from "../../../assests/Images/HomePageImages/airplane.png"
import { NavLink } from 'react-router'


const SideBar = () => {
  return (
    <aside className='w-full'>
      <div className="flex w-full flex-col gap-5 pl-7">

        <div className='w-full'>
          <div className="ml-2 mt-14 mb-5">
            <img src={Logo} className='w-36' alt="logo" />
          </div>
        </div>

        <div className=''>
          <div className='flex gap-3 flex-col text-xs'>
            <NavLink to="/App/Admin/Home" className={ ({isActive}) => `flex cursor-pointer border-l-2 ${isActive?" border-l-purple-900":"border-l-transparent"} gap-2 pl-2  justify-start items-center`}>
              <img src={home} className="w-3" alt="" />
              <p className='font-Outfit'>Home</p>
            </NavLink>
            <NavLink to="/App/Admin/MyPresentation" className={ ({isActive}) => `flex cursor-pointer border-l-2 ${isActive?" border-l-purple-900":"border-l-transparent"} gap-2 pl-2  justify-start items-center`}>
              <img src={user} className="w-4" alt="" />
              <p className='font-Outfit'>My Presentation</p>
            </NavLink>
            <div className="flex  gap-2 pl-2 cursor-pointer justify-start items-center">
              <img src={share} className="w-4" alt="" />
              <p className='font-Outfit '>Shared with me</p>
            </div>
          </div>
        </div>


        <div className='mt-5'>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-xs text-gray-500 font-extralight font-Outfit'>Workspace</p>
            </div>
            <div className='flex gap-3 flex-col text-xs'>
              <div className="flex cursor-pointer  gap-2 pl-2 justify-start items-center">
                <img src={users} className="w-4" alt="" />
                <p className='font-Outfit'>Workspace Presentation</p>
              </div>
              <div className="flex cursor-pointer gap-2 pl-2 justify-start items-center">
                <img src={airplane} className="w-4" alt="" />
                <p className='font-Outfit'>Shared Template</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-7'>
          <div className='flex flex-col gap-2 font-extralight'>
            <div className='cursor-pointer'>
              <p className='text-[11px] font-Outfit'>Templates</p>
            </div>
            <div className='cursor-pointer'>
              <p className='text-[11px] font-Outfit'>Integrations</p>
            </div>
            <div className='cursor-pointer'>
              <p className='text-[11px] font-Outfit'>Help</p>
            </div>
            <div className='cursor-pointer'>
              <p className='text-[11px] font-Outfit'>ReadMe</p>
            </div>
            <NavLink to="https://tailwind-portfolio-red.vercel.app/" target='main' className='cursor-pointer'>
              <p className='text-[11px] font-Outfit'>About Us</p>
            </NavLink>
          </div>
        </div>

      </div>
    </aside>
  )
}

export default SideBar
