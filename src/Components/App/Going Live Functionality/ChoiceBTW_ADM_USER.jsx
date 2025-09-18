
import { CirclePlus, Crown, Users, Sparkles, ArrowRight } from 'lucide-react';
import { FaRocket, FaUserFriends } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from 'react-router';

const ChoiceBTW_ADM_USER = ({ onClose, isVisible, presentationId }) => {
    const navigate = useNavigate();
    const goToLivePage = ()=>{
        navigate(`/Admin/Quiz/Live/${presentationId}`);
    }


    return (
        <div className={`fixed inset-0 flex items-center justify-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 ' : 'opacity-0 pointer-events-none'} bg-black/60`}> 
            <div className="relative bg-white/90 rounded-3xl pt-4 pr-8 pl-8 pb-8 w-[95vw] max-w-xl shadow-2xl border-2 border-indigo-200 backdrop-blur-md animate-fadeIn max-h-[550px] overflow-auto " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='flex w-full justify-end'>
                    <CirclePlus onClick={onClose} className='rotate-45 cursor-pointer text-red-500 hover:bg-red-100 rounded-full transition p-1' size={32} />
                </div>
                {/* Title */}
                <div className="flex flex-col items-center mb-8">
                    <span className="flex items-center justify-center mb-2">
                        <FaRocket className="text-indigo-400 text-3xl animate-bounce mr-2" />
                        <Sparkles className="text-pink-400" size={28} />
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-Outfit text-center bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-700 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
                        Go Live!
                    </h2>
                    <p className="text-center text-gray-500 mt-2 text-base font-Outfit">Choose how you want to run your quiz session</p>
                </div>

                {/* Options */}
                <div className="space-y-7 font-Outfit">
                    <div onClick={goToLivePage} className="group p-6 border-2 border-indigo-200 flex justify-center items-center flex-col rounded-2xl cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
                        <span className="absolute -top-6 -right-6 opacity-20 text-indigo-300 text-8xl pointer-events-none select-none"><Crown size={80} /></span>
                        <h3 className="font-bold text-lg flex items-center gap-2 text-indigo-700 mb-1">
                            <Crown className="text-yellow-400" size={24} /> Admin Controlled Quiz
                        </h3>
                        <p className="w-[90%] flex justify-center items-center text-center text-gray-600 text-sm">
                            A quiz fully controlled by the Admin. Admin switches questions & controls flow.
                        </p>
                        <span className="mt-3 flex items-center gap-1 text-xs text-indigo-500 font-semibold group-hover:underline">Go as Admin <ArrowRight size={16} /></span>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-4">
                        <div className="flex-grow h-[1px] bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200"></div>
                        <span className="text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-full shadow-sm font-Outfit">or</span>
                        <div className="flex-grow h-[1px] bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200"></div>
                    </div>
                    <div className="group p-6 flex flex-col justify-center items-center border-2 border-green-200 rounded-2xl cursor-pointer opacity-70 bg-gradient-to-r from-blue-100 via-green-100 to-teal-100 relative overflow-hidden  hover:shadow-2xl hover:scale-[1.03] transition-all ease-in-out duration-75">
                        <span className="absolute -top-6 -left-6 opacity-20 text-green-300 text-8xl pointer-events-none select-none"><Users size={80} /></span>
                        <h3 className="font-bold text-lg w-full justify-center flex items-center gap-2 text-green-700 mb-1">
                            <FaUserFriends className="text-green-400" size={22} /> User Controlled Quiz
                        </h3>
                        <p className="text-gray-600 w-[90%] flex text-center justify-center text-sm">
                            Users can answer freely at their own pace. Admin sees live results only.
                        </p>
                        <span className="mt-3 flex items-center gap-1 text-xs text-green-500 font-semibold group-hover:underline">Go as Viewer <ArrowRight size={16} /></span>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                  0% { opacity: 0; transform: scale(0.95); }
                  100% { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                  animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </div>
    )
}

export default ChoiceBTW_ADM_USER
