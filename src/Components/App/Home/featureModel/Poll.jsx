import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { GoPlus } from 'react-icons/go'
import { ImCross } from 'react-icons/im'
import poll from "../../../../assests/Images/Background_Images/PollOne.png"
import poll2 from "../../../../assests/Images/Background_Images/PollTwo.png"
import poll3 from "../../../../assests/Images/Background_Images/Poll3.png"
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../../../Context/authContext'


const Poll = ({onClose}) => {

  const {userId} = useAuth();
  const navigate = useNavigate();

  const options = [
        { text: "Option A", color: "#FF0000" },
        { text: "Option B", color: "#00FF00" },
        { text: "Option C", color: "#0000FF" },
        { text: "Option D", color: "#FFA500" }
      ];


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
          options,
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
                <ImCross className=' text-sm font-extralight'/>
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
                <h1 className='font-semibold text-lg'>Polls</h1>
                <h1 className='w-[70%] pt-1 text-sm'>Get votes on options you offer to gather input from participants, make decisions together, or break the ice.</h1>
              </div>
            </div>

            <div className='w-full overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8 pr-8'>
                <div className='flex flex-col gap-1'>
                    <div className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                        <GoPlus className='text-4xl'/>
                    </div>
                    <h1 className='font-Outfit pl-1'>Blank Poll</h1>
                </div>
                <div className='flex flex-col gap-1'>
                  <div onClick={()=>handleTemplateClick("poll","bg-poll1")}   className="h-40  w-full flex  justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 bg-center  bg-no-repeat  hover:text-black cursor-pointer rounded-sm" style={{backgroundImage: `url(${poll})`,backgroundSize: 'cover', // or 'cover'
    backgroundPosition: 'center',}}>
                        
                    </div>
                    <h1 className='font-Outfit pl-1'>Design with vibrant vibe</h1>
                </div>
                <div className='flex flex-col gap-1'>
                    <div  onClick={() => handleTemplateClick("poll", "bg-poll2")} style={{backgroundImage: `url(${poll2})`,backgroundSize: 'cover', // or 'cover'
    backgroundPosition: 'center',}} className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                        
                    </div>
                    <h1 className='font-Outfit pl-1'>Design with a aesthetic look</h1>
                </div>
                <div className='flex flex-col gap-1'>
                    <div onClick={() => handleTemplateClick("poll", "bg-poll3")} style={{backgroundImage: `url(${poll3})`,backgroundSize: 'cover', // or 'cover'
    backgroundPosition: 'center',}} className='h-40  w-full flex justify-center items-center border-2 border-stone-400 hover:border-black text-stone-400 hover:text-black cursor-pointer rounded-sm'>
                        
                    </div>
                    <h1 className='font-Outfit pl-1'>Design with a aesthetic look</h1>
                </div>
            </div>

          </div>
        </div>
    </section>
  )
}

export default Poll
