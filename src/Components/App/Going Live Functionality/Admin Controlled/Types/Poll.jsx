import React, { useEffect, useState } from 'react';

const Poll = ({ currentQuestion, showRespInPercen }) => {
  // safely initialize
  const [designTemplate, setDesignTemplate] = useState(currentQuestion?.designTemplate || "");
  const [localQuestion, setLocalQuestion] = useState(currentQuestion?.question || "");
  const [localOptions, setLocalOptions] = useState(currentQuestion?.options || []);

  useEffect(() => {
    if (currentQuestion) {
      setDesignTemplate(currentQuestion.designTemplate || "");
      setLocalQuestion(currentQuestion.question || "");
      setLocalOptions(currentQuestion.options || []);
      console.log(localOptions);  
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
        <div className={`h-[96%] bg-cover bg-center ${designTemplate} w-[97%] sm:w-[88%] md:w-[80%] lg:w-[72%] text-white`}>
          <div className="w-full h-[20%] text-black font-Outfit text-2xl pt-7 pl-7">
            <h1>Q) {localQuestion}</h1>
          </div>
          <div className="w-full flex justify-center items-center h-[70%]">
            <div className="w-[95%] md:w-[85%] grid grid-cols-4 place-items-center gap-4 h-full">
              {localOptions.map((key, index) => (
                <div key={index} className="w-full h-full font-Outfit flex flex-col justify-end items-center">
                  <div>
                    {showRespInPercen ? 
                    <p className="text-black">{key.percentage}%</p> 
                    :
                    <p className="text-black">{key.votes}</p>}
                  </div>
                  <div
                    className={`bg-indigo-400 transition-all ease-in-out duration-500  w-[80%]`}
                      style={{ height: `${key.percentage==0? key.percentage + 2 : key.percentage}%`, backgroundColor: key.color }}
                  ></div>
                  <div className="w-[80%] mt-1 text-center text-white text-sm bg-black flex justify-center items-center">
                    <p className="inline">{key.text}</p>
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

export default Poll;
