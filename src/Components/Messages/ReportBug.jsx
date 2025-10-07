import React, { useState } from "react";
import { FiX, FiSend, FiAlertCircle } from "react-icons/fi";

const BugReportPopup = ({onClose}) => {
    const [bug, setBug] = useState("");
  

  return (
    <div className="font-Outfit ">

        <div
          className="fixed inset-0 bg-stone-950/60 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Popup */}
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-red-500 transition"
            >
              <FiX size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <FiAlertCircle size={22} className="text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Report a Bug
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm mb-4">
              Found something that’s not working as expected? Let us know and
              we’ll fix it soon.
            </p>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <textarea
                value={bug}
                onChange={(e) => setBug(e.target.value)}
                required
                placeholder="Describe the issue..."
                className="border border-gray-200 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-400 cursor-pointer hover:bg-indigo-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
              >
                <FiSend size={16} />
                Submit
              </button>
            </form>
          </div>
        </div>
    
    </div>
  );
};

export default BugReportPopup;
