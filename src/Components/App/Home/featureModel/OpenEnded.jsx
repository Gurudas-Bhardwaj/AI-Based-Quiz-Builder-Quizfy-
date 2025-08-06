import React, { use } from 'react'
import { GoPlus } from 'react-icons/go'
import { ImCross } from 'react-icons/im'
import OpenEnded1 from "../../../../assests/Images/Background_Images/OpenEnded1.png"
import OpenEnded2 from "../../../../assests/Images/Background_Images/OpenEnded2.png"
import OpenEnded3 from "../../../../assests/Images/Background_Images/OpenEnded3.png"
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../../../Context/authContext'


const OpenEnded = ({ onClose }) => {

  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleTemplateClick = async (designType, designTemplate) => {
    try {
      // 1. Create Presentation
      const presRes = await fetch("http://localhost:9000/handleQuestions/createPresentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, title: "Untitled Presentation" })
      });

      const { presentationId } = await presRes.json();

      
      // 2. Create Sample First Question
      const quesRes = await fetch("http://localhost:9000/handleQuestions/addQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presentationId,
          designType,
          designTemplate,
          question: "Who is best hokage among of all them?",
          option1: "Naruto Uzumaki",
          option2: "Minato Namikaze",
          option3: "Hashirama Senju",
          option4: "Tobirama Senju",
        })
      });

      const { question } = await quesRes.json();

      // 3. Redirect to question editor view
      navigate(`/App/Presentation/${presentationId}/${question._id}`);
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };


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
              <h1 className='font-semibold text-lg'>Open ended questions</h1>
              <h1 className='w-[70%] pt-1 text-sm'>Participants respond to a question using free text. A great way to voice honest thoughts and opinions!</h1>
            </div>
          </div>

          <div className='w-full overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8 pr-8'>
            <div className='flex flex-col gap-1'>
              <div className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                <GoPlus className='text-4xl' />
              </div>
              <h1 className='font-Outfit pl-1'>Blank OpenEnded Questions</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <div onClick={() => handleTemplateClick("openEnded", "bg-openEnded3")} style={{
                backgroundImage: `url(${OpenEnded3})`, backgroundSize: 'cover', // or 'cover'
                backgroundPosition: 'center',
              }} className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-indigo-400 transition-all cursor-pointer rounded-sm'>

              </div>
              <h1 className='font-Outfit pl-1'>Unique look </h1>
            </div>
            <div className='flex flex-col gap-1'>
              <div onClick={() => handleTemplateClick("openEnded", "bg-openEnded2")} style={{
                backgroundImage: `url(${OpenEnded2})`, backgroundSize: 'cover', // or 'cover'
                backgroundPosition: 'center',
              }} className='h-40 w-full flex justify-center items-center border-2 border-stone-400 hover:border-indigo-400 transition-all cursor-pointer rounded-sm'>

              </div>
              <h1 className='font-Outfit pl-1'>Cultural vibe </h1>
            </div>
            <div className='flex flex-col gap-1'>
              <div onClick={()=>handleTemplateClick("openEnded", "bg-openEnded1")} style={{
                backgroundImage: `url(${OpenEnded1})`, backgroundSize: 'cover', // or 'cover'
                backgroundPosition: 'center',
              }} className='h-40 w-full flex justify-center items-center border-2 border-stone-400 hover:border-indigo-400 transition-all cursor-pointer rounded-sm'>

              </div>
              <h1 className='font-Outfit pl-1'>Simple Design</h1>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default OpenEnded
