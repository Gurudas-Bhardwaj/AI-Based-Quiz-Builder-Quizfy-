import React, { useEffect, useState } from 'react';

const Ranking = ({ currentQuestion, showRespInPercen }) => {
    // safely initialize
    const [designTemplate, setDesignTemplate] = useState(currentQuestion?.designTemplate || "");
    const [localQuestion, setLocalQuestion] = useState(currentQuestion?.question || "");
    const [localOptions, setLocalOptions] = useState(currentQuestion?.options || []);

    useEffect(() => {
        if (currentQuestion) {
            setDesignTemplate(currentQuestion.designTemplate || "");
            setLocalQuestion(currentQuestion.question || "");
            setLocalOptions(currentQuestion.options || []);
        }
    }, [currentQuestion]);

    // prevent rendering when no question
    if (!currentQuestion) {
        return (
            <div className="flex justify-center items-center h-full w-full text-gray-500 font-Outfit">
                <div className='h-10 w-10 border-3 animate-spin border-stone-300 border-t-black rounded-full'>

                </div>
            </div>
        );
    }

    return (
        <section className="h-full w-full flex justify-center">
            <div className="w-full h-auto flex flex-col mt-6 items-center">
                <div className={`h-[96%] bg-cover bg-center ${designTemplate} w-full text-white`}>
                    <div className="w-full text-black font-Outfit text-2xl pt-7 pl-7">
                        <h1>Q) {localQuestion}</h1>
                    </div>
                    <div className="w-full flex justify-center items-center h-[70%]">
                        <div className='w-[90%] font-Outfit flex flex-col justify-start pt-5 gap-4 '>

                            {localOptions.map((key, index) => (

                                <div key={key._id} className='w-full text-black  flex gap-1'>
                                    <div className='w-[3%]'>
                                        {index + 1})
                                    </div>
                                    <div className='w-[70%]  md:w-[100%] flex gap-2'>
                                        <div className='w-[100%] flex gap-1'>
                                            <div className='text-black max-w-[56%] transition-all duration-300 ease-in-out overflow-hidden h-[20px]' style={{ width: `${key.percentage == 0 ? key.percentage + 2 : key.percentage}%`, backgroundColor: key.color }}></div>
                                            <div>{key.text}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ranking;
