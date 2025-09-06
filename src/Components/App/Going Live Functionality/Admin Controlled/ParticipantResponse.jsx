import React, { useEffect } from 'react'
import { ChevronDown, Send, User } from 'lucide-react'

const ParticipantResponse = ({ isVisible, onClose, participantList }) => {
    useEffect(()=>{
        console.log(participantList);
    }, [participantList])

    return (
        <div className={`w-[300px] h-[500px] rounded-2xl border border-white drop-shadow-2xl pl-5 pt-4 bg-white font-Outfit transition-all ease-in-out duration-500 ${isVisible ? 'opacity-100 -translate-y-5' : 'opacity-0 translate-y-0   pointer-events-none'}`}>
            <div className='w-full'>
                <div className='w-full flex justify-between pr-5'>
                    <h1 className='font-Montserrat font-bold'>Participants</h1>
                    <ChevronDown className='cursor-pointer' onClick={onClose} />
                </div>
            </div>
            <div className='w-full flex h-full flex-col  '>
                <div className='w-full mt-5 h-1/2'>
                    <h1 className='text-sm font-poppins text-stone-800'>Responses By : </h1>
                    <div className='overflow-auto h-[90%] flex flex-col mt-3 pr-3 gap-1 place-content-start'>
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        <div className='pl-2 pr-2 pt-1 pb-1    flex gap-2 items-center rounded-2xl'>
                            <div className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Gurudas Bhardwaj</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-2xl'>
                                <p className='text-xs'>Q1</p>
                            </div>
                            <div className='pl-2 pr-2 pt-1 pb-1 bg-indigo-400 text-white rounded-full'>
                                <p className='text-xs'>B</p>
                            </div>
                        </div>  
                        
                    </div>
                </div>
                <div className='w-full mt-5 '>
                    <h1 className='text-sm font-poppins text-stone-800'>Joined By : </h1>
                    <div className={`overflow-auto h-[100%] ${ participantList.length > 0 ? "grid grid-cols-2" : "flex justify-center items-center"} mt-3 pr-3 gap-2 place-content-start`}>
                        {participantList.length === 0 ? <p className='text-sm text-center  text-gray-500'>No participants joined yet.</p> :
                            participantList.map((participant, index) => (
                        <div className='pl-2 pr-2 pt-1 pb-1   bg-indigo-400 flex justify-center items-center rounded-2xl border border-indigo-400'>
                            <p className='text-xs  font-Outfit text-white'>{participant.userName}</p>
                        </div> )
                    )}
                    </div>
                </div>



            </div>
        </div>
    )
}

export default ParticipantResponse
