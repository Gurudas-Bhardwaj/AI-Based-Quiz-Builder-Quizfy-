import React, { useEffect, useState } from 'react'
import Bell from "../../../../assests/Images/HomePageImages/Bell.png"
import NotificationCom from '../NotificationCom';
import ProfileSection from '../ProfileSection';
import userone from "../../../../assests/Images/HomePageImages/user_one.png"
import { FaArrowDown, FaLongArrowAltDown, FaPlay, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../../Context/authContext';
import empty from "../../../../assests/Images/Logo/empty.png"
import { useNavigate } from 'react-router';
import { IoIosArrowRoundDown, IoIosPlayCircle } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import { PiNotePencilBold, PiPencilSimpleLight } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';
import { FaPencil } from 'react-icons/fa6';
import { ChartBarBig, Pencil, Radio, SquarePen } from 'lucide-react';

const MyPresentation = () => {

  const { userId } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState(false);
  const [NotificationState, setNotificationState] = useState(false);

  const [settingState, setSettingState] = useState(false);

  const [presentations, setPresentations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPresentations = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:9000/handleQuestions/GetPresentations?page=${page}&limit=10`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setPresentations((prev) => [...prev, ...data.presentations]);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching presentations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, [])

  const navigateToPres = async (presentationId) => {

    navigate(`/App/Presentation/${presentationId}`)
  }

  return (
    <main className='w-full overflow-hidden'>
      <div className='w-full flex flex-col pl-4'>

        <div className='w-full flex justify-end mt-10 items-center'>



          <div className='flex h-full  items-center  gap-2 mr-8'>
            <div className='relative'>
              <div onClick={() => { setNotificationState(!NotificationState); setState(false) }} className='h-8 w-8 rounded-full flex justify-center items-center bg-stone-200 hover:bg-stone-300 cursor-pointer'>
                <img src={Bell} className='w-3' alt="" />
              </div>
              <NotificationCom display={NotificationState} />
            </div>
            <div className='relative'>
              <div className='h-8 w-8 bg-indigo-300 hover:bg-indigo-400 transition cursor-pointer hover: rounded-full flex justify-center items-center' onClick={() => { setState(!state); setNotificationState(false) }}>
                <img src={userone} className='w-4' alt="" />
              </div>
              <ProfileSection display={state} onClose={() => setState(false)} setSettingState={setSettingState} />
            </div>
          </div>

        </div>

        <div className='w-full flex flex-col js pt-8 pl-8 gap-4 items-start'>
          <div className='flex'>
            <h1 className='text-2xl font-space font-bold'>
              My Presentations
            </h1>
          </div>

          <div className='w-full items-center flex gap-2 ml mr-5 '>
            <input type="text" className='h-9 w-[90%] sm:w-[70%] md:w-[40%] pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px]' placeholder='Search Presentations' />
            <div className='p-2 border bg-stone-300 border-transparent rounded-full'>
              <FaSearch className='text-sm' />
            </div>
          </div>

          <div className='w-[100%] h-auto'>
            {
              presentations.length == 0 ? (
                <div className='font-Outfit h-full flex flex-col gap-2 text-2xl mt-20 w-full justify-center items-center'>
                  <img src={empty} alt="" className='h-28' />
                  <h1 className='inline text-red-500'>Nothing Found</h1>
                </div>
              ) : (
                <div className='w-full mt-10 flex flex-col gap-2'>
                  <div className='w-full font-Outfit font-semibold text-sm flex justify-center '>

                    <div className='flex w-full'>
                      <div className='w-[45%]'>
                        <div className='p-2 flex gap-2 items-center hover:bg-gray-200 h-full '>
                          <h1>Presentation Name</h1>
                        </div>
                      </div>
                      <div className='w-[15%]'>
                        <h1>Created By</h1>
                      </div>
                      <div className='w-[15%]'>
                        <h1>Created On</h1>
                      </div>
                      <div className='w-[15%]'>
                      </div>
                    </div>
                  </div>

                  <div className='w-full font-Sora text-xs  flex flex-col gap-3  h-[200px] overflow-auto'>


                    {
                      presentations.map((key, index) =>
                        <div key={index} className='flex w-full '>
                          <div onClick={()=>navigateToPres(key._id)} className='w-[45%] flex gap-3  items-center cursor-pointer'>
                            <div className='h-5 w-5 bg-stone-200 rounded-full flex justify-center items-center'>
                              <FaPlay className='text-black text-[8px] ' />
                            </div>
                            <h1>{key.title}</h1>
                          </div>
                          <div className='w-[15%] text-gray-600 flex items-center'>
                            <h1>Me</h1>
                          </div>
                          <div className='w-[25%] flex text-gray-600 items-center'>
                            <h1>{new Date(key.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}</h1>

                            <div className=' relative -top-10 left-[70%] text-black bg-white border border-white shadow-sm p-2 rounded-xl'>
                              <div>
                                
                              </div>
                            </div>
                          </div>
                          <div className='w-[15%] flex items-center'>
                            <BsThreeDots className='text-xl cursor-pointer' />
                          </div>
                        </div>
                      )
                    }

                  </div>
                </div>
              )
            }
          </div>

        </div>
      </div>
    </main>
  )
}

export default MyPresentation
