import { CirclePlus, Cross, CrossIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const JoinPresentation = ({ isVisible, onClose }) => {

    const navigate = useNavigate();
    const [presentationLink, setPresentationLink] = useState('');

    const Join = () => {
        // Handle join presentation logic
        window.location = presentationLink;
    }

    return (
        <div className={`w-screen h-screen flex font-Outfit justify-center items-center transition-all duration-500 ease-out inset-0 bg-black/70 ${isVisible ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>

            <div className='w-[90%] md:w-[40%] h-auto bg-white rounded-2xl p-6'>
                <div className='w-full flex justify-end'>
                    <CirclePlus className='h-6 w-6 rotate-45 text-red-500 hover:text-red-400 cursor-pointer' onClick={onClose} />
                </div>
                <h2 className='font-bold text-lg  text-center'>Join a Presentation</h2>
                <p className='text-sm text-gray-600 mb-4 text-center    '>Enter the presentation code to join an existing presentation.</p>
                <input value={presentationLink} onChange={(e) => setPresentationLink(e.target.value)} type="text" className='border border-gray-300 rounded-md p-2 w-full mb-4' placeholder='Presentation Link' />
                <div className='flex justify-between'>
                    <button onClick={Join} className='bg-blue-500 text-white rounded-md p-2 w-full'>Join</button>
                    
                </div>
            </div>


        </div>
    )
}

export default JoinPresentation
