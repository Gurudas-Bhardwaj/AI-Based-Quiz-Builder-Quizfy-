import React from 'react'
import Bell from "../../../assests/Images/HomePageImages/Bell.png"
import user from "../../../assests/Images/HomePageImages/user.png"

const Home = () => {
  return (
    <main className='w-4/5 mt-6'>
        <div >
            <div className='w-full flex justify-between items-center'>

              <div className='w-full ml-10 mr-5 '>
                <input type="text" className='h-9 w-[50%] pl-3 rounded-[7px] font-Outfit bg-stone-200 b text-[11px]' placeholder='Search Presentation, Folder and Pages' />
              </div>

              <div className='flex h-full items-center  gap-2 mr-8'>
                <div className='h-8 w-8 rounded-full flex justify-center items-center bg-stone-200'>
                  <img src={Bell} className='w-3' alt="" />
                </div>
                <div className='h-8 w-8 rounded-full flex justify-center items-center'  style={{"backgroundColor":"#bcbcf3"}}>
                  <img src={user} className='w-3' alt="" />
                </div>
              </div>

            </div>

            <div>
              <div>
                <h1>Welcome</h1>
              </div>
            </div>
        </div>
    </main>
  )
}

export default Home
