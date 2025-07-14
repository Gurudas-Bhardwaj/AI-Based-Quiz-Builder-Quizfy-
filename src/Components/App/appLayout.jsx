import React from 'react'
import SideBar from './Home/SideBar'
import { Outlet } from 'react-router'

const appLayout = () => {
  return (
    <div className='overflow-hidden w-screen flex justify-center r'>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default appLayout
