import React from 'react'
import { ChevronDown } from 'lucide-react';

const ParticipantInRoom = ({ isVisible, onClose, participantList = [] }) => {
    const maxLength = 20;
    const tranculateText = (name, nameLength) => {
        return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
    }

    return (
        <div className={`w-[350px] h-[550px] rounded-2xl border border-gray-200 shadow-xl bg-white font-Outfit transition-all ease-in-out duration-500 flex flex-col ${isVisible ? 'opacity-100 -translate-y-5' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
            {/* Header */}
            <div className='w-full flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100'>
                <h1 className='font-Montserrat font-bold text-base text-gray-800'>Participants</h1>
                <ChevronDown className='cursor-pointer text-gray-400 hover:text-indigo-400 transition' onClick={onClose} />
            </div>
            {/* Responses Section */}
            <div className='flex-1 w-full flex flex-col gap-4 px-4 py-3 overflow-auto'>

                {/* Joined By Section */}
                <div>
                    <h2 className='text-sm font-semibold text-gray-700 mb-2'>Participants In Room</h2>
                    <div className={`overflow-auto min-h-[120px] ${participantList.length > 0 ? 'grid grid-cols-2 gap-2' : 'flex justify-center items-center'} pr-1`}>
                        {participantList.length === 0 ? (
                            <p className='text-sm text-center text-gray-400'>No participants joined yet.</p>
                        ) : (
                            participantList.map((participant) => (
                                <span key={participant.userId} className='bg-indigo-100 text-indigo-600 rounded-xl px-3 py-1 text-xs font-Outfit text-center shadow'>{tranculateText(participant.userName, participant.userName.length)}</span>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParticipantInRoom
