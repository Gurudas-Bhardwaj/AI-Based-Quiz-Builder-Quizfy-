import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { NavLink, useNavigate, useParams } from 'react-router'
import { BsThreeDots } from 'react-icons/bs'
import { Bug, Cog, Eye, Radio, User } from 'lucide-react';
import ChoiceBTW_ADM_USER from '../Going Live Functionality/ChoiceBTW_ADM_USER'
import Layout from './Layout'
import Preview from './others/Preview'
import { useAuth } from '../../../Context/authContext';
import ReportBug from '../../Messages/ReportBug';

import { FaExclamationTriangle } from "react-icons/fa";
import { FiAlertCircle } from 'react-icons/fi';
const PresentationView = () => {

    const { presentationId, questionId } = useParams();
    const { userId } = useAuth();


    const [allQuestion, setAllQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [presentation, setPresentation] = useState([]);

    const [preview, setPreview] = useState(false);
    const [reportBugPopUp, setReportBugPopUp] = useState(false);

    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState(false);

    const [designType, setDesignType] = useState("");
    const [designTemplate, setDesignTemplate] = useState("");

    const [goLiveOption, setGoLiveOption] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [loading, isLoading] = useState(true);

    const findDetails = async (presentationID, questionID) => {
        try {
            isLoading(true);
            const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/searchQuestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ presentationId: presentationID, userId }),
            });

            const result = await response.json();
            if (!response.ok) {
                setIsAuthorized(false);
                return;
            }

            // ✅ update states
            setPresentation(result.presentation);
            setAllQuestion(result.question);
            console.log(result.question);

            // ✅ pick question based on questionID (if provided)
            if (questionID) {
                const found = result.question.find((q) => q._id === questionID);
                setCurrentQuestion(found || null);
            } else {
                setCurrentQuestion(result.question[0] || null);
                navigate(`/App/AdminPanel/Presentation/${presentationID}/${result.question[0]._id}`)
            }

            isLoading(false);

        } catch (error) {
            console.error("Error in findDetails:", error);
        }
    };


    useEffect(() => {
        findDetails(presentationId, questionId);
    }, [presentationId, questionId]);


    if (loading) {
        return (
            <div className="w-screen h-screen absolute top-0 left-0  flex justify-center items-center">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className='h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin'>
                    </div>
                    <h1 className='font-Outfit text-gray-800'>Hang on! Loading Content</h1>
                </div>
            </div>
        );
    }

    return (
        <main className='w-screen relative h-screen overflow-hidden bg-gray-200'>
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
                                <Cog size={20} />
                            </div>
                        </div>

                        <div className=' font-Outfit hidden md:flex justify-center items-center gap-8 text-sm'>
                            <div className='h-full border-b-2 flex justify-center cursor-pointer items-center'>
                                <h1 className='pt-1 text-lg'>Create</h1>
                            </div>
                        </div>

                        <div className='flex relative justify-center items-center gap-2'>
                            <div className='flex md:hidden'>
                                <div className='p-1 border border-stone-200 rounded-full bg-gray-200'>
                                    <BsThreeDots className='cursor-pointer' onClick={() => setShowOptions(!showOptions)} />
                                </div>
                                <div className={`absolute transition-all ${showOptions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}  bg-white font-Outfit p-5  rounded-xl shadow-sm flex flex-col gap-3 top-12 z-[999999] -left-6 `}>
                                    <div className='flex justify-center cursor-pointer items-center'>
                                        <h1 className='pt-1'>Preview</h1>
                                    </div>
                                    <div className='border-b-transparent flex justify-center cursor-pointer items-center'>
                                        <h1 className='pt-1'>Report</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden md:flex'>
                                <div className='pt-1 pb-1 pl-4 pr-4 text-white text-sm font-Outfit cursor-pointer flex bg-indigo-400 justify-center items-center rounded-full' onClick={() => setPreview(true)}>
                                    <p className='flex justify-center items-center gap-1'><Eye size={13} /> Preview</p>
                                </div>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='hidden md:flex'>
                                <button onClick={() => setReportBugPopUp(true)} className='text-sm cursor-pointer flex justify-center items-center bg-gray-300 text-black font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4 gap-1'>
                                    <FiAlertCircle size={13} />Report a Bug
                                </button>
                            </div>

                            <div>
                                <button onClick={() => setGoLiveOption(!goLiveOption)} className='text-sm cursor-pointer bg-indigo-400 flex justify-center items-center gap-1 text-white font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4'>
                                    <Radio size={13} color='white' />
                                    Go Live
                                </button>
                            </div>
                        </div>

                    </div>
                </nav>


                {/* <PollType/> */}

                {/* {renderQuestionSection(currentQuestion.designType)} */}
                <Layout setAllQuestion={setAllQuestion} questionId={questionId} presentation={presentation} allQuestion={allQuestion} currentQuestion={currentQuestion} />

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

            <div className={`absolute transition-all ease-in-out duration-500 top-0 ${preview ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none "} bg-black/60 left-0 w-screen h-screen flex justify-center items-center `}>
                <Preview question={currentQuestion} onClose={() => setPreview(false)} />
            </div>

            <div className={`absolute top-0 left-0 w-screen h-screen ${isAuthorized ? "hidden" : "flex"}`}>
                <section className="w-full h-screen flex flex-col items-center justify-center bg-stone-950/90 font-Outfit px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 text-center max-w-md w-full">
                        <FaExclamationTriangle className="text-yellow-500 text-6xl" />
                        <h1 className="text-2xl font-semibold text-stone-800">
                            Unauthorized Access
                        </h1>
                        <p className="text-stone-500 text-sm">
                            You do not have permission to access this page or perform this action.
                            Please contact your administrator if you think this is an error.
                        </p>
                        <button
                            onClick={() => navigate("/App/Admin/Home")} // navigate to home or safe page
                            className="mt-4 px-6 py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
                        >
                            Go Back Home
                        </button>
                    </div>
                </section>

            </div>

            <div className={`absolute top-0 left-0 w-screen h-screen transition-all ease-in-out duration-300 ${reportBugPopUp ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <ReportBug onClose={() => setReportBugPopUp(false)} />
            </div>
        </main>
    )
}

export default PresentationView
