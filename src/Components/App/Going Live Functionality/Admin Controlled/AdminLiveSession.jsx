import { Ban, ChartColumn, Cog, ExternalLink, Lightbulb, MessageCircle, MessageCircleMore, PencilLine, Timer, User, Users } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { NavLink, useParams } from 'react-router'
import { useAuth } from '../../../../Context/authContext'
import { BiReset } from 'react-icons/bi'
import { FaCaretUp } from 'react-icons/fa'
import PopUp from './PopUp'
import CommentSection from './CommentSection'
import ParticipantResponse from './ParticipantResponse'

const AdminLiveSession = () => {

  const{presentationId} = useParams();

  const[allQuestion, setAllQuestion] = useState([])
  

  const { userName } = useAuth();
  const [comment, setComment] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [goLeft, setGoLeft] = useState(false);
  const [goRight, setGoRight] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [stopWatch, setStopWatch] = useState(false);
  const [resetResult, setResetResult] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const [timerInfo, setTimerInfo] = useState(false);

  const [startTimer, setStartTimer] = useState(false);

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showParticipant, setShowParticipant] = useState(false);


  const findQuestion = async()=>{
    try{
      const response = await fetch("http://localhost:9000/handleQuestions/searchQuestion",{
        method : "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body : JSON.stringify({presentationId})
      });

      const data = await response.json();

      if(!response.ok){
        console.log("Error :" , data);
        return;
      }

      console.log(data);
      setAllQuestion(data.question);

    }
    catch(e){
      console.log("Error : ", e);
    }
  }

  useEffect(()=>{
    findQuestion();
  },[])
  

  return (
    <div className='relative overflow-hidden w-screen h-screen bg-stone-200 flex flex-col items-center   '>

      <div className='w-screen h-12 bg-white '>
        <div className='flex h-full justify-between pr-7 pl-7 items-center'>
          <div className='font-Outfit flex gap-3 h-full justify-center items-center'>

            <NavLink to="/App/Admin/Home" className='' >
              <IoMdArrowRoundBack />
            </NavLink>

            <div className='font-Outfit relative text-[13px]'>
              <p>Testing Presentation</p>
              <p className='text-[10px] text-stone-600 flex  justify-start items-center'><User size={13} />{userName}
              </p>

            </div>
            <div className='h-5 w-1 border-r border-r-stone-200'></div>

            <div className='h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full'>
              <Cog size={19} />
            </div>
          </div>

          <div className=' font-Outfit hidden  h-full md:flex justify-center items-center gap-5 text-sm'>
            <div className='h-full flex border-b-2 justify-center cursor-pointer items-center'>

              <h1 className='pt-1'>Detailed Result</h1>
            </div>
          </div>

          <div className='flex items-center gap-3 font-Outfit text-sm'>
            <div>
              <button className=' pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-gray-300 items-center justify-center text-black rounded-4xl text-xs '>
                <PencilLine size={13} />
                <p className=''>Edit Slide</p>
              </button>
            </div>

            <div className='h-6 w-1 border-l border-l-stone-400'></div>

            <div>
              <button className=' pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs '>
                <ExternalLink size={13} />
                <p className=''>Share Link</p>
              </button>
            </div>
            <div>
              <button className=' pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs '>
                <Ban size={13} />
                <p className=''>Go Offline</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-20 left-20'>
        <div className='bg-white cursor-pointer flex justify-center items-center flex-col p-4 text-sm border border-white rounded-full font-Outfit '
        onMouseEnter={() => setTimerInfo(true)}
            onMouseLeave={() => setTimerInfo(false)}>
              <div className='flex absolute top-2 left-[18px]'>
                <PopUp isVisible={timerInfo} value={"Respond the Question under Given Time!"} />
              </div>
            <div>
              <h1>60</h1>
            </div>

        </div>
      </div>

      <div className='w-screen h-[500px] flex justify-center items-center '>
        <div className='w-[90%] h-[95%] bg-BG-11 bg-contain bg-center bg-no-repeat'>
        </div>
      </div>

      <div className='fixed h-10 w-screen top-[86%] flex justify-center items-center'>
        <div className='h-[100%]  pl-7 pr-7 flex justify-center items-center gap-5 rounded-3xl drop-shadow-2xl bg-white'>

          <div
            onMouseEnter={() => setCurrentParticipant(true)}
            onMouseLeave={() => setCurrentParticipant(false)}
            className='cursor-pointer relative'
          >
            <PopUp isVisible={currentParticipant} value={"Participant responded"} />
            <Users onClick={()=>{setShowCommentSection(false); setShowParticipant(!showParticipant)}}  className='' size={17} />
          </div>
          <div
            onMouseEnter={() => setComment(true)}
            onMouseLeave={() => setComment(false)}
            className='cursor-pointer relative'
          >
            <PopUp isVisible={comment} value={"Enable Comment"} />
            <MessageCircle className='' size={17} />
          </div>


          <div onMouseEnter={() => setAnalytics(true)}
            onMouseLeave={() => setAnalytics(false)}
            className='cursor-pointer relative'
          >
            <PopUp isVisible={analytics} value={"View Full Analytics"} />
            <ChartColumn size={17} />
          </div>
          <div className='flex h-full justify-center items-center gap-2'>
            <div onMouseEnter={() => setGoLeft(true)}
              onMouseLeave={() => setGoLeft(false)}
              className='cursor-pointer relative'>
              <PopUp isVisible={goLeft} value={"Go To Previous Question"} />
              <IoMdArrowRoundBack className='text-lg' />
            </div>
            <div
              onMouseEnter={() => setShareLink(true)}
              onMouseLeave={() => setShareLink(false)}
              className='p-2 relative bg-amber-100 border flex justify-center items-center  cursor-pointer border-amber-400 rounded-full'>
                <div className='absolute top-1 flex left-2'>
              <PopUp isVisible={shareLink} value={"Share the Link to all"} />
              </div>
              <Lightbulb className='text-amber-500 ' size={15} />
            </div>
            <div className='cursor-pointer relative '
              onMouseEnter={() => setGoRight(true)}
              onMouseLeave={() => setGoRight(false)}>
              <PopUp isVisible={goRight} value={"Go to next Question"} />
              <IoMdArrowRoundForward className='text-lg  cursor-pointer' />
            </div>
          </div>
          {/* Timer Icon with Hover Tooltip */}
          <div
            className='cursor-pointer  relative'
            onMouseEnter={() => setStopWatch(true)}
            onMouseLeave={() => setStopWatch(false)}
          >
            <PopUp isVisible={stopWatch} value={"Start Timer"} />
            <Timer  size={17} className=''/>
          </div>

          {/* Reset Icon with Hover Tooltip */}
          <div
            className='cursor-pointer relative'
            onMouseEnter={() => setResetResult(true)}
            onMouseLeave={() => setResetResult(false)}
          >
            <PopUp isVisible={resetResult}  value={"Reset Result"} />
            <BiReset size={17} />
          </div>

          <div
            className='cursor-pointer relative'
            onMouseEnter={() => setOpenComment(true)}
            onMouseLeave={() => setOpenComment(false)}
            onClick={()=>{setShowCommentSection(!showCommentSection); setShowParticipant(false)}}
          >
            <PopUp  isVisible={openComment}  value={"Open Comment Section"} />
            <MessageCircleMore size={17} />
          </div>

        </div>
      </div>

      {/* comment section :  */}
      <div className={`absolute top-[22%] left-[73%] transition-all ease-in-out duration-500 ${showCommentSection ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>
        <CommentSection
          onClose={()=>setShowCommentSection(!showCommentSection)}
          isVisible={showCommentSection}
        />
      </div>
      <div className={`absolute top-[16%] left-[73%] transition-all ease-in-out duration-500 ${showParticipant ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>
        <ParticipantResponse
          onClose={()=>setShowParticipant(!showParticipant)}
          isVisible={showParticipant}
        />
      </div>
    </div>
  )
}

export default AdminLiveSession
