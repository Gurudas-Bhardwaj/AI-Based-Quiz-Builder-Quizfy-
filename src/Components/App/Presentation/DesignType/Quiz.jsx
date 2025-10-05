import React from 'react'

const Quiz = ({ designTemplate, localOptions, localQuestion }) => {
    const maxLength = 15;
    const truncateText = (text)=>{
        return text.length <= maxLength ? text : text.slice(0, maxLength) + "..."
    }
    return (
        <section className='h-[550px] flex-1 justify-center transition-all ease-in-out duration-300'>
            <div className='w-full h-full pl-2 pr-2  flex flex-col mt-6 items-center '>

                <div className={`h-[100%] bg-cover bg-center ${designTemplate} w-[100%] text-white`}>
                    <div className={`w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7`}>
                        <h1>Q) {localQuestion}</h1>
                    </div>
                    <div className='w-full flex justify-center  items-center h-[90%]'>
                        <div className='w-[95%] md:w-[85%] flex justify-center items-center  gap-4 h-[70%]'>

                            {localOptions.map((key, index) => (
                                <div key={index} className='w-full h-full font-Outfit flex flex-col justify-end items-center'>
                                    <div>
                                        <p className='text-black'>{key.votes}</p>
                                    </div>
                                    <div className='bg-indigo-400 h-[2%] w-[80%]' style={{ backgroundColor: key.color }}></div>
                                    <div className=' w-[80%] min-h-6 mt-1 text-center text-white text-sm bg-black flex justify-center items-center'>
                                        <p className=' inline  font-Outfit'>{truncateText(key.text)}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quiz
