import { ChartBarDecreasing, ChartBarIncreasing, Circle, CircleQuestionMark, DonutIcon, PieChart, X } from 'lucide-react';
import React, { useState } from 'react';
import { FaCaretUp } from 'react-icons/fa';
import { MdOutlinePoll } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../Context/authContext';
import { templateOptions } from '../../Templates/Templates';
import { SiQuizlet } from 'react-icons/si';
import { TbChartDonutFilled } from 'react-icons/tb';

const SelectPresenation = ({ onClose, isVisible, presentationId }) => {
  const [messageBox1, setMessageBox1] = useState(false);
  const [messageBox2, setMessageBox2] = useState(false);

  const [selectedDesignType, setSelectedDesignType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const { userId} = useAuth();

  const navigate = useNavigate();

  const interactiveOptions = [
    { id: 'quiz', icon: <SiQuizlet className='text-orange-400' />, label: 'Quiz' },
    { id: 'poll', icon: <MdOutlinePoll className='text-blue-400' size={16} />, label: 'Poll' },
    { id: 'ranking', icon: <ChartBarDecreasing color='indigo' size={14} />, label: 'Ranking' },
    { id: 'donut', icon: <TbChartDonutFilled className='text-emerald-400' size={14} />, label: 'Donut' },
    { id: 'pie', icon: <PieChart color='red' size={14} />, label: 'Pie' },
  ];

  

  const options = [
    { text: "Option A", color: "#FF0000", answer : false },
    { text: "Option B", color: "#00FF00", answer : true},
    { text: "Option C", color: "#0000FF", answer : false},
    { text: "Option D", color: "#FFA500", answer : false}
  ];

  const createPresentationAndQuestion = async () => {
    try {
      // 1. Create Presentation
      const presRes = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/createPresentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, title: "Untitled Presentation" })
      });

      const { presentationId } = await presRes.json();
      console

      // 2. Create Sample First Question
      const quesRes = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/addQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presentationId,
          designType : selectedDesignType,
          designTemplate : selectedTemplate,
          question: "Question will be displayed here!",
          options,
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
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ease-out bg-stone-950/70  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <section className="relative w-full max-w-2xl max-h-[90%] rounded-3xl shadow-2xl bg-white/80 bg-clip-padding backdrop-blur-xl border border-white/30 flex flex-col overflow-auto animate-fadeInUp" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute  text-gray-500 hover:text-red-500  cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-red-100 shadow transition-all">
          <X size={20} className="  transition" />
        </button>
        {/* Header */}
        <div className="flex flex-col items-center justify-center py-6 px-8 bg-gradient-to-r bg-stone-200 rounded-t-3xl">
          <h1 className="font-Outfit font-extrabold text-2xl text-gray-800 tracking-tight flex items-center gap-2">
            <ChartBarIncreasing className="text-indigo-500" size={28} />
            Create a Presentation
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-Outfit">Start by choosing a question type and a beautiful template</p>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-6 px-8 py-6">
          {/* Interactive Question */}
          <div>
            <div className="flex gap-2 items-center mb-2">
              <p className="font-Outfit text-gray-700 text-base">Interactive Questions</p>
              <CircleQuestionMark onMouseEnter={() => setMessageBox1(true)} onMouseLeave={() => setMessageBox1(false)} size={18} className="text-indigo-400 cursor-pointer" />
            </div>
            {/* Tooltip */}
            <div className={`absolute left-[30%] -translate-x-1/2 z-50 transition-all duration-300 ${messageBox1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="relative left-0">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <FaCaretUp className="text-2xl text-indigo-700/90 drop-shadow" />
                </div>
                <div className="absolute top-1 left-0 -translate-x-1/2 w-80 flex justify-center items-center rounded-2xl text-white bg-indigo-700/90 font-Outfit shadow-lg px-4 py-2">
                  <p className="text-xs">Get real-time input from your audience with these question formats.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {interactiveOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedDesignType(option.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 shadow-md cursor-pointer transition-all duration-200 bg-white/80 hover:bg-indigo-50 hover:scale-105
                  ${selectedDesignType === option.id ? 'border-indigo-400 shadow-indigo-200' : 'border-transparent'}`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 shadow-inner">
                    {option.icon}
                  </div>
                  <p className="font-Outfit text-sm text-gray-700">{option.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Templates */}
          <div>
            <div className="flex gap-2 items-center mb-2 mt-2">
              <p className="font-Outfit text-gray-700 text-base">Templates</p>
              <CircleQuestionMark onMouseEnter={() => setMessageBox2(true)} onMouseLeave={() => setMessageBox2(false)} size={18} className="text-indigo-400 cursor-pointer" />
            </div>
            {/* Tooltip */}
            <div className={`absolute left-[25%] -translate-x-1/2 z-50 transition-all duration-300 ${messageBox2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="relative w-full left-0">
                <div className="absolute -top-3 right-[21 px] -translate-x-1/2">
                  <FaCaretUp className="text-2xl text-indigo-700/90 drop-shadow" />
                </div>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-72 flex justify-center items-center rounded-2xl text-white bg-indigo-700/90 font-Outfit shadow-lg px-4 py-2">
                  <p className="text-xs">Choose a template and make the slide more interactive.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {templateOptions.map((template) => (
                template.className === "NONE" ? (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.className)}
                    className={`border-2 ${selectedTemplate === template.className ? 'border-indigo-400 shadow-indigo-200' : 'border-stone-300'} flex justify-center items-center w-full h-20 bg-white/70 rounded-xl cursor-pointer hover:bg-indigo-50 transition-all`}
                  >
                    <span className="text-black font-Outfit text-xs">Blank Slide</span>
                  </div>
                ) : (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.className)}
                    className={`${template.className} border-2 ${selectedTemplate === template.className ? 'border-indigo-400 shadow-indigo-200' : 'border-white'} w-full h-20 bg-center bg-cover rounded-xl cursor-pointer hover:scale-105 transition-all`}
                  />
                )
              ))}
            </div>
          </div>
          {/* Create Button */}
          <div className="w-full flex justify-center items-center mt-4">
            <button
              onClick={createPresentationAndQuestion}
              disabled={!selectedDesignType || !selectedTemplate}
              className={`flex items-center gap-2 px-8 py-2 rounded-2xl font-Outfit text-base font-semibold shadow-lg transition-all duration-200
                ${selectedDesignType && selectedTemplate ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white hover:scale-105 hover:shadow-xl' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
            >
            
              Create
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectPresenation;
