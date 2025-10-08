import React, { useEffect, useState } from 'react'
import logo from "../../../../assets/Images/Logo/LOGO.png"
import { ImCross } from 'react-icons/im'

const Preview = ({ question, onClose }) => {

    const [options, setOptions] = useState(question.options || [])
    const [designTemplate, setDesignTemplate] = useState(question.designTemplate || "");

    useEffect(()=>{
        setOptions(question.options || []);
        setDesignTemplate(question.designTemplate || "");
    },[question])
    return (
        <div className={`w-[90%] relative h-[90%] bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center gap-10 ${designTemplate}`}>
            <div className='w-full flex justify-center items-center'>
                <img src={logo} className='w-48' alt="" />
            </div>
            <div className='w-full flex flex-col gap-10 justify-center items-center'>
                <div className='w-[80%] flex justify-center font-Outfit text-2xl'>
                    Q){question.question}
                </div>
                <div className='w-[40%] flex flex-col gap-3 justify-center items-center'>
                    {
                        options.map((key, index)=>
                        <div key={index} className='w-[80%] cursor-pointer hover:scale-105 transition-all ease-in-out text-white pl-6 flex items-center font-Outfit text-lg h-16 bg-black border border-black rounded-2xl'>
                           {key.text}
                        </div>
                        )
                    }

                </div>
            </div>
            <div className='absolute bottom-0 right-0 font-Outfit text-white bg-black pl-1 pt-1 pb-1'>
                <p>This is preview of the page where user interact, this might differ from real.</p>
            </div>
            <div onClick={onClose} className='absolute top-4 right-4 bg-red-500 cursor-pointer p-2 text-white rounded-full'>
                <ImCross />
            </div>
        </div>
    )
}

export default Preview
