import { ChartBarDecreasing, ChartBarIncreasing, CircleQuestionMark, X } from 'lucide-react';
import React, { useState } from 'react';
import { FaCaretUp, FaComment } from 'react-icons/fa';
import { MdOutlinePoll } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';

const NewSlide = ({ onClose, isVisible, presentationId }) => {
  const [messageBox1, setMessageBox1] = useState(false);
  const [messageBox2, setMessageBox2] = useState(false);

  const [selectedDesignType, setSelectedDesignType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (selectedDesignType && selectedTemplate) {
      const question = "Question will be displayed here!";
      const options = [
        { text: "Option A", color: "#FF0000" },
        { text: "Option B", color: "#00FF00" },
        { text: "Option C", color: "#0000FF" },
        { text: "Option D", color: "#FFA500" }
      ];

      try {
        const response = await fetch("http://localhost:9000/handleQuestions/addQuestion", {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({question, options, designTemplate : selectedTemplate, presentationId, designType : selectedDesignType})
        });
        const data = await response.json();


        if(response.ok){
          onClose();
          navigate(`/App/Presentation/${presentationId}/${data.id}`);
        }
        console.log(presentationId)
      }
      catch (e) {
        console.log("error", e);
      }
    }
  };

  const interactiveOptions = [
    { id: 'poll', icon:  <MdOutlinePoll className='text-blue-400' size={16} />, label: 'Poll' },
    { id: 'ranking', icon:<ChartBarDecreasing color='indigo' size={14} />, label: 'Ranking' },
    { id: 'openEnded', icon: <FaComment className='text-orange-400' />, label: 'Open Ended' },
  ];

  const templateOptions = [
    { id: 'ranking1', className: 'bg-ranking1' },
    { id: 'ranking2', className: 'bg-ranking2' },
    { id: 'ranking3', className: 'bg-ranking3' },
    { id: 'poll1', className: 'bg-poll1' },
    { id: 'poll2', className: 'bg-poll2' },
    { id: 'poll3', className: 'bg-poll3' },
    { id: 'open1', className: 'bg-openEnded1' },
    { id: 'open2', className: 'bg-openEnded2' },
    { id: 'open3', className: 'bg-openEnded3' },
  ];

  return (
    <section className={`flex transition-all duration-500 ease-out  h-auto w-92 relative  flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4  pointer-events-none'}`}>
      <div className=' -top-4 left-10 absolute'>
        <FaCaretUp className='text-2xl text-white' />
      </div>
      <div className='flex w-full pl-4 pb-5 rounded-xl bg-white flex-col'>
        <div className='w-full pt-3'>
          <div className='w-full flex justify-end pr-3'>
            <X size={16} onClick={onClose} className='hover:text-gray-400 cursor-pointer' />
          </div>
        </div>

        <div className='h-80 overflow-auto'>
          {/* Interactive Question */}
          <div className='flex gap-2 items-center'>
            <p className='font-Outfit text-xs text-gray-600'>Interactive questions</p>
            <CircleQuestionMark onMouseEnter={() => setMessageBox1(true)} onMouseLeave={() => setMessageBox1(false)} size={15} className='text-gray-600 cursor-pointer' />
          </div>

          <div className={`absolute flex-col left-0 z-50 gap-0 transition-all duration-500 ease-out ${messageBox1 ? 'opacity-100 translate-y-0 flex' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className='relative'>
              <div className='absolute pl-32'>
                <FaCaretUp className='text-2xl  text-black' />
              </div>
              <div className='absolute top-4 h-8 w-96 flex justify-center items-center rounded-2xl text-white bg-black font-Outfit'>
                <p className='text-xs'>Get real-time input from your audience with these question formats.</p>
              </div>
            </div>
          </div>


          <div className='grid grid-cols-2 gap-2 mt-2'>
            {interactiveOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedDesignType(option.id)}
                className={`flex h-7 hover:bg-gray-200 gap-1 border-2 p-3 cursor-pointer items-center rounded-2xl 
                  ${selectedDesignType === option.id ? 'border-indigo-400' : 'border-transparent'}`}
              >
                {option.icon}
                <p className='font-Outfit text-xs'>{option.label}</p>
              </div>
            ))}
          </div>

          {/* Templates */}
          <div className='mt-4 flex gap-2 items-center'>
            <p className='font-Outfit text-xs  text-gray-600'>Templates</p>
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

          <div className='grid grid-cols-2 gap-2 mt-4 pr-4'>
            {templateOptions.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.className)}
                className={`${template.className} border-2 ${selectedTemplate === template.className ? 'border-indigo-400' : 'border-white'} w-full h-16 bg-center bg-cover cursor-pointer`}
              />
            ))}
          </div>

          <div className='w-full mt-3 flex justify-center items-center'>
            <button
              onClick={handleCreate}
              disabled={!selectedDesignType || !selectedTemplate}
              className={`${selectedDesignType && selectedTemplate ? 'bg-indigo-400 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} text-sm font-Sora pt-1 pb-1 pl-5 pr-5 text-white rounded-2xl`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSlide;
