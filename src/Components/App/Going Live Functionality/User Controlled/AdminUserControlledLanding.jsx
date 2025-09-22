import { Ban, ChartBarDecreasing, Cog, Expand, ExternalLink, Info, MessageCircleMore, PencilLine, User, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { NavLink, useParams } from 'react-router';
import { useAuth } from '../../../../Context/authContext';
import CommentSection from '../Admin Controlled/Pop ups/CommentSection';
import PopUp from '../Admin Controlled/Pop ups/PopUp';
import BasicPopUp from './PopUps/BasicPopUp';
import ParticipantInRoom from './PopUps/ParticipantInRoom';
import { GoPlus } from 'react-icons/go';
import { MdOutlinePoll } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';

const AdminUserControlledLanding = () => {
  const { userName } = useAuth();
  const { presentationId } = useParams();

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showParticipantCompo, setShowParticipantCompo] = useState(false);

  const [showCommentSecPopUp, setShowCommentSecPopup] = useState(false);
  const [showFullScreenPopup, setShowFullScreenPopUp] = useState(false);
  const [showParticipantPopUp, setShowParticipantPopUp] = useState(false);

  const [allQuestion, setAllQuestion] = useState([]);

  const containerRef = useRef(null);

  const participants = [
    { userName: 'Gurudas', userId: 'ksjd' },
    { userName: 'Person X', userId: 'ksjd2' },
    { userName: 'Person Y', userId: 'ksjd45' },
    { userName: 'Person Z', userId: 'ksjd324' },
    { userName: 'Alice Johnson', userId: 'ksjd5' },
    { userName: 'Bob Smith', userId: 'ksjd6' },
    { userName: 'Charlie Brown', userId: 'ksjd7' },
    { userName: 'David Green', userId: 'ksjd8' },
    { userName: 'Eve White', userId: 'ksjd9' },
    { userName: 'Frank Black', userId: 'ksjd10' },
    { userName: 'Grace Lee', userId: 'ksjd11' },
    { userName: 'Helen Moore', userId: 'ksjd12' },
    { userName: 'Ivy Clark', userId: 'ksjd13' },
    { userName: 'Jack Taylor', userId: 'ksjd14' },
    { userName: 'Kenny Walker', userId: 'ksjd15' },
    { userName: 'Lily Scott', userId: 'ksjd16' },
    { userName: 'Mike Harris', userId: 'ksjd17' },
    { userName: 'Nina Evans', userId: 'ksjd18' },
    { userName: 'Oscar King', userId: 'ksjd19' },
    { userName: 'Paul Hill', userId: 'ksjd20' },
    { userName: 'Quincy Adams', userId: 'ksjd21' },
    { userName: 'Rita Young', userId: 'ksjd22' },
    { userName: 'Sam Nelson', userId: 'ksjd23' },
    { userName: 'Tina Carter', userId: 'ksjd24' },
    { userName: 'Uma Fisher', userId: 'ksjd25' },
    { userName: 'Victor Gomez', userId: 'ksjd26' },
    { userName: 'Wendy Lopez', userId: 'ksjd27' },
    { userName: 'Xander Perez', userId: 'ksjd28' },
    { userName: 'Yara Moore', userId: 'ksjd29' },
    { userName: 'Zane Brooks hello i am gurudas', userId: 'ksjd30' },
  ];


  const handleEnterFullscreen = () => {
    const elem = containerRef.current;

    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      console.warn('Fullscreen API is not supported in this browser.');
    }
  };

  const setIcon = (designType) => {
    switch (designType) {
      case "poll":
        return <MdOutlinePoll className='text-blue-400' size={16} />
      case "ranking":
        return <ChartBarDecreasing color='indigo' size={14} />
      case "openEnded":
        return <FaComment className='text-orange-400' />
    }
  }

  const findDetails = async () => {
    try {
      const response = await fetch("http://localhost:9000/handleQuestions/searchQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ presentationId }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) return;

      // ✅ update states
      setAllQuestion(result.question)
    } catch (error) {
      console.error("Error in findDetails:", error);
    }
  };

  const sendComment = () => {

  }


  useEffect(() => {
    findDetails();
  }, []);

  const maxLenght = 70;
  const transculateText = (text) => {
    const length = text.length;

    return length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
  }
  const selectedQuestion = ""


  return (
    <div ref={containerRef} className="w-screen relative overflow-hidden">
      {/* Top Navbar */}
      <div className="w-screen border-b border-b-stone-200 h-14 bg-white">
        <div className="flex h-full justify-between pr-7 pl-7 items-center">
          <div className="font-Outfit flex gap-3 h-full justify-center items-center">
            <NavLink to="/App/Admin/Home" className="">
              <IoMdArrowRoundBack />
            </NavLink>
            <div className="font-Outfit relative text-[15px]">
              <p>Testing Presentation</p>
              <p className="text-[10px] text-stone-600 flex justify-start items-center">
                <User size={13} />
                {userName}
              </p>
            </div>
            <div className="h-5 w-1 border-r border-r-stone-200"></div>
            <div className="h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full">
              <Cog size={19} />
            </div>
          </div>
          <div className="font-Outfit hidden h-full md:flex justify-center items-center gap-5 text">
            <div className="h-full flex border-b-2 justify-center cursor-pointer items-center">
              <h1 className="pt-1">Detailed Result</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 font-Outfit text-sm">
            <div>
              <button className="pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-gray-300 items-center justify-center text-black rounded-4xl text-xs">
                <PencilLine size={13} />
                <p>Edit Slide</p>
              </button>
            </div>
            <div className="h-6 w-1 border-l border-l-stone-400"></div>
            <div>
              <button
                onClick={() => setShowFullScreenPopUp(true)}
                className="pt-1 pb-1 pr-3 pl-3 flex gap-1 cursor-pointer bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs"
              >
                <ExternalLink size={13} />
                <p>Share Link</p>
              </button>
            </div>
            <div>
              <button
                onClick={() => setShowFullScreenPopUp(true)}
                className="cursor-pointer pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs"
              >
                <Ban size={13} />
                <p>Go Offline</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* body of the page */}
      <div className='w-screen flex items-center pt-5'>
        <div className=' w-[12%] ml-2'>


          <div className='flex mr-5  flex-col gap-4 items-center w-full'>
            <button className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
              <p>All Slides 👇</p>
            </button>
            <div className='h-[550px] flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {allQuestion.map((key, index) => (
                <div
                  onClick={() => switchQuestions(key._id)}
                  key={key._id}
                  className='w-full relative h-24 flex justify-center gap-1 cursor-pointer'
                >
                {/* <div className='absolute top-1 left-[85%]'>
                  <div className='min-w-5 min-h-5  flex justify-center items-center border border-black rounded-full text-white bg-black text-xs font-Outfit font-semibold'>
                      <p>2</p>
                  </div>
                </div> */}
                  <p className='font-Outfit text-xs w-[8%] pt-4'>{index + 1}</p>
                  <div className={`w-full h-20 border-2 flex justify-center flex-col items-center ${selectedQuestion === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
                    {
                      setIcon(key.designType)
                    }
                    <h1 className='text-[9px] text-center font-Outfit'>{transculateText(key.question)}</h1>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Button */}
      <div
        className="fixed bottom-6 right-[155px] md:bottom-8 md:right-[155px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={handleEnterFullscreen}
        onMouseEnter={() => setShowFullScreenPopUp(true)}
        onMouseLeave={() => setShowFullScreenPopUp(false)}
      >
        <div className="absolute -top-2">
          <BasicPopUp isVisible={showFullScreenPopup} value={'Go to Full-Screen'} />
        </div>
        <Expand color="white" />
      </div>

      {/* Participant Button */}
      <div
        className="fixed bottom-6 right-[96px] md:bottom-8 md:right-[96px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setShowParticipantCompo(!showParticipantCompo)}
        onMouseEnter={() => setShowParticipantPopUp(true)}
        onMouseLeave={() => setShowParticipantPopUp(false)}
      >
        <div className="absolute -top-2">
          <BasicPopUp isVisible={showParticipantPopUp} value={'Participants In Room'} />
        </div>
        <Users color="white" />
      </div>

      {/* Comment Section Button */}
      <div
        className="fixed bottom-6 right-10 md:bottom-8 md:right-10 cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setShowCommentSection(!showCommentSection)}
        onMouseEnter={() => setShowCommentSecPopup(true)}
        onMouseLeave={() => setShowCommentSecPopup(false)}
      >
        <div className="absolute -top-2">
          <BasicPopUp isVisible={showCommentSecPopUp} value={'Chat Section'} />
        </div>
        <MessageCircleMore color="white" />
      </div>

      {/* Conditional Rendering for CommentSection and ParticipantInRoom */}
      <div
        className={`fixed left-[18%] sm:left-[55%] top-[23%] md:left-[60%] lg:top-[23%] lg:left-[72%] z-50 w-[90%] sm:w-[400px] max-w-[90%] transition-all ease-in-out duration-500 ${showCommentSection || showParticipantCompo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {showCommentSection && (
          <CommentSection commentList={[]} onClose={() => setShowCommentSection(false)} isVisible={showCommentSection} sendComment={sendComment} />
        )}
        {showParticipantCompo && (
          <ParticipantInRoom participantList={participants} onClose={() => setShowParticipantCompo(false)} isVisible={showParticipantCompo} />
        )}
      </div>
    </div>
  );
};

export default AdminUserControlledLanding;
