
import React from 'react'
import thanks from "../../../../../assets/Images/Going live Images/HappyBear.png"
import { NavLink } from 'react-router';


const QuizEndedPopUp = () => {
    return (
        <div className="w-screen h-screen fixed flex justify-center items-center transition-all duration-500 ease-out inset-0 bg-black/70 z-50">
            <div className="flex flex-col bg-white w-full max-w-lg shadow-2xl border border-white rounded-3xl p-8 animate-fadeIn items-center">
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="pb-5">
                        <h1 className="font-Outfit font-bold text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-700 text-transparent bg-clip-text drop-shadow-lg text-center">Thank You For Using Quizfy!</h1>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <img src={thanks} className="w-40 md:w-48 drop-shadow-xl rounded-full border-4 border-indigo-100" alt="Thank you" />
                    </div>
                    <div className="font-Outfit text-center text-stone-700 text-base md:text-lg px-2">
                        <p className="pt-4 pb-2">Quiz is Ended<br></br><span className="inline-block">Hope You Enjoyed the Experience</span></p>
                        <p className="text-sm text-stone-500">You can check the detailed result in the <span className="font-semibold text-indigo-500">Session Page</span> of this presentation.</p>
                        <p className="text-sm text-stone-500 flex gap-1 justify-center items-center ">Please <NavLink className="text-indigo-500 font-bold" to="/ReviewUs">Review Us</NavLink> and share your experience</p>
                    </div>
                    <div className="mt-8 w-full flex justify-center">
                        <NavLink to="/App/Admin/Home" className="bg-gradient-to-r font-Montserrat     from-indigo-400 via-pink-400 to-purple-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-200">Go To Home</NavLink>
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
    );
}

export default QuizEndedPopUp
