import React from 'react'
import { GoPlus } from 'react-icons/go'
import { ImCross } from 'react-icons/im'
import ranking1 from '../../../../assests/Images/Background_Images/Ranking1.png'
import ranking2 from '../../../../assests/Images/Background_Images/Ranking2.png'
import ranking3 from '../../../../assests/Images/Background_Images/Ranking3.png'
import { NavLink } from 'react-router'
import background1 from "../../../../assests/Images/Background_Images/SimpleBackground8.jpg"
import background2 from "../../../../assests/Images/Background_Images/SimpleBackground7.jpg"
import background3 from "../../../../assests/Images/Background_Images/SimpleBackground6.jpg"

const Ranking = ({onClose}) => {
  return (
    <section className='w-full h-full flex justify-center items-center'>
      <div className=' bg-white w-[90%] sm:w-[80%] md:w-[78%]  h-[500px] border-2 border-white rounded-2xl '>
        <div className='w-full h-full flex flex-col'>
          <div className='pt-4 w-full flex justify-end pr-5 '>
            <div onClick={onClose} className='h-5 w-5 flex justify-center items-center cursor-pointer'>
              <ImCross className=' text-sm font-extralight' />
            </div>
          </div>
          <div className='pt-3 pl-8 pb-4'>
            <h1 className='text-xl font-space font-semibold'>
              Start from scratch or a Template
            </h1>
          </div>

          <div className='w-[94%] self-center h-1 border-b-2 mb-5 border-b-stone-400'></div>

          <div className='pb-6'>
            <div className=' pl-8 font-Outfit'>
              <h1 className='font-semibold text-lg'>Ranking Question</h1>
              <h1 className='w-[70%] pt-1 text-sm'>Let participants prioritize among different options by moving them up or down on their screens.</h1>
            </div>
          </div>

          <div className='w-full overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8 pr-8'>
            <div className='flex flex-col gap-1'>
              <div className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                <GoPlus className='text-4xl' />
              </div>
              <h1 className='font-Outfit pl-1'>Blank ranking Questions</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <NavLink to='/App/Presentation/Ranking' state={{backgroundImage : background1}} style={{backgroundImage: `url(${ranking3})`,backgroundSize: 'cover',
                backgroundPosition: 'center',}} className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                
              </NavLink>
              <h1 className='font-Outfit pl-1'>Realistic and aesthetic vibe</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <NavLink to='/App/Presentation/Ranking' state={{backgroundImage : background2}} style={{backgroundImage: `url(${ranking2})`,backgroundSize: 'cover',
                backgroundPosition: 'center',}} className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                
              </NavLink>
              <h1 className='font-Outfit pl-1'>Blend of blue and white</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <NavLink to='/App/Presentation/Ranking' state={{backgroundImage : background3}} style={{backgroundImage: `url(${ranking1})`,backgroundSize: 'cover',
                backgroundPosition: 'center',}}  className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                
              </NavLink>
              <h1 className='font-Outfit pl-1'>Mixture of vibrant Colors</h1>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Ranking
