import React, { useEffect, useState } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaPlus, FaRegComment, FaRegUser, FaSearch } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink, useNavigate, useParams } from 'react-router'
import { useLocation } from 'react-router'
import { LuFileStack } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'
import PollType from './Types/PollType'
import OpenEndedType from './Types/OpenEndedType'
import RankingType from './Types/RankingType'
import { Bug, Cog, NavigationOff, Radio, Rocket, User, UserCog } from 'lucide-react';
import ChoiceBTW_ADM_USER from '../Going Live Functionality/ChoiceBTW_ADM_USER'

const PresentationView = () => {

    const { presentationId, questionId } = useParams();
    console.log(presentationId)

    const [allQuestion, setAllQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [presentation, setPresentation] = useState([]);

    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState(false);

    const [designType, setDesignType] = useState("");
    const [designTemplate, setDesignTemplate] = useState("");

    const[goLiveOption, setGoLiveOption] = useState(false);

const findDetails = async (presentationID, questionID) => {
  try {
    const response = await fetch("http://localhost:9000/handleQuestions/searchQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ presentationId: presentationID }),
    });

    const result = await response.json();
    if (!response.ok) return;

    // ✅ update states
    setPresentation(result.presentation);
    setAllQuestion(result.question);

    // ✅ pick question based on questionID (if provided)
    if (questionID) {
      const found = result.question.find((q) => q._id === questionID);
      setCurrentQuestion(found || null);
    } else {
      setCurrentQuestion(result.question[0] || null); // fallback to first question
      console.log("HELLO",result.question[0])
      navigate(`/App/AdminPanel/Presentation/${presentationID}/${result.question[0]._id}`)
    }

  } catch (error) {
    console.error("Error in findDetails:", error);
  }
};


    useEffect(() => {
        findDetails(presentationId, questionId);
    }, [presentationId, questionId]);

    useEffect(() => {
        console.log("question updated:", allQuestion);
        console.log("Presentation updated:", currentQuestion);
    }, [presentation, allQuestion]);

    const renderQuestionSection = (designType) => {
        switch (designType) {
            case "poll":
                return <PollType  questionId={questionId} presentation={presentation} allQuestion={allQuestion} currentQuestion={currentQuestion}/>;
            case "openEnded":
                return <OpenEndedType questionId={questionId} presentation={presentation} allQuestion={allQuestion} currentQuestion={currentQuestion} />;
            case "ranking":
                return <RankingType questionId={questionId} presentation={presentation} allQuestion={allQuestion} currentQuestion={currentQuestion} />;
        }
    }





    return (
        <main className='w-screen h-screen overflow-hidden bg-gray-200'>
            <div className='w-full h-full flex flex-col  items-center'>

                <nav className='w-full flex justify-center bg-white items-center h-16'>
                    <div className='w-[97%] h-full flex justify-between'>

                        <div className='flex justify-center gap-2 items-center'>

                            <NavLink to="/App/Admin/Home" className=' pr-2' >
                                <IoMdArrowRoundBack />
                            </NavLink>

                            <div className='font-Outfit relative text-[14px]'>
                                <p>Vibrant Color Mixture</p>
                                <p className='text-[10px] text-stone-600 flex  justify-start items-center    '><User size={16} />{presentation.title}
                                 </p>
                                 
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full'>
                                <Cog size={20}/>
                            </div>
                        </div>

                        <div className=' font-Outfit hidden md:flex justify-center items-center gap-8 text-sm'>
                            <div className='h-full border-b-2 flex justify-center cursor-pointer items-center'>
                                <h1 className='pt-1 text-lg'>Create</h1>
                            </div>
                            <div className='h-full border-b-2 border-b-transparent flex justify-center cursor-pointer items-center'>
                                <h1 className='pt-1 text-lg'>Result</h1>
                            </div>
                        </div>

                        <div className='flex relative justify-center items-center gap-2'>
                            <div className='flex md:hidden'>
                                <div className='p-1 border border-stone-200 rounded-full bg-gray-200'>
                                    <BsThreeDots className='cursor-pointer' onClick={() => setShowOptions(!showOptions)} />
                                </div>
                                <div className={`absolute transition-all ${showOptions ? "flex" : "hidden"}  bg-white font-Outfit p-5  rounded-xl shadow-sm flex flex-col gap-3 top-12 z-[999999] -left-6 `}>
                                    <div className='flex justify-center cursor-pointer items-center'>
                                        <h1 className='pt-1'>Create</h1>
                                    </div>
                                    <div className='border-b-transparent flex justify-center cursor-pointer items-center'>
                                        <h1 className='pt-1'>Result</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden md:flex'>
                                <div className='h-7 w-7 cursor-pointer flex bg-indigo-300 justify-center items-center rounded-full'>
                                    <FiUser className='text-lg' />
                                </div>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='hidden md:flex'>
                                <button className='text-sm cursor-pointer flex justify-center items-center bg-gray-300 text-black font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4 gap-1'>
                                    <Bug size={13} />Report a Bug
                                </button>
                            </div>

                            <div>
                                <button onClick={()=>setGoLiveOption(!goLiveOption)} className='text-sm cursor-pointer bg-indigo-400 flex justify-center items-center gap-1 text-white font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4'>
                                    <Radio size={13} color='white'/>
                                    Go Live
                                </button>
                            </div>
                        </div>

                    </div>
                </nav>


                {/* <PollType/> */}
                
                {renderQuestionSection(currentQuestion.designType)}

                 <div
                className={`absolute top-[70px] left-3 justify-center items-center transition-all duration-500 ease-out
                    ${goLiveOption ? 'pointer-events-auto' : 'pointer-events-none'}
  `}
            >
                <ChoiceBTW_ADM_USER
                    isVisible={goLiveOption}
                    onClose={() => setGoLiveOption(false)}
                    presentationId={presentationId}
                />
            </div>

            </div>
        </main>
    )
}

export default PresentationView
