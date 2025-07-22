import React, { useState } from 'react'
import { BiBug } from 'react-icons/bi'
import { FaPlus, FaRegComment, FaRegUser } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiCursorClickDuotone, PiRankingDuotone } from 'react-icons/pi'
import { RiEdit2Fill, RiSettings4Line } from 'react-icons/ri'
import poll1 from "../../../assests/Images/Background_Images/BackGround1.png"
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'
import background1 from "../../../assests/Images/Background_Images/SimpleBackground8.jpg"

const RankingPresentation = () => {

    const location = useLocation();
    const backgroundImage = location.state?.backgroundImage;

    const [question,setQuestion] = useState("Vote on Anime, Which is best Anime among All?")
    const [option1,setOption1] = useState("Vinland Saga");    
    const [option2,setOption2] = useState("Naruto");
    const [option3,setOption3] = useState("One Piece");
    const [option4,setOption4] = useState("Bleach");

    const[colorPicker1, setColorPicker1] = useState("#FF0000");
    const[colorPicker2, setColorPicker2] = useState("#00FF00");
    const[colorPicker3, setColorPicker3] = useState("#0000FF");
    const[colorPicker4, setColorPicker4] = useState("#FFFF00");

    return (
        <main className='w-screen overflow-hidden'>
            <div className='w-full h-full flex flex-col justify-center items-center'>

                <nav className='w-full flex justify-center bg-white items-center h-14 overflow-hidden'>
                    <div className='w-[97%] h-full flex justify-between'>

                        <div className='flex justify-center gap-2 items-center'>

                            <NavLink to="/App/Home" className=' pr-2' >
                                <IoMdArrowRoundBack />
                            </NavLink>

                            <div className='font-Outfit text-[13px]'>
                                <p>Vibrant Color Mixture</p>
                                <p className='text-[10px] text-stone-600 flex gap-1 justify-start items-center    '><FaRegUser /> My Presentation</p>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div className='h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full'>
                                <RiSettings4Line className='' />
                            </div>
                        </div>

                        <div className='font-Outfit flex justify-center items-center gap-3 text-sm'>
                            <div>
                                <h1>Create</h1>
                            </div>
                            <div>
                                <h1>Result</h1>
                            </div>
                        </div>

                        <div className='flex justify-center items-center gap-2'>
                            <div>
                                <div className='h-7 w-7 flex bg-indigo-300 justify-center items-center rounded-full'>
                                    <FiUser />
                                </div>
                            </div>

                            <div className='h-5 w-1 border-r border-r-stone-200'></div>

                            <div>
                                <button className='text-xs flex bg-gray-300 text-black font-Outfit rounded-2xl pt-1 pb-1 pr-4 pl-4 gap-1'>
                                    <BiBug className='mt-[2px]' />Report a Bug
                                </button>
                            </div>

                            <div>
                                <button className='text-xs bg-indigo-400 text-white font-Outfit rounded-2xl pt-1 pb-1 pr-5 pl-5'>
                                    Go Live
                                </button>
                            </div>
                        </div>

                    </div>
                </nav>

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
                                    <div className='w-[80%] border flex justify-center flex-col items-center border-indigo-300 rounded-2xl h-14 gap-1' style={{
                                        backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', // or 'cover'
                                        backgroundPosition: 'center',}}>
                                            <PiRankingDuotone className='text-sm'/>
                                            <h1 className={`text-[7px] text font-Outfit `}>{question}</h1>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </section>

                        <section className='w-[60%] flex justify-center '>
                            <div className='w-full h-full flex flex-col mt-6 items-center '>
                                
                                <div style={{
                                    backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', // or 'cover'
                                    backgroundPosition: 'center',
                                }} className={`h-[75%] w-[95%] `}>
                                    <div className='w-full font-Outfit text-2xl pt-7 pl-12'>
                                        <h1>Q) {question}</h1>
                                    </div>
                                    <div className='w-full flex mt-5 justify-center h-[70%]'>
                                        <div className='w-[85%] font-Outfit flex flex-col justify-start pt-5 gap-4 h-full'>
                                            
                                          <div className='w-full  flex gap-1'>
                                            <div className='w-[6%]'>
                                              1st)
                                            </div>
                                            <div className='w-[95%] flex gap-1'>
                                              <div className='w-[65%] h-full' style={{backgroundColor:colorPicker1}}></div>
                                            <div>{option1}</div>
                                            </div>
                                          </div>

                                          <div className='w-full  flex gap-1'>
                                            <div className='w-[6%]'>
                                              2nd)
                                            </div>
                                            <div className='w-[95%] flex gap-1'>
                                              <div className='w-[35%] h-full' style={{backgroundColor:colorPicker2}}></div>
                                            <div>{option2}</div>
                                            </div>
                                          </div>

                                          <div className='w-full  flex gap-1'>
                                            <div className='w-[6%]'>
                                              3rd)
                                            </div>
                                            <div className='w-[95%] flex gap-1'>
                                              <div className='w-[20%] h-full' style={{backgroundColor:colorPicker3}}></div>
                                            <div>{option3}</div>
                                            </div>
                                          </div>

                                          <div className='w-full  flex gap-1'>
                                            <div className='w-[6%]'>
                                              4th)
                                            </div>
                                            <div className='w-[95%] flex gap-1'>
                                              <div className='w-[9%] h-full' style={{backgroundColor:colorPicker4}}></div>
                                              <div>{option4}</div>
                                            </div>
                                          </div>
                                            
                                        </div>
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
                                            <div><RxCross2 className='cursor-pointer'/></div>
                                        </div>

                                    </div>
                                    <div className='pl-3 '>
                                        <div>
                                            <h1 className='font-Sora text-sm  font-semibold'>Edit Question : </h1>
                                        </div>
                                        <div className='pt-5 flex flex-col'>
                                            <label htmlFor="Question" className='font-Outfit text-sm  text-gray-900'>Question :</label>
                                            <input type="text" id='Question' className='h-7 w-[89%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-1 text-xs rounded-lg ' value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                                        </div>

                                        <div className='w-[95%] mt-3 h-1 border-b border-stone-300'></div>

                                        <div className='mt-4 '>
                                            <div className='pb-2'>
                                                <p className='text-xs font-Outfit font-semibold'>Options</p>
                                            </div>
                                            <div className='flex gap-2  flex-col'>
                                                <div className='relative flex items-center gap-2'>
                                                    <input value={option1} onChange={(e)=>setOption1(e.target.value)}type="text" className='h-7 w-[60%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg' />
                                                    <label className="absolute top-[5px] left-[3px] cursor-pointer inline-block h-5  w-5 rounded-full overflow-hidden" style={{backgroundColor:colorPicker1}}>
                                                        <input
                                                            value={colorPicker1}
                                                            onChange={(e) => setColorPicker1(e.target.value)}
                                                            type="color"
                                                            className=" w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                                    </label>
                                                    <div> <RxCross1 className='text-sm cursor-pointer'/>  </div>
                                                </div>
                                                <div className='relative flex items-center gap-2'>
                                                    <input value={option2} onChange={(e)=>setOption2(e.target.value)} type="text" className='h-7 w-[60%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg ' />
                                                    <label className="absolute top-[5px] left-[4px] cursor-pointer inline-block h-5  w-5 rounded-full overflow-hidden" style={{backgroundColor:colorPicker2}}>
                                                        <input
                                                            value={colorPicker2}
                                                            onChange={(e) => setColorPicker2(e.target.value)}
                                                            type="color"
                                                            className=" w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                                    </label>
                                                    <div> <RxCross1 className='text-sm cursor-pointer'/>  </div>
                                                </div>
                                                <div className='relative flex items-center gap-2'>
                                                    <input value={option3} onChange={(e)=>setOption3(e.target.value)} type="text" className='h-7 w-[60%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg' />
                                                    <label className="absolute top-[5px] left-[3px] cursor-pointer inline-block h-5  w-5 rounded-full overflow-hidden" style={{backgroundColor:colorPicker3}}>
                                                        <input
                                                            value={colorPicker3}
                                                            onChange={(e) => setColorPicker3(e.target.value)}
                                                            type="color"
                                                            className=" w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                                    </label>
                                                    <div> <RxCross1 className='text-sm cursor-pointer'/>  </div>
                                                </div>
                                                <div className='relative flex items-center gap-2'>
                                                    <input value={option4} onChange={(e)=>setOption4(e.target.value)} type="text" className='h-7 w-[60%] border border-stone-300 bg-stone-200 focus:bg-white  focus:border-indigo-300 font-Sora pl-7 text-xs rounded-lg' />
                                                    <label className="absolute top-[5px] left-[3px]  cursor-pointer inline-block h-5  w-5 rounded-full overflow-hidden" style={{backgroundColor:colorPicker4}}>
                                                        <input
                                                            value={colorPicker4}
                                                            onChange={(e) => setColorPicker4(e.target.value)}
                                                            type="color"
                                                            className=" w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                                    </label>
                                                    <div> <RxCross1 className='text-sm cursor-pointer'/>  </div>
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
                                                <FaRegComment/>
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

            </div>
        </main>
    )
}

export default RankingPresentation
