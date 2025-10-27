import React from 'react'
import Logo from "../../../assets/Images/Logo/LOGO.png"
import home from "../../../assets/Images/HomePageImages/homeIcon.png"
import user from "../../../assets/Images/HomePageImages/user.png"
import { MdAutoAwesome } from "react-icons/md";
import share from "../../../assets/Images/HomePageImages/share.png"
import { NavLink, useNavigate } from 'react-router'
import { CirclePlus } from 'lucide-react'


const SideBar = ({displayReportBug}) => {

  const Navigate = useNavigate();
  return (
    <aside className='w-full'>
      <div className="flex w-full flex-col gap-5 pl-7">

        <div className='w-full'>
          <div className="ml-2 mt-14 mb-5">
            <img src={Logo} className='w-36' alt="logo" />
          </div>
        </div>

        <div className=''>
          <div className='flex gap-3 flex-col text-sm'>
            <NavLink to="/App/Admin/Home" className={ ({isActive}) => `flex cursor-pointer border-l-2 ${isActive?" border-l-indigo-500":"border-l-transparent"} gap-2 pl-2  justify-start items-center`}>
              <img src={home} className="w-3" alt="" />
              <p className='font-Outfit'>Home</p>
            </NavLink>
            <NavLink to="/App/Admin/MyPresentation" className={ ({isActive}) => `flex cursor-pointer border-l-2 ${isActive?" border-l-indigo-500":"border-l-transparent"} gap-2 pl-2  justify-start items-center`}>
              <img src={user} className="w-4" alt="" />
              <p className='font-Outfit'>My Presentation</p>
            </NavLink>
            <NavLink to="/App/Admin/SharedWithMe" className={({ isActive }) => `flex  gap-2 pl-2 cursor-pointer justify-start items-center border-l-2  ${isActive ? " border-l-indigo-500" : "border-l-transparent"}`}>
              <img src={share} className="w-4" alt="" />
              <p className='font-Outfit '>Shared with me</p>
            </NavLink>
          </div>
        </div>


        <div className='mt-5'>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-sm text-gray-500 font-extralight font-Outfit'>AI Features</p>
            </div>
            <div className='flex gap-3 flex-col text-xs'>
              <div className="flex cursor-pointer text-sm gap-2 pl-2 justify-start items-center">
                <MdAutoAwesome/>
                <p className='font-Outfit'>Create using AI</p>
              </div>
              <div className="flex cursor-pointer text-sm gap-2 pl-2 justify-start items-center">
                <CirclePlus size={18}/>
                <p className='font-Outfit'>Join a AI Powered Quiz</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-7'>
              <div className="flex flex-col gap-2 font-extralight">
        
                <NavLink className="cursor-pointer">
                  <p className="text-[11px] font-Outfit">Templates</p>
                </NavLink>
                <div onClick={displayReportBug} className="cursor-pointer">
                  <p className="text-[11px] font-Outfit">Report a Bug</p>
                </div>
                <NavLink onClick={()=>Navigate("/ReviewUs")} className="cursor-pointer">
                  <p className="text-[11px] font-Outfit">Review us</p>
                </NavLink>
                <NavLink to="https://tailwind-portfolio-red.vercel.app/" target='main' className="cursor-pointer">
                  <p className="text-[11px] font-Outfit">About us</p>
                </NavLink>
                <NavLink  className="cursor-pointer">
                  <p className="text-[11px] font-Outfit">Readme File</p>
                </NavLink>
              </div>
        </div>

      </div>
    </aside>
  )
}

export default SideBar
