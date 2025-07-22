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
import AccountSettingPOPUP from './AccountSettingPOPUP'
import Poll from './featureModel/Poll'
import Ranking from './featureModel/ranking'
import OpenEnded from './featureModel/openEnded'

const Home = () => {
  const {userName}=useAuth();

  const [state, setState] = useState(false);
  const [NotificationState, setNotificationState] = useState(false);

  const [settingState, setSettingState] = useState(false);

  const[featureDisplay, setFeatureDisplay] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <main className='w-full relative mt-6'>
        <div >
            <div className='w-full flex justify-between items-center'>

              <div className='w-full ml-10 mr-5 '>
                <input type="text" className='h-9 w-[90%] sm:w-[70%] md:w-[50%] pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px]' placeholder='Search Presentation, Folder and Pages' />
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
                <ProfileSection display={state} onClose={()=>setState(false)} setSettingState={setSettingState}/>
                </div>
              </div>

            </div>

            <div className='pl-10  pt-10'>
              <div className='w-full '>
                <h1 className='font-Montserrat font-bold inline text-2xl'>Welcome {userName.split(" ")[0]}!</h1>
              </div>

              <div className='mt-8'>
                <div className='flex flex-col sm:flex-row justify-center items-center sm:justify-start gap-4'>
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
                            <div className='md:flex grid grid-cols-2 justify-center items-center gap-10'>
                              <div>
                                <div className='p-5 border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300 bg-white rounded-2xl' onClick={() => setSelectedFeature("ranking")}>
                                  <img src={rank} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Ranking</p>
                                </div>
                              </div>
                              <div>
                                <div className='p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300' onClick={() => setSelectedFeature("poll")}>
                                  <img src={poll} className='w-20' alt="" />
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                  <p className='font-Outfit text-sm pt-2'>Poll</p>
                                </div>
                              </div>

                              <div>
                                <div className='p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all border-transparent hover:border-indigo-300' onClick={() => setSelectedFeature("openEnded")}>
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
        <div  className={`${settingState ? "flex" : "hidden"} fixed left-0 w-screen h-screen top-0`}>
              <AccountSettingPOPUP onClose={()=>setSettingState(false)}/>
        </div>
        {selectedFeature && (
          <div className="fixed w-screen h-screen top-0 left-0 inset-0 bg-black/70 flex justify-center items-center z-50">
            {selectedFeature === "poll" && <Poll onClose={() => setSelectedFeature(null)} />}
            {selectedFeature === "ranking" && <Ranking onClose={() => setSelectedFeature(null)} />}
            {selectedFeature === "openEnded" && <OpenEnded onClose={() => setSelectedFeature(null)} />}
          </div>
        )}
    </main>
  )
}

export default Home
