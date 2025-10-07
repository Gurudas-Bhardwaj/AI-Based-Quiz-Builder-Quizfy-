import React, { useContext, useState } from 'react'
import Bell from "../../../assests/Images/HomePageImages/Bell.png"
import user from "../../../assests/Images/HomePageImages/user.png"
import down from "../../../assests/Images/HomePageImages/down.png"
import AI from "../../../assests/Images/HomePageImages/AI.png"
import userone from "../../../assests/Images/HomePageImages/user_one.png"
import pin from "../../../assests/Images/HomePageImages/pin.png"
import { useAuth } from '../../../Context/authContext'
import ProfileSection from './ProfileSection'
import NotificationCom from './NotificationCom'
import AccountSettingPOPUP from './AccountSettingPOPUP'
import { Plus } from 'lucide-react'
import SelectPresenation from './Create Presentation From here/SelectPresenation'
import JoinPresentation from './Join Presentation/JoinPresentation'

const Home = () => {
  const {userName}=useAuth();
  // console.log(userId);

  const [state, setState] = useState(false);
  const [NotificationState, setNotificationState] = useState(false);

  const [settingState, setSettingState] = useState(false);

  const[createPresenation, setCreatePresenatation] = useState(false);
  const [joinPresentation, setJoinPresentation] = useState(false);

  return (
    <main className='w-full relative mt-6'>
        <div >
            <div className='w-full flex justify-between items-center'>

              <div className='w-full ml-10 mr-5 '>
                <input type="text" className='h-9 w-[90%] sm:w-[70%] md:w-[50%] pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px]' placeholder='Search Presentation, Folder and Pages' />
              </div>

              <div className='flex h-full  items-center  gap-2 mr-14 md:mr-8'>
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
              <div className='w-full flex flex-col justify-center items-center sm:items-start'>
                <h1 className='font-Montserrat font-bold inline text-3xl text-center sm:text-left'>Welcome {userName?.split(" ")[0]}!</h1>
              </div>

              <div className='mt-8'>
                <div className='flex flex-col sm:flex-row justify-center items-center sm:justify-start gap-4'>
                  <div >
                    <button className='pt-1 flex justify-between items-center gap-4 pb-1 pl-4 pr-4 text-sm rounded-2xl text-white bg-gray-950 font-Outfit'>New Task ! <span className='border-l pl-2 border-l-gray-400'>
                        <img src={down} className='w-5 rotate-90 bg-white rounded-full' alt="" />
                      </span></button>
                  </div>
                  <div>
                    <button className='pt-1 cursor-pointer flex justify-between items-center gap-1 pb-1 pl-4 pr-5 text-[14px] rounded-2xl border-2 border-black font-Outfit'> <span className=''>
                        <img src={AI} className='w-4' alt="" />
                      </span>Start with AI</button>
                  </div>
                </div>

                <div className='w-full flex mt-6'>
                    <div className='w-[90%] md:w-[80%] flex flex-col pl-8 pt-6 rounded-2xl pr-8' style={{"backgroundColor":"#f8f8fe"}}>
                        <div className='font-space text-[16px] font-bold'>
                          <p>Create Presentations</p>
                        </div>

                        <div onClick={()=>setCreatePresenatation(!createPresenation)} className='w-full flex flex-col justify-center items-center cursor-pointer mt-6 mb-6'>
                          <div className='p-5 rounded-full w-auto h-auto border border-gray-300 mb-3 bg-gray-300 inline-flex'>
                            <Plus size={60}/>
                          </div>
                          <div className='w-full flex flex-col justify-center items-center'>
                            <h1 className='font-Outfit text-lg font-semibold pt-2'>Create Custom Presentation</h1>
                            <p className='font-Outfit text-sm w-[80%] text-center text-stone-500'>Create Presenation accoring to your choice, You can choose interactive options like poll, Ranking, Open Ended and many more.</p>
                          </div>
                        </div>
                        
                    </div>
                </div>

                <div className='w-full flex mt-8 mb-8'>
                    <div className='w-[90%] md:w-[80%] flex flex-col pl-8 pt-6 rounded-2xl pr-8' style={{"backgroundColor":"#f8f8fe"}}>
                        <div className='font-space text-[16px] font-bold'>
                          <p>Join Quizies</p>
                        </div>

                        <div onClick={()=>setJoinPresentation(!joinPresentation)} className='w-full flex flex-col justify-center items-center cursor-pointer mt-6 mb-6'>
                          <div className='p-5 rounded-full w-auto h-auto border border-gray-300 mb-3 bg-gray-300 inline-flex'>
                            <Plus size={60}/>
                          </div>
                          <div className='w-full flex flex-col justify-center items-center'>
                            <h1 className='font-Outfit text-lg font-semibold pt-2'>Join a Quiz</h1>
                            <p className='font-Outfit text-sm w-[80%] text-center text-stone-500'>You can join Quizies made by other and can give answers to questions and be a part of our family</p>
                          </div>
                        </div>
                        
                    </div>
                </div>

                

              </div>
            </div>
        </div>
        <div  className={`transition-all duration-300 ease-in-out ${settingState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed left-0 bg-stone-950/80 w-screen h-screen top-0`}>
              <AccountSettingPOPUP onClose={()=>setSettingState(false)}/>
        </div>
        
          <div className={`fixed top-0 left-0 inset-0 ${createPresenation?'pointer-events-auto' : 'pointer-events-none'} justify-center items-center z-50`}>
            <SelectPresenation isVisible={createPresenation} onClose={()=>setCreatePresenatation(!createPresenation)} />
          </div>
        
          <div className={`fixed top-0 left-0 inset-0 ${joinPresentation?'pointer-events-auto' : 'pointer-events-none'} justify-center items-center z-50`}>
            <JoinPresentation isVisible={joinPresentation} onClose={()=>setJoinPresentation(!joinPresentation)} />
          </div>
              
    </main>
  )
}

export default Home
