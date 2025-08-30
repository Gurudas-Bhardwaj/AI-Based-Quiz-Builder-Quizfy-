import React from 'react'
import { FaCaretUp } from 'react-icons/fa'

const PopUp = ({isVisible, value}) => {
    return (
        <div className={`absolute flex-col left-0 z-50 gap-0 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 flex' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className='absolute -top-9 -left-[50px] px-3 py-1 flex justify-center items-center rounded-2xl text-white bg-black font-Outfit whitespace-nowrap z-10'>
                <p className='text-xs'>{value}</p>
            </div>
            <div className='absolute -top-[22px] -left-1'>
                <FaCaretUp className='text-2xl rotate-180 text-black' />
            </div>
        </div>
    )
}

export default PopUp
