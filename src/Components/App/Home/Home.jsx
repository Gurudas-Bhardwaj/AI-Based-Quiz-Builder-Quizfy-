import React, { useContext, useState } from 'react'
import Bell from "../../../assests/Images/HomePageImages/Bell.png"
import user from "../../../assests/Images/HomePageImages/user.png"
import down from "../../../assests/Images/HomePageImages/down.png"
import AI from "../../../assests/Images/HomePageImages/AI.png"
import userone from "../../../assests/Images/HomePageImages/user_one.png"
import poll from "../../../assests/Images/HomePageImages/poll.png"
import rank from "../../../assests/Images/HomePageImages/rank.png"
import openEnded from "../../../assests/Images/HomePageImages/openEnded.png"
import pin from "../../../assests/Images/HomePageImages/pin.png"
import { useAuth } from '../../../Context/authContext'
import ProfileSection from './ProfileSection'
import NotificationCom from './NotificationCom'

const Home = () => {
  
  const [state, setState] = useState(false);
  const [NotificationState, setNotificationState] = useState(false);

  return (
    <main className='w-4/5 mt-6'>
        <div >
            <div className='w-full flex justify-between items-center'>

              <div className='w-full ml-10 mr-5 '>
                <input type="text" className='h-9 w-[50%] pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px]' placeholder='Search Presentation, Folder and Pages' />
              </div>

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
                <ProfileSection display={state}/>
                </div>
              </div>

            </div>

            <div className='pl-10  pt-10'>
              <div className='w-full '>
                <h1 className='font-Montserrat font-bold inline text-2xl'>Welcome !</h1>
              </div>

              <div className='mt-8'>
                <div className='flex gap-4'>
                  <div >
                    <button className='pt-1 flex justify-between items-center gap-4 pb-1 pl-4 pr-4 text-xs rounded-2xl text-white bg-gray-950 font-Outfit'>New Task ! <span className='border-l pl-2 border-l-gray-400'>
                        <img src={down} className='w-5 rotate-90 bg-white rounded-full' alt="" />
                      </span></button>
                  </div>
                  <div>
                    <button className='pt-1 cursor-pointer flex justify-between items-center gap-1 pb-1 pl-4 pr-5 text-[13px] rounded-2xl border-2 border-black font-Outfit'> <span className=''>
                        <img src={AI} className='w-4' alt="" />
                      </span>Start with AI</button>
                  </div>
                </div>

                <div className='w-full flex mt-6'>
                    <div className='flex flex-col pl-8 pt-6 rounded-2xl pr-8' style={{"backgroundColor":"#f8f8fe"}}>
                        <div className='font-space text-[13px] font-bold'>
                          <p>Popular Features</p>
                        </div>

                        <div className='w-full flex justify-center items-center pt-6 pb-4'>
                            <div className='flex justify-center items-center gap-10'>
                              <div>
                                <div className='p-5 border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300 bg-white rounded-2xl'>
                                  <img src={rank} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Ranking</p>
                                </div>
                              </div>
                              <div>
                                <div className='p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300'>
                                  <img src={poll} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Poll</p>
                                </div>
                              </div>

                              <div>
                                <div className='p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300'>
                                  <img src={openEnded} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Open Ended</p>
                                </div>  
                              </div>

                              <div>
                                <div className='p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300'>
                                  <img src={pin} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Pin on Image</p>
                                </div>
                              </div>    
                            </div> 
                        </div>
                    </div>
                </div>

              </div>
            </div>
        </div>
    </main>
  )
}

export default Home
