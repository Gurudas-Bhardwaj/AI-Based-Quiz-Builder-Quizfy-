import { ChevronDown } from 'lucide-react'
import React from 'react'

const ImagePreviewer = ({image, onClose}) => {
  return (
    <div className='h-[400px] w-[400px] rounded-2xl bg-white drop-shadow-2xl flex flex-col  '>
        <div className='w-full flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100'>
        <h1 className='font-Montserrat font-bold text-base text-gray-800'>Preview Question Image</h1>
        <ChevronDown onClick={onClose} className='cursor-pointer text-gray-400 hover:text-indigo-400 transition' />
      </div>
    {image == null || image==undefined ?
    <div className='w-full flex-1 flex justify-center items-center '>
        <p className='font-Outfit text-sm text-gray-600'>This is not a Image Question, So nothing to show.</p>
    </div>:
      <div className='w-full flex-1 flex justify-center items-center'>
        <img src={image} alt="" className='w-full ' />
      </div>
}
    </div>
  )
}

export default ImagePreviewer
