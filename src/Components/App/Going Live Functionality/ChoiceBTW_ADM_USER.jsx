import { CirclePlus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

const ChoiceBTW_ADM_USER = ({ onClose, isVisible, presentationId }) => {
    const navigate = useNavigate();
    const goToLivePage = ()=>{
        navigate(`/Admin/Quiz/Live/${presentationId}`);
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black/70  transition-all duration-500 ease-out ${isVisible ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>
            <div className="bg-stone-200 rounded-2xl pt-3 pr-8 pl-8 pb-10 w-[500px] shadow-2xl">
                <div className='flex w-full justify-end'>
                    <CirclePlus onClick={onClose} className='rotate-45 cursor-pointer text-red-500' />
                </div>
                {/* Title */}
                <h2 className="text-2xl mb-10 font-bold font-Outfit text-center bg-gradient-to-r from-indigo-300 to-indigo-500 text-transparent bg-clip-text">
                    🚀 Go Live!
                </h2>


                {/* Options */}
                <div onClick={goToLivePage} className="space-y-4 font-Outfit">
                    <div className="p-4 border flex justify-center items-center flex-col border-stone-400 rounded-xl cursor-pointer hover:shadow-lg hover:scale-[1.02] transition bg-gradient-to-r from-indigo-100 to-purple-100">
                        <h3 className="font-semibold text-center flex items-center gap-2">
                            👑 Admin Controlled Quiz
                        </h3>
                        <p className="w-[90%] flex justify-center items-center text-center text-gray-600 text-sm">
                            A quiz fully controlled by the Admin. Admin switches questions & controls flow.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-6">
                        <div className="flex-grow h-[1px] bg-gray-300"></div>
                        <span className="text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-full shadow-sm">or</span>
                        <div className="flex-grow h-[1px] bg-gray-300"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-center items-center border border-stone-400 rounded-xl cursor-pointer hover:shadow-lg hover:scale-[1.02] transition bg-gradient-to-r from-blue-100 to-green-100">
                        <h3 className="font-semibold w-full justify-center flex items-center gap-2">
                            🙋 User Controlled Quiz
                        </h3>
                        <p className="text-gray-600 w-[90%] flex text-center w justify-center text-sm">
                            Users can answer freely at their own pace. Admin sees live results only.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChoiceBTW_ADM_USER
