import React, { useEffect, useState } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaPlus, FaRegComment, FaRegUser, FaSearch } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink, useParams } from 'react-router'
import { useLocation } from 'react-router'
import { LuFileStack } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'
import PollType from './Types/PollType'
import OpenEndedType from './Types/OpenEndedType'
import RankingType from './Types/RankingType'

const PresentationView = () => {

    const { presentationId, questionId } = useParams();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    

    const location = useLocation();

    const [showOptions, setShowOptions] = useState(false);

    const [designType, setDesignType] = useState("");
    const [designTemplate, setDesignTemplate] = useState("");

    const findDetails = async () => {
        const response = await fetch("http://localhost:9000/handleQuestions/searchQuestion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ presentationId, questionId })
        });

        const result = await response.json();
        if (!response.ok) return;

        setDesignType(result.question.designType);
        setDesignTemplate(result.question.designTemplate);
        setQuestion(result.question.question);
        setOptions(result.question.options)
        console.log(result);
    }

    useEffect(() => {
        findDetails();
    }, [])

    const renderQuestionSection = () => {
        switch (designType) {
            case "poll":
                return <PollType questionId={questionId} question={question} options={options} designTemplate={designTemplate} />;
            case "openEnded":
                return <OpenEndedType questionId={questionId} question={question} designTemplate={designTemplate} />;
            case "ranking":
                return <RankingType questionId={questionId} question={question} options={options} designTemplate={designTemplate} />;
        }
    }





    return (
        <main className='w-screen overflow-hidden bg-gray-200'>
            <div className='w-full h-full flex flex-col justify-center items-center'>

                <nav className='w-full flex justify-center bg-white items-center h-14'>
                    <div className='w-[97%] h-full flex justify-between'>

                        <div className='flex justify-center gap-2 items-center'>

                            <NavLink to="/App/Home" className=' pr-2' >
                                <IoMdArrowRoundBack />
                            </NavLink>

                            <div className='font-Outfit text-[13px]'>
                                <p>Vibrant Color Mixture</p>
                                <p className='text-[10px] text-stone-600 flex gap-1 justify-start items-center    '><FaRegUser /> <input type="text"  className='h-full w-[70%] pl-1' value={"My Presentation"}/></p>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full'>
                                <RiSettings4Line className='' />
                            </div>
                        </div>

                        <div className=' font-Outfit hidden md:flex justify-center items-center gap-5 text-sm'>
                            <div className='h-full border-b-2 flex justify-center cursor-pointer items-center'>
                                <h1 className='pt-1'>Create</h1>
                            </div>
                            <div className='h-full border-b-2 border-b-transparent flex justify-center cursor-pointer items-center'>
                                <h1 className='pt-1'>Result</h1>
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
                                    <FiUser />
                                </div>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='hidden md:flex'>
                                <button className='text-xs cursor-pointer flex bg-gray-300 text-black font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4 gap-1'>
                                    <BiBug className='mt-[2px]' />Report a Bug
                                </button>
                            </div>

                            <div>
                                <button className='text-xs cursor-pointer bg-indigo-400 text-white font-Outfit rounded-2xl pt-1 pb-1 pr-5 pl-5'>
                                    Go Live
                                </button>
                            </div>
                        </div>

                    </div>
                </nav>


                {/* <PollType/> */}

                {renderQuestionSection()}
            </div>
        </main>
    )
}

export default PresentationView
