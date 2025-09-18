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
        <div className={`fixed inset-0 z-50 flex font-Outfit justify-center items-center transition-all duration-500 ease-out bg-black/70 backdrop-blur-lg ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
            <div className='relative w-[95%] max-w-md max-h-[400px] bg-white/80 bg-clip-padding backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl flex flex-col p-8 animate-fadeInUp overflow-auto' >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-red-100 shadow transition-all">
                    <CirclePlus className='h-6 w-6 rotate-45 text-red-500 hover:text-red-400 transition' />
                </button>
                <div className="flex flex-col items-center justify-center gap-2 mt-2 mb-4">
                    <h2 className='font-extrabold text-2xl text-gray-800 flex items-center gap-2'>
                        <CirclePlus className="text-indigo-500" size={26} />
                        Join a Presentation
                    </h2>
                    <p className='text-sm text-gray-500 text-center font-Sora'>Enter the presentation link to join an existing session.</p>
                </div>
                <input 
                    value={presentationLink} 
                    onChange={(e) => setPresentationLink(e.target.value)} 
                    type="text" 
                    className='border-2 border-indigo-200 focus:border-indigo-400 outline-none rounded-xl px-4 py-2 w-full mb-5 bg-white/80 shadow-inner transition-all' 
                    placeholder='Paste Presentation Link here...' 
                />
                <button 
                    onClick={Join} 
                    disabled={!presentationLink}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                        ${presentationLink ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white hover:scale-105 hover:shadow-xl' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
                >
                    <CirclePlus className="text-white/80" size={18} />
                    Join
                </button>
            </div>
        </div>
    )
}

export default JoinPresentation
