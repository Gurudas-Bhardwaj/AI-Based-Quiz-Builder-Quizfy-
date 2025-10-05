import React, { useState } from 'react'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import { HiPresentationChartBar } from 'react-icons/hi'
import { MdAdminPanelSettings, MdOutlineDoNotDisturb } from 'react-icons/md'
import Popup from "../Popup/Popup.jsx"

const FloatingSwitch = ({ editingSection, setEditingSection }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [editPresentation, setEditPresentation] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);
  const [nothing, setNothing] = useState(false);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex justify-center items-center gap-4'>
        {/* Edit Icon */}
        <div
          className={`relative p-3 cursor-pointer border-white ${editingSection=="editQuestions" ? "bg-indigo-400 text-white" : "bg-white text-black"} rounded-full`}
          onMouseEnter={() => setEditVisible(true)}
          onMouseLeave={() => setEditVisible(false)}
          onClick={()=>setEditingSection("editQuestions")} 
        >
          <div className='absolute top-4 left-[30%]'>
            <Popup isVisible={editVisible} value="Edit the Information of Current Slide" />
          </div>
          <BiSolidMessageSquareEdit className='text-5xl' />
        </div>

        {/* Presentation Icon */}
        <div
          className={`relative p-3 cursor-pointer border-white ${editingSection=="slideEditing" ? "bg-indigo-400 text-white" : "bg-white text-black"} rounded-full`}
          onMouseEnter={() => setEditPresentation(true)}
          onMouseLeave={() => setEditPresentation(false)}
          onClick={()=>setEditingSection("slideEditing")} 
        >
          <div className='absolute top-4 left-[30%]'>

            <Popup isVisible={editPresentation} value="Edit the Layout of Current Slide" />
          </div>

          <HiPresentationChartBar className='text-5xl' />
        </div>

        {/* Admin Icon */}
        <div
          className={`relative p-3 cursor-pointer border-white ${editingSection=="addAdmin" ? "bg-indigo-400 text-white" : "bg-white text-black"} rounded-full`}
          onClick={()=>setEditingSection("addAdmin")} 
          onMouseEnter={() => setAddAdmin(true)}
          onMouseLeave={() => setAddAdmin(false)}
        >
          <div className='absolute top-4 left-[30%]'>
            <Popup isVisible={addAdmin} value="Create Custom Admin for this Presentation" />
          </div>
          <MdAdminPanelSettings className='text-5xl' />
        </div>

        {/* nothing icon */}
        <div
          className={`relative p-3 cursor-pointer border-white ${editingSection=="none" ? "bg-indigo-400 text-white" : "bg-white text-black"} rounded-full`}
          onClick={()=>setEditingSection("none")} 
          onMouseEnter={() => setNothing(true)}
          onMouseLeave={() => setNothing(false)}
        >
          <div className='absolute top-4 left-[30%]'>
            <Popup isVisible={nothing} value="Hide Slide Section" />
          </div>
          <MdOutlineDoNotDisturb className='text-5xl' />
        </div>
      </div>
    </div>
  )
}

export default FloatingSwitch
