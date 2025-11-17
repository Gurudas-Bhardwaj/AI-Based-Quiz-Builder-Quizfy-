import React, { useEffect } from 'react';
import { CheckCircle2, X } from "lucide-react";
import {triggerConfetti} from './triggerConfetti.jsx'

const CorrectOptionPopup = ({selectedOption, detail, onClose, showConfetti = true}) => {
    
    useEffect(()=>{
        if (showConfetti) {
            triggerConfetti();
        }
    },[showConfetti])
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 font-Outfit">
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 p-6">

                {/* Close button */}
                <button
                    onClick={()=>onClose(false)}
                    aria-label="Close"
                    className="absolute cursor-pointer top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={20} />
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="text-emerald-600" size={72} strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                    Correct Answer!
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 text-center mb-6">
                    Well done — you selected the right option.
                </p>

                {/* Correct Answer Card */}
                <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-100">
                            <CheckCircle2 size={20} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-gray-500">Correct answer</div>
                            <div className="text-sm font-medium text-gray-900">{selectedOption.text}</div>
                        </div>
                    </div>
                </div>

                {/* Explanation */}
                <div className="bg-gray-50 rounded-md border border-gray-200 p-4 text-sm text-gray-700 mb-6">
                    <div className="font-medium text-gray-800 mb-1">Why this is correct</div>
                    <p className="leading-relaxed">
                        {detail ? detail : "Nothing Provided by Admin!"}
                    </p>
                </div>

                {/* Action Button */}
                <button
                    onClick={()=>onClose(false)}
                    className="w-full cursor-pointer bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default CorrectOptionPopup
