import React, { useEffect, useState } from 'react';
import close from "../../../assets/Images/Logo/close.png";
import logo from "../../../assets/Images/Logo/LOGO.png";
import { NavLink } from 'react-router';
import { PlusCircle } from 'lucide-react';

import home from "../../../assets/Images/HomePageImages/homeIcon.png";
import user from "../../../assets/Images/HomePageImages/user.png";
import users from "../../../assets/Images/HomePageImages/users.png";
import share from "../../../assets/Images/HomePageImages/share.png";

const SlidingSideBar = ({ isopen, onClose }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);

  useEffect(() => {
    if (isopen) {
      setShowSidebar(true); // Mount it
      // Wait for the next event loop so that transition classes can apply
      setTimeout(() => {
        setAnimateSidebar(true); // Trigger slide-in
      }, 10);
    } else {
      setAnimateSidebar(false); // Trigger slide-out
      // Wait for animation to finish before unmounting
      const timeout = setTimeout(() => {
        setShowSidebar(false);
      }, 300); // Match your transition duration
      return () => clearTimeout(timeout);
    }
  }, [isopen]);

  return (
    <>
      {showSidebar && (
        <nav
          className={`fixed md:hidden  top-0 left-0 flex justify-end w-screen h-screen z-50 bg-black/40 backdrop-blur-md transition-opacity duration-300 ease-in-out ${animateSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div
            className={`w-[90%] transition-transform duration-300 ease-in-out ${animateSidebar ? 'translate-x-0' : 'translate-x-full'
              } bg-white flex flex-col gap-5`}
          >
            {/* Close button */}
            <div className="w-full flex justify-end">
              <div onClick={onClose} className="mr-[12%] mt-[6%] flex justify-start items-center cursor-pointer">
                <img src={close} className="w-7 p-1" alt="Close" />
              </div>
            </div>

            {/* Navigation links */}
            <div className="ml-4">
              <div className="flex gap-3 flex-col text-xs">
                <NavLink
                  to="/App/Admin/Home"
                  className={({ isActive }) =>
                    `flex cursor-pointer border-l-2 ${isActive ? 'border-l-indigo-500' : 'border-l-transparent'
                    } gap-2 pl-2 justify-start items-center`
                  }
                >
                  <img src={home} className="w-3" alt="Home" />
                  <p className="font-Outfit">Home</p>
                </NavLink>
                <NavLink
                  to="/App/Admin/MyPresentation"
                  className={({ isActive }) =>
                    `flex cursor-pointer border-l-2 ${isActive ? 'border-l-indigo-500' : 'border-l-transparent'
                    } gap-2 pl-2 justify-start items-center`
                  }
                >
                  <img src={user} className="w-4" alt="My Presentation" />
                  <p className="font-Outfit">My Presentation</p>
                </NavLink>
                <NavLink
                  to="/App/Admin/SharedWithMe"
                  className={({ isActive }) =>
                    `flex cursor-pointer border-l-2 ${isActive ? 'border-l-indigo-500' : 'border-l-transparent'
                    } gap-2 pl-2 justify-start items-center`
                  }
                >
                  <img src={share} className="w-4" alt="Shared with Me" />
                  <p className="font-Outfit">Shared with me</p>
                </NavLink>
              </div>
            </div>

            {/* Sessions */}
            <div className="mt-3 ml-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-extralight font-Outfit">Sessions</p>
                </div>
                <div className="flex gap-3 flex-col text-xs">
                  <div className="flex cursor-pointer gap-2 pl-2 justify-start items-center">
                    <img src={users} className="w-4" alt="Conducted" />
                    <p className="font-Outfit">Conducted By Me</p>
                  </div>
                  <div className="flex cursor-pointer gap-2 pl-2 justify-start items-center">
                    <PlusCircle size={16} />
                    <p className="font-Outfit">Joined By me</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-2 ml-4">
              <div className="flex flex-col gap-2 font-extralight">
                      
                              <NavLink className="cursor-pointer">
                                <p className="text-[11px] font-Outfit">Templates</p>
                              </NavLink>
                              <div onClick={displayReportBug} className="cursor-pointer">
                                <p className="text-[11px] font-Outfit">Report a Bug</p>
                              </div>
                              <div onClick={()=>Navigate("/ReviewUs")} className="cursor-pointer">
                                <p className="text-[11px] font-Outfit">Review us</p>
                              </div>
                              <NavLink to="https://tailwind-portfolio-red.vercel.app/" target='main' className="cursor-pointer">
                                <p className="text-[11px] font-Outfit">About us</p>
                              </NavLink>
                              <NavLink  className="cursor-pointer">
                                <p className="text-[11px] font-Outfit">Readme File</p>
                              </NavLink>
                            </div>
              <div className="w-full mt-10 flex justify-center items-center">
                <img src={logo} className="w-32" alt="Logo" />
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default SlidingSideBar;
