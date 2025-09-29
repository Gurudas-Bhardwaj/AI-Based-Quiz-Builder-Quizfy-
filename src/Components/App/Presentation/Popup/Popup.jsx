import React from 'react'
import { FaCaretUp } from 'react-icons/fa'

const Popup = ({ isVisible, value }) => {
    return (
        <div
            className={`absolute flex-col left-0 z-50 gap-0 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 flex' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
            {/* Popup value */}
            <div className='absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-3 py-1 flex justify-center items-center rounded-2xl text-white bg-black font-space font-semibold whitespace-nowrap z-10'>
                <p className='text-base'>{value}</p>
            </div>

            {/* Caret (up arrow) */}
            <div className='absolute top-[-18px] left-1/2 transform '>
                <FaCaretUp className='text-2xl rotate-180 text-black' />
            </div>
        </div>
    )
}

export default Popup
