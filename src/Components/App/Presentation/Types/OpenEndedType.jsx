import React, { useState, useRef } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaPlus, FaRegComment, FaRegUser } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'

const OpenEndedType = ({ questionId, question, designTemplate }) => {

    const location = useLocation();
    const [localQuestion, setLocalQuestion] = useState(question);

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
        }, 2000)

    }

    const data = [
        {
            response: "Please help"
        },

    ];

    return (
        <div className='bg-stone-200 h-[500px] w-screen  overflow-hidden overflow-y-hidden'>
            <div className='flex w-full h-full justify-center '>
                <section className='w-[10%] pt-6 flex justify-center'>
                    <div className='flex  flex-col gap-4 items-center w-full'>
                        <button className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
                            <GoPlus />
                            New Slide
                        </button>
                        <div className='w-full h-14 flex justify-center gap-2'>
                            <p className='font-Outfit text-xs pt-2'>1</p>
                            <div className={`w-[80%] ${designTemplate} border flex justify-center flex-col items-center border-indigo-300 rounded-2xl h-14 gap-1 bg-cover bg-center`}>
                                <PiRankingDuotone className='text-sm' />
                                <h1 className={`text-[7px] text-center font-Outfit`}>{localQuestion}</h1>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </section>

                <section className='w-[60%] flex justify-center '>
                    <div className='w-full h-full flex flex-col mt-6 items-center '>

                        <div className={`h-[75%] bg-cover bg-center ${designTemplate} w-[95%]`}>
                            <div className='w-full font-Outfit text-2xl pt-7 pl-7'>
                                <h1>Q) {localQuestion}</h1>
                            </div>
                            <div className='w-full flex justify-center mt-4 items-center h-[77%]'>
                                {data.length > 0 ? <div className='w-[100%] pl-3 pr-3 overflow-auto grid grid-cols-4 place-items-start gap-4 h-full'>
                                    {data.map((data, index) => (
                                        <div key={index} className='w-full border border-black bg-indigo-400 flex justify-center font-Outfit items-center'>
                                            <p className='p-3    text-sm text-white'>{data.response}</p>
                                        </div>
                                    ))}
                                </div> : (
                                    <div className='text-center font-Outfit text-xl text-gray-500'>
                                        <h1>Answer will be displayed here!</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='w-[30%] h-full flex justify-center '>
                    <div className='w-full h-auto flex justify-center gap-2'>
                        <div className='bg-white h-[370px] mt-6 border border-white rounded-2xl w-[75%] flex flex-col gap-6'>
                            <div className='h-auto flex justify-center w-full items-center'>
                                <div className='flex pt-5 pl-2 pr-4 justify-between w-full items-center '>
                                    <h1 className='flex gap-1 justify-center items-center text-sm font-Outfit'><IoMdArrowRoundBack /> Multiple Choice</h1>
                                    <div><RxCross2 className='cursor-pointer' /></div>
                                </div>

                            </div>
                            <div className='pl-3 overflow-auto'>
                                <div>
                                    <h1 className='font-Sora text-sm  font-semibold'>Edit Question : </h1>
                                </div>
                                <div className='pt-5 flex flex-col'>
                                    <label htmlFor="Question" className='font-Outfit text-sm  text-gray-900'>Question :</label>
                                    <input type="text" id='Question' className='h-7 w-[89%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-1 text-xs rounded-lg ' value={localQuestion} onChange={(e) => updateQuestion(e.target.value)} />
                                </div>

                                <div className='w-[95%] mt-3 h-1 border-b border-stone-300'></div>

                                <div className='mt-4 overflow-auto'>
                                    <div className='pb-2'>
                                        <p className='text-xs font-Outfit font-semibold'>Responses :</p>
                                    </div>
                                    <div className='w-full flex flex-col overflow-auto'>
                                        <div className='flex gap-2 overflow-visible  flex-col'>
                                            {data.length >= 1 ? data.map((data, index) => (
                                                <div key={index} className='w-full flex items-center gap-2'>
                                                    <div className='w-[70%] font-Outfit text-sm bg-stone-300 p-1 pl-2 rounded-xl'>
                                                        {data.response}
                                                    </div>
                                                    <div className='cursor-pointer'>
                                                        <RxCross2 />
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className='pt-5 pl-5 text-gray-500 font-Outfit'>
                                                    Answer will be displayed here.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[22%] mt-6 flex flex-col gap-1 h-full'>
                            <div className='w-full bg-white flex flex-col border rounded-lg border-transparent  items-center cursor-pointer'>
                                <div className='font-Outfit pt-4 pb-4 w-full border-2 rounded-lg border-indigo-300 ml-1 mr-1 flex justify-center items-center flex-col'>
                                    <div>
                                        <PiRankingDuotone />
                                    </div>
                                    <div>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full bg-white flex flex-col  border rounded-lg border-transparent items-center'>
                                <div className='font-Outfit pt-4 pb-4 w-full border-2 rounded-lg border-indigo-300 text-sm cursor-pointer ml-1 mr-1 flex justify-center items-center flex-col'>
                                    <div>
                                        <FaRegComment />
                                    </div>
                                    <div>
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

    )
}

export default OpenEndedType
