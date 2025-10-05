import React from "react";
import { HiExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router";

const DeleteConfirmPopup = ({ onClose, questionId, setQuestion, setDisplay, setDetails, setStatus, presenetationId }) => {

  const navigate = useNavigate();

  const deleteSlide = async () => {
    console.log(questionId);
    const response = await fetch("http://localhost:9000/handleQuestions/deleteSlide", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId })
    });

    const data = await response.json();
    
    if(response.ok){
      setQuestion(
        (prev)=>
          prev.filter((q)=> q._id !== questionId)
      );
      onClose();

      navigate(`/App/AdminPanel/Presentation/${presenetationId}`)
      
    }
    else{
      onClose();
       setDetails("Error Occurred!");
      setDisplay(true);
      setStatus(true);

      setTimeout(()=>{
        setStatus(false);
      },2000)
    }
    console.log(data);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-5">
        {/* Icon + Title */}
        <div className="flex items-center gap-2 mb-3">
          <HiExclamationCircle className="text-red-400 text-2xl" />
          <h2 className="font-Outfit font-semibold text-lg text-black">
            Confirm Deletion
          </h2>
        </div>

        {/* Message */}
        <p className="font-Outfit text-gray-700 text-sm mb-6 leading-relaxed">
          Are you sure you want to delete this slide? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 font-Outfit cursor-pointer py-1.5 text-sm font-medium rounded-md border bg-red-500 text-white hover:bg-red-600 transition">
            Cancel
          </button>
          <button onClick={deleteSlide} className="px-3 font-Outfit cursor-pointer py-1.5 text-sm font-medium rounded-md bg-indigo-400 text-white hover:bg-indigo-500 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
