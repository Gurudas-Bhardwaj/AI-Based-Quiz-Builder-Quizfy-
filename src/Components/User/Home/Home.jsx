import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

const Home = () => {
  return (
    <div>
      <div className='hidden md:block w-1/5'>
        <Sidebar/>
      </div>

      <div className='overflow-x-hidden w-[90%] md:w-4/5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home
