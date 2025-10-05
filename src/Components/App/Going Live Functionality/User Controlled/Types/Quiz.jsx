import React from 'react';

const Quiz = ({ currentQuestion, showRespInPercen }) => {
    // prevent rendering when no question
    if (!currentQuestion) {
        return (
            <div className="flex justify-center items-center h-full w-full text-gray-500 font-Outfit">
                <div className='h-10 w-10 border-3 animate-spin border-stone-300 border-t-black rounded-full'></div>
            </div>
        );
    }

    const { designTemplate, question, options = [] } = currentQuestion;

    return (
        <section className="h-full w-full flex justify-center">
            <div className="w-full h-auto flex flex-col mt-6 items-center">
                <div className={`h-[100%] bg-cover bg-center ${designTemplate} w-[100%] text-white`}>
                    <div className="w-full h-[20%] text-black font-Outfit text-2xl pt-7 pl-7">
                        <h1>Q) {question}</h1>
                    </div>
                    <div className="w-full flex justify-center items-center h-[70%]">
                        <div className="w-[95%] md:w-[85%] grid grid-cols-4 place-items-center gap-4 h-full">
                            {options.map((opt, index) => (
                                <div key={opt._id || index} className="w-full h-full font-Outfit flex flex-col justify-end items-center">
                                    <div>
                                        {showRespInPercen
                                            ? <p className="text-black">{opt.percentage}%</p>
                                            : <p className="text-black">{opt.votes}</p>}
                                    </div>
                                    <div
                                        className="bg-indigo-400 transition-all ease-in-out duration-500 w-[80%]"
                                        style={{ height: `${opt.percentage === 0 ? opt.percentage + 2 : opt.percentage}%`, backgroundColor: opt.color }}
                                    ></div>
                                    <div className="w-[80%] mt-1 text-center text-white text-sm bg-black flex justify-center items-center">
                                        <p className="inline">{opt.text}</p>
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

export default Quiz;
