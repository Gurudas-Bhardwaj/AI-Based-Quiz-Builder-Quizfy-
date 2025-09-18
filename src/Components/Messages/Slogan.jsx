import React from 'react'
import error from "../../assests/Images/Logo/warning.png"
import success from "../../assests/Images/Logo/excellence.png"


const Slogan = ({status, details}) => {
  return (
    <div className='absolute'>       
      <div className='p-5 bg-black rounded-xl flex justify-center gap-5 items-center'>
        <div>
          <img src={status?success:error} alt=""  className='w-7'/>
        </div>
        <div>
          <p className='font-Outfit text-sm text-white'>{details}</p>
        </div>
      </div>    
    </div>
  )
}

export default Slogan
