import { ChartBarDecreasing, ChartBarIncreasing, Circle, CircleQuestionMark, X } from 'lucide-react';
import React, { useState } from 'react';
import { FaCaretUp, FaComment } from 'react-icons/fa';
import { MdOutlinePoll } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../../Context/authContext';

const SelectPresenation = ({ onClose, isVisible, presentationId }) => {
  const [messageBox1, setMessageBox1] = useState(false);
  const [messageBox2, setMessageBox2] = useState(false);

  const [selectedDesignType, setSelectedDesignType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const { userId, role } = useAuth();
  console.log(role)

  const navigate = useNavigate();

  const interactiveOptions = [
    { id: 'poll', icon: <MdOutlinePoll className='text-blue-400' size={16} />, label: 'Poll' },
    { id: 'ranking', icon: <ChartBarDecreasing color='indigo' size={14} />, label: 'Ranking' },
    { id: 'openEnded', icon: <FaComment className='text-orange-400' />, label: 'Open Ended' },
  ];

  const templateOptions = [
    { id: 'BG-none', className: 'NONE' },
    { id: 'BG-1', className: 'bg-BG-1' },
    { id: 'BG-2', className: 'bg-BG-2' },
    { id: 'BG-3', className: 'bg-BG-3' },
    { id: 'BG-4', className: 'bg-BG-4' },
    { id: 'BG-5', className: 'bg-BG-5' },
    { id: 'BG-6', className: 'bg-BG-6' },
    { id: 'BG-7', className: 'bg-BG-7' },
    { id: 'BG-8', className: 'bg-BG-8' },
    { id: 'BG-9', className: 'bg-BG-9' },
    { id: 'BG-10', className: 'bg-BG-10' },
    { id: 'BG-11', className: 'bg-BG-11' },
    { id: 'BG-12', className: 'bg-BG-12' },
    { id: 'BG-14', className: 'bg-BG-14' },
    { id: 'BG-15', className: 'bg-BG-15' },
    { id: 'BG-16', className: 'bg-BG-16' },
  ];

  const options = [
    { text: "Option A", color: "#FF0000" },
    { text: "Option B", color: "#00FF00" },
    { text: "Option C", color: "#0000FF" },
    { text: "Option D", color: "#FFA500" }
  ];

  const createPresentationAndQuestion = async () => {
    try {
      // 1. Create Presentation
      const presRes = await fetch("http://localhost:9000/handleQuestions/createPresentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, title: "Untitled Presentation", role : role })
      });

      const { presentationId } = await presRes.json();
      console

      // 2. Create Sample First Question
      const quesRes = await fetch("http://localhost:9000/handleQuestions/addQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presentationId,
          designType : selectedDesignType,
          designTemplate : selectedTemplate,
          question: "Question will be displayed here!",
          options,
          role
        })
      });

      const { question } = await quesRes.json();
      console.log(question)

      // 3. Redirect to question editor view
      navigate(`/App/AdminPanel/Presentation/${presentationId}/${question._id}`);
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div className={`w-screen h-screen flex justify-center items-center transition-all duration-500 ease-out inset-0 bg-black/70 ${isVisible ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>
      <section className={`flex   h-auto w-[60%] relative  flex-col `}>

        <div className='flex w-full pl-4 pb-5 rounded-xl bg-white flex-col'>
          <div className='w-full pt-3'>
            <div className='w-full flex justify-end pr-3'>
              <X size={16} onClick={onClose} className='hover:text-gray-400 cursor-pointer' />
            </div>
          </div>
        <div className='w-full flex font-Outfit font-semibold text-xl pt-2 pb-4 justify-center items-center'>
          <h1>Create a Presentation</h1>
        </div>

          <div className='h-[400px] overflow-auto'>
            {/* Interactive Question */}
            <div>
              <div className='flex gap-2 items-center'>
                <p className='font-Outfit  text-gray-600'>Interactive questions</p>
                <CircleQuestionMark onMouseEnter={() => setMessageBox1(true)} onMouseLeave={() => setMessageBox1(false)} size={15} className='text-gray-600 cursor-pointer' />
              </div>
            </div>

            <div className={`absolute flex-col left-0 z-50 gap-0 transition-all duration-500 ease-out ${messageBox1 ? 'opacity-100 translate-y-0 flex' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className='relative'>
                <div className='absolute -top-2 pl-[165px]'>
                  <FaCaretUp className='text-2xl  text-black' />
                </div>
                <div className='absolute top-2 h-8 w-96 flex justify-center items-center rounded-2xl text-white bg-black font-Outfit'>
                  <p className='text-xs'>Get real-time input from your audience with these question formats.</p>
                </div>
              </div>
            </div>


            <div className='grid grid-cols-3 gap-2 mt-2 mb-4'>
              {interactiveOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedDesignType(option.id)}
                  className={`flex h-7 hover:bg-gray-200 gap-1 border-2 p-3 cursor-pointer items-center rounded-2xl 
                  ${selectedDesignType === option.id ? 'border-indigo-400' : 'border-transparent'}`}
                >
                  {option.icon}
                  <p className='font-Outfit  text-sm flex items-center  pr-2'>{option.label} </p>
                </div>
              ))}
            </div>


            {/* Templates */}
            <div className='mt-4 flex gap-2 items-center'>
              <p className='font-Outfit  text-gray-600'>Templates</p>
              <CircleQuestionMark onMouseEnter={() => setMessageBox2(true)} onMouseLeave={() => setMessageBox2(false)} size={15} className='text-gray-600 cursor-pointer' />
            </div>

            <div className={`absolute flex-col left-0 z-50 gap-0 transition-all duration-500 ease-out ${messageBox2 ? 'opacity-100 translate-y-0 flex' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className='relative'>
                <div className='absolute pl-[75px]'>
                  <FaCaretUp className='text-2xl  text-black' />
                </div>
                <div className='absolute top-4 h-8 w-80 flex justify-center items-center rounded-2xl text-white bg-black font-Outfit'>
                  <p className='text-xs'>Choose a template and make the slide more Interactive</p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2 mt-4 pr-4'>
              {templateOptions.map((template) => (
                template.className == "NONE" ? (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.className)}
                    className={` ${template.className} border-2 ${selectedTemplate === template.className ? 'border-indigo-400' : 'border-stone-300'} flex justify-center items-center w-full h-24 bg-center bg-cover cursor-pointer`}>
                    <p className='text-black font-Outfit text-sm'>Blank Slide</p>
                  </div>
                ) : (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.className)}
                    className={` ${template.className} border-2 ${selectedTemplate === template.className ? 'border-indigo-400' : 'border-white'} w-full h-24 bg-center bg-cover cursor-pointer`}
                  />)
              ))}
            </div>

            <div className='w-full mt-3 flex justify-center items-center'>
              <button
                onClick={createPresentationAndQuestion}
                disabled={!selectedDesignType || !selectedTemplate}
                className={`${selectedDesignType && selectedTemplate ? 'bg-indigo-400 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} text-sm font-Sora pt-1 pb-1 pl-5 pr-5 text-white rounded-2xl`}

              >
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectPresenation;
