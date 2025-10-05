import React, { useEffect, useState } from "react";
import { XCircle, X } from "lucide-react";

const IncorrectOptionPopup = ({onClose, selectedOption, CorrectOption, detail}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // trigger animation on mount
  }, []);

  return (
    <>
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes bgRedPulse {
          0%, 100% { background-color: rgba(0,0,0,0.6); }
          50% { background-color: rgba(220,38,38,0.7); }
        }
        .animate-wrong {
          animation: scaleIn 0.3s ease-out,
                     shake 0.5s ease-in-out 0.3s;
        }
        .bg-red-pulse {
          animation: bgRedPulse 1.2s ease-in-out forwards;
        }
      `}</style>

      {/* 🔴 Red pulsing overlay instead of plain black */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-Outfit bg-black/60 bg-red-pulse">
        <div
          className={`relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 p-6 ${
            animate ? "animate-wrong" : ""
          }`}
        >
          {/* Close button */}
          <button
            onClick={()=>onClose(false)}
            aria-label="Close"
            className="absolute cursor-pointer top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <XCircle className="text-red-600" size={72} strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Wrong Answer
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-6">
            Your selected answer is incorrect.
          </p>

          {/* Wrong Answer Card */}
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100">
                <X size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">Your answer</div>
                <div className="text-sm font-medium text-gray-900">{selectedOption}</div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 rounded-md border border-gray-200 p-4 text-sm text-gray-700 mb-6">
            <div className="font-bold text-base text-green-800 mb-1">
              Correct Option : {CorrectOption}
            </div>
            <p className="leading-relaxed">
              {detail ? detail : "Nothing Provided By Admin!"}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={()=>onClose(false)}
            className="w-full cursor-pointer bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Better Luck, Next time!
          </button>
        </div>
      </div>
    </>
  );
};

export default IncorrectOptionPopup;
