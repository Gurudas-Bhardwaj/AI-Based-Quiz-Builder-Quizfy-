import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { templateOptions } from '../../Templates/Templates'

const SlideEditing = ({ designTemplate, changeDesignTemplate, deletePopUp, presentationName, updatePresentationName }) => {
  const [localPresentationName, setLocalPresentationName] = useState(presentationName || "");

  useEffect(() => {
    setLocalPresentationName(presentationName || "");
  }, [presentationName])

  return (
    <section className='w-[90%] md:w-[10%] lg:w-[24%] h-full absolute md:static flex justify-center '>
      <div className='w-full h-auto flex justify-center gap-2'>
        <div className='bg-white  pb-10 overflow-auto mt-6 border border-white rounded-2xl w-full flex flex-col gap-6'>
          <div className='h-auto flex justify-center w-full items-center'>
            <div className='flex pt-5 pl-2 pr-4 justify-between w-full items-center '>
              <h1 className='flex gap-2 pl-2 justify-center text-xl font-semibold items-center text-indigo-400 font-Outfit'><MdEdit />Edit Slide  </h1>
            </div>
          </div>
          <div className='w-full flex flex-col pl-6 '>

            <div className='w-full flex flex-col'>
              <h1 className='w-full font-Outfit text-gray-500 font-semibold flex gap-2 justify-start items-center'>
                Edit Presentation Name :
              </h1>
            </div>

            <div>
              <input
              value={localPresentationName}
              type="text"
              onChange={(e)=>updatePresentationName(e.target.value)}
              className="h-8 w-[95%] mt-1 mb-3 border border-stone-300 bg-stone-200 focus:bg-white focus:border-indigo-400 font-Outfit pl-2 text-sm rounded-lg"
            />
            </div>

          </div>

          <div className='w-full flex flex-col pl-6'>
            <p className=' font-Outfit text-gray-500 font-semibold'>Change Template : </p>
            <div className='w-[90%]  h-1 border-b-2 mb-2 border-stone-300'></div>
            <div className='w-full  pr-2'>
              <div className='grid grid-cols-2 gap-3 place-content-center'>
                {
                  templateOptions.map((key) => (
                    <div key={key.id} onClick={() => changeDesignTemplate(key.className)} className={`w-full h-20 bg-cover border-2 rounded-xl bg-center cursor-pointer ${designTemplate == key.className ? "border-indigo-400" : "border-white"} ${key.className}`}>

                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center items-center pt-3'>
            <button onClick={deletePopUp} className='font-Outfit p-3 bg-red-500 rounded-2xl cursor-pointer text-white'>Delete this Slide!</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlideEditing
