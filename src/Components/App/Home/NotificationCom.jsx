import React from 'react'

const NotificationCom = (props) => {
  return (
    <div>
      <div className={`absolute z-10 transition-all  bg-white rounded-lg top-9 p-3 -left-[240px] sm:-left-[330px] ${props.display ? "block" : "hidden"}`} style={{ "boxShadow": '0 2px 8px rgba(0, 0, 0, 0.4)' }}>
            <div>
            <div className=' pl-2'>
                <h1 className='text-lg   font-Outfit text-gray-800'>Notifications</h1>
            </div>
            </div>
            <div className=''>
            <div className='font-Outfit mt-10 mb-10 w-80 flex flex-col justify-center items-center'>
                <p className='font-bold text-xs '>Nothing to Caught Up for now</p>
                <p className='text-xs'>You don't have any notifications.</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NotificationCom
