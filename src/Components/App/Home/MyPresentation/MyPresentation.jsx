import React, { useState } from 'react'
import Bell from "../../../../assests/Images/HomePageImages/Bell.png"
import NotificationCom from '../NotificationCom';
import ProfileSection from '../ProfileSection';
import userone from "../../../../assests/Images/HomePageImages/user_one.png"
import { FaSearch } from 'react-icons/fa';


const MyPresentation = () => {
    
    
      const [state, setState] = useState(false);
      const [NotificationState, setNotificationState] = useState(false);
    
      const [settingState, setSettingState] = useState(false);
    
      const[featureDisplay, setFeatureDisplay] = useState(false);
      const [selectedFeature, setSelectedFeature] = useState(null);
    

  return (
    <main className='w-full '>
        <div className='w-full flex flex-col pl-4'>

            <div className='w-full flex justify-end mt-10 items-center'>

              

              <div className='flex h-full  items-center  gap-2 mr-8'>
                <div className='relative'>
                  <div onClick={()=>{setNotificationState(!NotificationState); setState(false)}} className='h-8 w-8 rounded-full flex justify-center items-center bg-stone-200 hover:bg-stone-300 cursor-pointer'>
                    <img src={Bell} className='w-3' alt="" />
                  </div>
                  <NotificationCom display={NotificationState}/>
                </div>
                <div className='relative'>
                  <div className='h-8 w-8 bg-indigo-300 hover:bg-indigo-400 transition cursor-pointer hover: rounded-full flex justify-center items-center' onClick={()=>{setState(!state); setNotificationState(false)}}>
                    <img src={userone} className='w-4' alt="" />
                </div>
                <ProfileSection display={state} onClose={()=>setState(false)} setSettingState={setSettingState}/>
                </div>
              </div>

            </div>

            <div className='w-full flex flex-col js pt-8 pl-8 gap-4 items-start'>
                <div className='flex'>
                    <h1 className='text-2xl font-Outfit'>
                        My Presentations
                    </h1>
                </div>

                <div className='w-full items-center flex gap-2 ml mr-5 '>
                <input type="text" className='h-9 w-[90%] sm:w-[70%] md:w-[40%] pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px]' placeholder='Search Presentations' />
                <div className='p-2 border bg-stone-300 border-transparent rounded-full'>
                    <FaSearch className='text-sm'/>
                </div>
              </div>

            </div>
        </div>
    </main>
  )
}

export default MyPresentation
