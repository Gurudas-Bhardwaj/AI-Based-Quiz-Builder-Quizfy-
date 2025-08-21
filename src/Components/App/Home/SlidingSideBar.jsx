import React from 'react'
import close from "../../../assests/Images/Logo/close.png"
import logo from "../../../assests/Images/Logo/LOGO.png"
import logoReal from "../../../assests/Images/Logo/LogoReal.png"
import { NavLink } from 'react-router'
import classNames from 'classnames'

import Logo from "../../../assests/Images/Logo/Logo.png"
import home from "../../../assests/Images/HomePageImages/homeIcon.png"
import user from "../../../assests/Images/HomePageImages/user.png"
import users from "../../../assests/Images/HomePageImages/users.png"
import share from "../../../assests/Images/HomePageImages/share.png"
import template from "../../../assests/Images/HomePageImages/template.png"
import airplane from "../../../assests/Images/HomePageImages/airplane.png"

const SlidingSideBar = ({ isopen, onClose }) => {
    return (
        <nav className={classNames(
            'fixed top-0 left-0 flex justify-end w-screen h-screen z-50 bg-black/40 backdrop-blur-md transition-transform duration-300 ease-in-out',
            {
                'translate-x-0': isopen,
                'translate-x-full': !isopen
            }
        )}>

            <div className='w-[90%] bg-white flex flex-col gap-5 '>
                <div className='w-full flex justify-end'>
                    <div onClick={onClose} className='mr-[12%] mt-[6%] flex justify-start items-center'>
                        <img src={close} className='w-7 p-1  ' alt="" />
                    </div>
                </div>

                <div className='ml-4'>
                    <div className='flex gap-3 flex-col text-xs'>
                        <div className="flex border-l-2 gap-2  w-full cursor-pointer border-l-purple-900 pl-2 justify-start items-center">
                            <img src={home} className="w-3" alt="" />
                            <p className='font-Outfit'>Home</p>
                        </div>
                        <NavLink to="/App/MyPresentation" className="flex cursor-pointer gap-2 pl-2 justify-start items-center">
                            <img src={user} className="w-4" alt="" />
                            <p className='font-Outfit'>My Presentation</p>
                        </NavLink>
                        <div className="flex  gap-2 pl-2 cursor-pointer justify-start items-center">
                            <img src={share} className="w-4" alt="" />
                            <p className='font-Outfit '>Shared with me</p>
                        </div>
                    </div>
                </div>

                <div className='mt-5 ml-4'>
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

                <div className='mt-2 ml-4'>
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
                        <div className='cursor-pointer'>
                            <p className='text-[11px] font-Outfit'>About Us</p>
                        </div>
                    </div>
                <div className='w-full flex justify-center items-center'>
                    <img src={logo} className='w-32' alt="" />
                </div>
                </div>


            </div>
        </nav>
    )
}

export default SlidingSideBar
