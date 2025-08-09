import React, { useRef, useState } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaPlus, FaRegComment, FaRegUser, FaSearch } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'
import { LuFileStack } from 'react-icons/lu'
import { BsThreeDots } from 'react-icons/bs'


const RankingType = ({ questionId, question, options, designTemplate }) => {


    const location = useLocation();

    const [showSlide, setShowSlide] = useState(false);

    const [localQuestion, setLocalQuestion] = useState(question);
    const [localOptions, setLocalOptions] = useState(options);


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
                        body: JSON.stringify({ color: newColor })
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setLocalOptions(data.options);
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
                    body: JSON.stringify({ options: latestOptionsRef.current }),
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
                    body: JSON.stringify({ question: newQuestion }),
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
        }, 2000);

    }




    return (
        <div>
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
                        <button className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
                            <GoPlus />
                            <p>New Slide</p>
                        </button>
                        <div className='w-full h-14 flex justify-center gap-2'>
                            <p className='font-Outfit text-xs pt-2'>1</p>
                            <div className='w-[80%] bg-poll1 border flex justify-center flex-col items-center border-indigo-300 rounded-2xl h-14 gap-1' style={{
                                backgroundSize: 'cover', backgroundPosition: 'center',
                            }}>
                                <PiRankingDuotone className='text-sm' />
                                <h1 className={`text-[7px] pl-1 text font-Outfit `}>{localQuestion}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full h-full justify-center '>
                    <section className='w-0 lg:w-[10%]  pt-6 hidden lg:flex justify-center'>
                        <div className='flex  flex-col gap-4 items-center w-full'>
                            <button className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
                                <GoPlus />
                                New Slide
                            </button>
                            <div className='w-full h-14 flex justify-center gap-2'>
                                <p className='font-Outfit text-xs pt-2'>1</p>
                                <div className={`w-[80%] border flex justify-center flex-col items-center border-indigo-300 rounded-2xl bg-center ${designTemplate} bg-cover h-14 gap-1`}>
                                    <PiRankingDuotone className='text-sm' />
                                    <h1 className={`text-[7px]  text-center font-Outfit `}>{localQuestion}</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='w-[100%] md:w-[90%] lg:w-[60%] flex justify-center '>
                        <div className='w-full h-full flex flex-col mt-6 items-center '>

                            <div className={`  w-[95%] bg-cover bg-center ${designTemplate}`}>
                                <div className='w-full font-Outfit text-2xl pt-7 pl-12'>
                                    <h1>Q) {localQuestion}</h1>
                                </div>
                                <div className='w-full pb-28 flex mt hidden-lg:5 justify-center'>
                                    <div className='w-[90%] font-Outfit flex flex-col justify-start pt-5 gap-4 '>

                                        {localOptions.map((key, index) => (

                                            <div key={key._id} className='w-full  flex gap-1'>
                                                <div className='w-[3%]'>
                                                    {index + 1})
                                                </div>
                                                <div className='w-[70%] md:w-[90%] flex gap-2'>
                                                    <div className='w-[1%] h-full' style={{ backgroundColor: key.color }}></div>
                                                    <div>{key.text}</div>
                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='w-[10%] lg:w-[30%] h-full hidden sm:flex justify-center '>
                        <div className='w-full h-auto flex justify-center gap-2'>
                            <div className='bg-white h-[370px] mt-6 border border-white rounded-2xl w-[75%] hidden lg:flex flex-col gap-6'>
                                <div className='h-auto flex justify-center w-full items-center'>
                                    <div className='flex pt-5 pl-2 pr-4 justify-between w-full items-center '>
                                        <h1 className='flex gap-1 justify-center items-center text-sm font-Outfit'><IoMdArrowRoundBack /> Multiple Choice</h1>
                                        <div><RxCross2 className='cursor-pointer' /></div>
                                    </div>

                                </div>
                                <div className='pl-3 '>
                                    <div>
                                        <h1 className='font-Sora text-sm  font-semibold'>Edit Question : </h1>
                                    </div>
                                    <div className='pt-5 flex flex-col'>
                                        <label htmlFor="Question" className='font-Outfit text-sm  text-gray-900'>Question :</label>
                                        <input onChange={(e) => updateQuestion(e.target.value)} type="text" id='Question' className='h-7 w-[89%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-1 text-xs rounded-lg ' value={localQuestion} />
                                    </div>

                                    <div className='w-[95%] mt-3 h-1 border-b border-stone-300'></div>

                                    <div className='mt-4 '>
                                        <div className='pb-2'>
                                            <p className='text-xs font-Outfit font-semibold'>Options</p>
                                        </div>
                                        <div className='flex gap-2  flex-col'>
                                            {localOptions.map((key, index) => (

                                                <div key={key._id} className='relative flex items-center gap-2'>
                                                    <input value={key.text} onChange={(e) => handleOptionChange(index, e.target.value)} type="text" className='h-7 w-[60%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg' />
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
        </div>
    )
}

export default RankingType
