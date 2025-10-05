import React from 'react'

const Ranking = ({designTemplate, localOptions, localQuestion}) => {
    console.log(designTemplate)
    return (
            <section className='h-[550px] flex-1 pr-2 pl-2 justify-center transition-all ease-in-out duration-300'>
                <div className='w-full h-full flex flex-col mt-6 items-center '>

                    <div className={`h-[93%]  w-[95%] bg-cover bg-center ${designTemplate}`}>
                        <div className='w-full min-h-[30%] font-Outfit text-2xl pt-7 pl-12'>
                            <h1>Q) {localQuestion}</h1>
                        </div>
                        <div className='w-full pb-28 flex mt hidden-lg:5 justify-center'>
                            <div className='w-[90%]  font-Outfit flex flex-col justify-start gap-4 '>

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
    )
}

export default Ranking
