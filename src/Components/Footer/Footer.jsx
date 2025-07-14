import React from 'react'
import logo from "../../assests/Images/Logo/LOGO.png"
import linkedin from "../../assests/Images/Logo/linkedin.png"
import instagram from "../../assests/Images/Logo/instagram.png"
import github from "../../assests/Images/Logo/github.png"
import whatsapp from "../../assests/Images/Logo/whatsapp.png"

const Footer = () => {
  return (
    <footer className='w-screen  pb-10' style={{"backgroundColor":"#FFBF23"}}>
      <div className='w-full'>
        <div className='md:ml-28'>
            <img src={logo}  className="w-36  " alt="" />
        </div>
      </div>
      
      <div className='w-full flex justify-center font-Outfit  items-center'>
        <div className='w-[90%] grid grid-rows-4 md:grid-rows-1 md:grid-cols-4 '>
          <div>
            <div className='pb-5'>
              <span className=''>Contact</span>
            </div>
            <div className='grid text-sm grid-cols-2 grid-rows-2 gap-8'>
              <div>
                xyz house number,
                xyz street road
              </div>
              <div>
                <h1>sales : </h1>
                <p>gurudaswork9811@gmail.com</p>
              </div>
              <div>
                <h1>General Inquires</h1>
                <p>9811048031</p>
              </div>
              <div>
                <h1>Support :</h1>
                <h1>gursad5@gmail.com</h1>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center flex-col'>
           {/* i will do */}
          </div>

          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='w-full '>
              <h1>Follow us on:</h1>
            </div>
            <div className='flex w-full  gap-4'>
              <div className='cursor-pointer'>
                <img src={linkedin} alt="" className='w-8' />
              </div>
              <div className='cursor-pointer'>
                <img src={instagram} alt="" className='w-8' />
              </div>
              <div className='cursor-pointer'>
                <img src={github} alt="" className='w-8' />
              </div>
            </div>
          </div>

          <div className='flex w-full gap-2 flex-col'>
            <div >
              <p className='font-semibold'>Follow</p>
            </div>
            <div className='text-xs'>
              <p>sign up to get the latest news and update of our updates</p>
            </div>
            <div className='w-full'>
              <form action="">
                <input type="text" className='h-8 w-48 rounded-xl text-xs pl-3 mt-5 border border-gray-800' placeholder='Enter your Email'/>

                <button className='pl-4 pr-4 pt-1 pb-1 bg-indigo-400 hover:bg-indigo-500 transition  mt-4 text-white cursor-pointer rounded-2xl'>Subscribe</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
