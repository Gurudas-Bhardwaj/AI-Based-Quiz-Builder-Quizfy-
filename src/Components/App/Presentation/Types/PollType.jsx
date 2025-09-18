import React, { useEffect, useRef, useState } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaComment, FaPlus, FaRegComment, FaRegUser } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink, useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { BsThreeDots } from 'react-icons/bs'
import { LuFileStack } from 'react-icons/lu'
import NewSlide from './Slide Functionality/NewSlide'
import { ChartBarDecreasing, ChartBarIncreasing, ChartColumn } from 'lucide-react'
import { MdEdit, MdOutlinePoll } from 'react-icons/md'
import { useAuth } from '../../../../Context/authContext'

const PollType = ({ questionId, presentation, allQuestion, currentQuestion }) => {

    const navigate = useNavigate();

    const { role } = useAuth();

    const [showSlide, setShowSlide] = useState(false);
    const [localQuestion, setLocalQuestion] = useState(currentQuestion.question);
    const [localOptions, setLocalOptions] = useState(currentQuestion.options);
    const [presentationName, setPresentationName] = useState(presentation.title);

    const [designTemplate, setDesignTemplate] = useState(currentQuestion.designTemplate);
    const [presentationId, setPresentationId] = useState(presentation._id);

    const [NewSlideAppreance, setNewSlideAppearence] = useState(false);


    const [selectedQuestion, setSelectedQuestion] = useState('');

    useEffect(() => {
        setLocalQuestion(currentQuestion.question)
        setLocalOptions(currentQuestion.options);
        setPresentationId(presentation._id);
        setSelectedQuestion(currentQuestion._id);
        setDesignTemplate(currentQuestion.designTemplate)
    }, [currentQuestion, selectedQuestion])



    const debounceTimer = useRef(null); // to store timeout id

    const handleColorChange = (index, newColor) => {
        // Update local UI instantly
        setLocalOptions(prev =>
            prev.map((opt, i) => i === index ? { ...opt, color: newColor } : opt)
        );

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer for API request
        debounceTimer.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `http://localhost:9000/handleQuestions/questions/${questionId}/options/${index}/color`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ color: newColor, role })
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setLocalOptions(data.options);
                    console.log("success");
                } else {
                    console.error(data.Message);
                }
            } catch (err) {
                console.error("Error updating color:", err);
            }
        }, 2000); // 2 seconds debounce
    };

    const debounceRef = useRef(null);
    const latestOptionsRef = useRef(localOptions); // Track latest state

    const handleOptionChange = (index, newText) => {
        // Update both state and ref
        const newOptions = localOptions.map((opt, i) =>
            i === index ? { ...opt, text: newText } : opt
        );

        setLocalOptions(newOptions);
        latestOptionsRef.current = newOptions;


        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`http://localhost:9000/handleQuestions/questions/${questionId}/options`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ options: latestOptionsRef.current, role }),
                });
                if (res.ok)
                    console.log("✅ Saved:", latestOptionsRef.current);

            } catch (error) {
                console.error("❌ Failed to save:", error);
            }
        }, 2000);
    };

    const debounceForQuestion = useRef(null);

    function updateQuestion(newQuestion) {
        setLocalQuestion(newQuestion);

        if (debounceForQuestion.current)
            clearTimeout(debounceForQuestion.current);

        debounceForQuestion.current = setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:9000/handleQuestions/questions/${questionId}/editQuestion`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ question: newQuestion, role }),
                });

                const data = await response.json();
                if (response.ok) {
                    setLocalQuestion(data.question);
                    console.log("Successfull!")
                } else {
                    console.log("Error")
                }
            }
            catch (e) {
                console.log("error : ", e)
            }
        }, 2000)

    }


    const debounceForPres = useRef(null);
    const updatePresentationName = (newName) => {
        setPresentationName(newName);

        if (debounceForPres.current)
            clearTimeout(debounceForPres.current);

        debounceForPres.current = setTimeout(async () => {
            try {
                const response = await fetch("http://localhost:9000/handleQuestions/presentation/editTitle", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ presentationId, presentationName: newName, role }),
                });
                const data = await response.json();
                console.log(data)
            }
            catch (e) {
                console.log("Error : ", e)
            }
        }, 2000)
    }


    const switchQuestions = async (questionID) => {
        setSelectedQuestion(questionID);
        navigate(`/App/AdminPanel/Presentation/${presentationId}/${questionID}`);
    }

    const setIcon = (designType) => {
        switch (designType) {
            case "poll":
                return <MdOutlinePoll className='text-blue-400' size={16} />
            case "ranking":
                return <ChartBarDecreasing color='indigo' size={14} />
            case "openEnded":
                return <FaComment className='text-orange-400' />
        }
    }

    return (
        <div className='relative'>
            <div className='bg-gray-200 relative h-[500px] w-screen  overflow-hidden overflow-y-hidden'>
                <div className='absolute top-5 left-4  bg-black pt-1 pb-1 pr-4 pl-4  rounded-3xl flex lg:hidden justify-center items-center gap-2' onClick={() => setShowSlide(!showSlide)}>
                    <LuFileStack className='text-white' />
                    <p className='text-white font-Outfit'>1/1</p>
                </div>
                <div className={`fixed top-0 left-0 h-full z-[999] pt-6 bg-white transition-all duration-500 ease-in-out transform ${showSlide ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} flex justify-center`}>
                    <div className='fixed z-[99999] left-44 border p-2 bg-black rounded-full ' onClick={() => setShowSlide(!showSlide)}>
                        <RxCross2 className='text-white text-sm' />
                    </div>
                    <div className='flex  flex-col gap-4 items-center w-full'>
                        <button onClick={() => setNewSlideAppearence(!NewSlideAppreance)} className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
                            <GoPlus />
                            <p>New Slide</p>
                        </button>
                        <div className='h-[500px] flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {allQuestion.map((key, index) => (
                                <div
                                    onClick={() => switchQuestions(key._id)}
                                    key={key._id}
                                    className='w-full h-16 flex justify-center gap-1 cursor-pointer'
                                >
                                    <p className='font-Outfit text-xs pt-2'>{index + 1}</p>
                                    <div
                                        className={`w-full h-16 border-2 flex justify-center flex-col items-center ${selectedQuestion === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
                                        {
                                            setIcon(key.designType)
                                        }
                                        <h1 className='text-[7px] text-center font-Outfit'>{key.question}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='flex w-full h-full justify-center '>
                    <section className='w-0 lg:w-[10%]  pt-6 hidden lg:flex justify-center'>
                        <div className='flex  flex-col gap-4 items-center w-full'>
                            <button onClick={() => setNewSlideAppearence(!NewSlideAppreance)} className='flex justify-center text-[15px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl cursor-pointer'>
                                <GoPlus />
                                New Slide
                            </button>
                            <div className='h-[500px] flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {allQuestion.map((key, index) => (
                                    <div
                                        onClick={() => switchQuestions(key._id)}
                                        key={key._id}
                                        className='w-full h-24 flex justify-center gap-1 cursor-pointer'
                                    >
                                        <p className='font-Outfit text-xs pt-2'>{index + 1}</p>
                                        <div className={`w-full h-20 border-2 flex justify-center flex-col items-center ${selectedQuestion === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
                                            {
                                                setIcon(key.designType)
                                            }
                                            <h1 className='text-[9px] text-center font-Outfit'>{key.question}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>

                    <section className='w-[100%] h-[500px] md:w-[90%] lg:w-[60%] flex justify-center '>
                        <div className='w-full h-full flex flex-col mt-6 items-center '>

                            <div className={`h-[100%] bg-cover bg-center ${designTemplate} w-[95%] text-white`}>
                                <div className={`w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7`}>
                                    <h1>Q) {localQuestion}</h1>
                                </div>
                                <div className='w-full flex justify-center  items-center h-[90%]'>
                                    <div className='w-[95%] md:w-[85%] grid grid-cols-4 place-items-center gap-4 h-[70%]'>

                                        {localOptions.map((key, index) => (
                                            <div key={index} className='w-full h-full font-Outfit flex flex-col justify-end items-center'>
                                                <div>
                                                    <p className='text-black'>{key.votes}</p>
                                                </div>
                                                <div className='bg-indigo-400 h-[2%] w-[80%]' style={{ backgroundColor: key.color }}></div>
                                                <div className=' w-[80%] mt-1 text-center text-white text-sm bg-black flex justify-center items-center'>
                                                    <p className=' inline'>{key.text}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='w-[10%] lg:w-[30%] h-full hidden   sm:flex justify-center '>
                        <div className='w-full h-auto flex justify-center gap-2'>
                            <div className='bg-white h-[600px] overflow-auto mt-6 border border-white rounded-2xl w-[75%] hidden lg:flex flex-col gap-6'>
                                <div className='h-auto flex justify-center w-full overflow-auto items-center'>
                                    <div className='flex pt-5 pl-2 pr-4 justify-between w-full items-center '>
                                        <h1 className='flex gap-1 justify-center items-center text-sm font-Outfit'><MdEdit />Editing Section : </h1>
                                        <div><RxCross2 className='cursor-pointer' /></div>
                                    </div>

                                </div>
                                <div className='pl-3 '>
                                    <div >
                                        <div>
                                            <h1 className='font-Outfit font-semibold'>Edit Presentation : </h1>
                                        </div>
                                        <div className='pt-4 pb-5 flex flex-col gap-1'>
                                            <div className=''>
                                                <p className='text-sm font-Outfit '>Presentation Name : </p>
                                            </div>
                                            <div>
                                                <input onChange={(e) => updatePresentationName(e.target.value)} type="text" id='Question' className='h-7 w-[89%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-1 text-xs rounded-lg ' value={presentationName} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-1 w-[95%] border-t mb-3 border-t-stone-300'></div>
                                    <div>
                                        <h1 className='font-Sora text-sm  font-semibold'>Edit Question : </h1>
                                    </div>
                                    <div className='pt-3 flex flex-col'>
                                        <label htmlFor="Question" className='font-Outfit text-sm  text-gray-900'>Question :</label>
                                        <input onChange={(e) => updateQuestion(e.target.value)} type="text" id='Question' className='h-7 w-[89%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-1 text-xs rounded-lg ' value={localQuestion} />
                                    </div>

                                    <div className='w-[95%] mt-3 h-1 border-b border-stone-300'></div>

                                    <div className='mt-4 pb-4'>
                                        <div className='pb-2'>
                                            <p className='text-xs font-Outfit font-semibold'>Edit Options</p>
                                        </div>
                                        <div className='flex gap-2  flex-col'>
                                            {localOptions.map((key, index) => (

                                                <div key={key._id} className='relative flex items-center gap-2'>
                                                    <input value={key.text} onChange={(e) => handleOptionChange(index, e.target.value)} type="text" className='h-7 w-[75%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg' />
                                                    <label className="absolute top-[5px] left-[3px] cursor-pointer inline-block h-5  w-5 rounded-full overflow-hidden" style={{ backgroundColor: key.color }}>
                                                        <input
                                                            value={key.color}
                                                            onChange={(e) => { handleColorChange(index, e.target.value) }}
                                                            type="color"
                                                            className=" w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                                    </label>
                                                    <div> <RxCross1 className='text-sm cursor-pointer' />  </div>
                                                </div>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[90%] lg:w-[22%] mt-6 hidden sm:flex flex-col gap-1 h-full'>
                                <div className='w-full bg-white flex flex-col border rounded-lg border-transparent  items-center cursor-pointer'>
                                    <div className='font-Outfit pt-4 pb-4 w-full border-2 rounded-lg border-indigo-300 ml-1 mr-1 flex justify-center items-center flex-col'>
                                        <div>
                                            <PiRankingDuotone />
                                        </div>
                                        <div className='hidden lg:block'>
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full bg-white flex flex-col  border rounded-lg border-transparent items-center'>
                                    <div className='flex  font-Outfit pt-4 pb-4 w-full border-2 rounded-lg border-indigo-300 text-sm cursor-pointer ml-1 mr-1  justify-center items-center flex-col'>
                                        <div>
                                            <FaRegComment />
                                        </div>
                                        <div className='hidden lg:block'>
                                            <p>Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className='flex sm:hidden justify-center items-center fixed left-0  top-[80%] w-full'>
                <div className='flex justify-center items-center gap-4'>
                    <div className='p-4 bg-white border-2 border-indigo-300 rounded-xl'>
                        <PiRankingDuotone className='text-xl' />
                    </div>
                    <div className='p-4 bg-white border-2 border-indigo-300 rounded-xl'>
                        <FaRegComment className='text-xl' />
                    </div>
                </div>

            </div>

            <div
                className={`absolute top-[70px] left-3 justify-center items-center transition-all duration-500 ease-out
                    ${NewSlideAppreance ? 'pointer-events-auto' : 'pointer-events-none'}
  `}
            >
                <NewSlide
                    isVisible={NewSlideAppreance}
                    onClose={() => setNewSlideAppearence(false)}
                    presentationId={presentationId}
                />
            </div>

        </div>
    )
}

export default PollType
