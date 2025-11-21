import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

const JoinPresentation = ({ isVisible, onClose }) => {

    const [presentationLink, setPresentationLink] = useState('');

    const Join = () => {
        // Handle join presentation logic
        window.location = presentationLink;
    };

    return (
        <div 
            className={`fixed font-Outfit inset-0 z-50 flex justify-center items-center transition-all duration-500 ease-out bg-stone-950/70 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="relative w-[95%] max-w-md max-h-[400px] bg-white rounded-xl shadow-xl p-8 overflow-auto">
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-gray-200 transition-all"
                >
                    <CirclePlus className="h-6 w-6 rotate-45 text-indigo-500 hover:text-indigo-400 transition" />
                </button>
                <div className="flex flex-col items-center justify-center gap-2 mt-2 mb-4">
                    <h2 className="font-Outfit text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                        <CirclePlus className="text-indigo-500" size={26} />
                        Join a Presentation
                    </h2>
                    <p className="text-sm text-gray-500 text-center font-Monstserrat">
                        Enter the presentation link to join an existing session.
                    </p>
                </div>
                <input 
                    value={presentationLink} 
                    onChange={(e) => setPresentationLink(e.target.value)} 
                    type="text" 
                    className="border-2 border-indigo-200 focus:border-indigo-500 outline-none rounded-xl px-4 py-2 w-full mb-5 bg-white shadow-inner transition-all"
                    placeholder="Paste Presentation Link here..." 
                />
                <button 
                    onClick={Join} 
                    disabled={!presentationLink}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 
                        ${presentationLink ? 'bg-indigo-500 text-white hover:scale-105 hover:shadow-xl' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
                >
                    <CirclePlus className="text-white" size={18} />
                    Join
                </button>
            </div>
        </div>
    );
};

export default JoinPresentation;
