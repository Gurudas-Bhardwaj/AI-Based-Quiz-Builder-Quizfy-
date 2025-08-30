import { ChevronDown, Send, User } from 'lucide-react'
import React from 'react'

const CommentSection = ({isVisible, onClose}) => {
    return (
        <div className={`w-[300px] h-[450px] rounded-2xl border border-white drop-shadow-2xl pl-5 pt-4 bg-white font-Outfit transition-all ease-in-out duration-500 ${isVisible ? 'opacity-100 -translate-y-5' : 'opacity-0 translate-y-0   pointer-events-none'}`}>
            <div className='w-full'>
                <div className='w-full flex justify-between pr-5'>
                    <h1 className='font-Montserrat font-bold'>Comment Section</h1>
                    <ChevronDown className='cursor-pointer' onClick={onClose}/>
                </div>
            </div>
            <div className='w-full flex flex-col justify-between '>
                <div className='w-full mt-5 flex flex-col gap-3 h-[350px] overflow-auto'>
                    <div className='flex cursor-pointer items-end gap-2'>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-indigo-300 text-white rounded-full'>
                            <User size={15} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div>
                                <p className=' pl-2 text-[10px] text-gray-800'>Gurudas</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-indigo-400 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-end gap-2'>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-indigo-300 text-white rounded-full'>
                            <User size={15} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div>
                                <p className=' pl-2 text-[10px] text-gray-800'>Gurudas</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-indigo-400 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-end gap-2'>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-indigo-300 text-white rounded-full'>
                            <User size={15} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div>
                                <p className=' pl-2 text-[10px] text-gray-800'>Gurudas</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-indigo-400 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-end gap-2'>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-indigo-300 text-white rounded-full'>
                            <User size={15} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div>
                                <p className=' pl-2 text-[10px] text-gray-800'>Gurudas</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-indigo-400 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-end gap-2'>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-indigo-300 text-white rounded-full'>
                            <User size={15} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <div>
                                <p className=' pl-2 text-[10px] text-gray-800'>Gurudas</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-indigo-400 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-end gap-2 pr-3'>
                        <div className='flex-1 flex flex-col justify-center items-end'>
                            <div>
                                <p className=' pr-3 text-[10px] text-gray-800'>Me</p>
                            </div>
                            <div className='max-w-[80%] p-2 bg-amber-500 text-white rounded-3xl text-xs'>
                                <h2>Hello I want to ask a question what is </h2>
                            </div>
                        </div>
                        <div className='h-6 w-6 flex justify-center mb-[5px] items-center bg-amber-400 text-white rounded-full'>
                            <User size={15} />
                        </div>
                    </div>
                </div>

                <div className='w-full pt-2 flex gap-2 items-center'>
                    <input type="text" className='h-6 w-[80%] border rounded-2xl text-black text-xs pl-2 ' />
                    <button className='border rounded-full p-1 border-indigo-400 bg-indigo-400 text-white'><Send size={15}/></button>
                </div>

            </div>
        </div>
    )
}

export default CommentSection
