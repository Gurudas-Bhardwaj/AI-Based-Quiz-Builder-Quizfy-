import { BadgePercent, Ban, Binary, ChartBarDecreasing, Cog, Expand, ExternalLink, Image, MessageCircleMore, PencilLine, PieChart, User, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { NavLink, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../../Context/authContext';
import BasicPopUp from './PopUps/BasicPopUp';
import { MdOutlinePoll } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { CiCirclePlus } from 'react-icons/ci';
import logo from '../../../../assets/Images/Logo/LOGO.png';
import Poll from './Types/Poll';
import Ranking from './Types/Ranking';
import ShareLink from './PopUps/ShareLink';
import QuizEndedPopUp from '../Admin Controlled/Pop ups/QuizEndedPopUp';
import CommentPage from './Main Files/CommentPage';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { TbChartDonutFilled, TbMessage2Bolt } from 'react-icons/tb';
import ParticipantsPage from './Main Files/ParticipantsPage';
import { AiFillBug } from 'react-icons/ai';
import { SiQuizlet } from 'react-icons/si';
import Quiz from './Types/Quiz';
import DonutType from './Types/Donut';
import Pie from './Types/Pie';
import ImagePreviewer from '../Admin Controlled/Pop ups/ImagePreviewer';
import { LuFileStack } from 'react-icons/lu';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { GoPlus } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';

const AdminUserControlledLanding = () => {
  const { userName, userId } = useAuth();
  const { presentationId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [loading, isLoading] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showParticipantCompo, setShowParticipantCompo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [showCommentSecPopUp, setShowCommentSecPopup] = useState(false);
  const [showFullScreenPopup, setShowFullScreenPopUp] = useState(false);
  const [showParticipantPopUp, setShowParticipantPopUp] = useState(false);
  const [unauthorized, setUnautorized] = useState(false);

  const [allQuestion, setAllQuestion] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [inPercent, setInPercentage] = useState(false);
  const [showInPercentPopUp, setShowInPerncetagePopUp] = useState(false);

  const [shareLink, setShareLink] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const [commentList, setCommentList] = useState([]);
  const [participantList, setParticipantList] = useState([]);
  const [imagePopup, setImagePopUp] = useState("");

  const [image, setImage] = useState("");

  const [showSlide, setShowSlide] = useState(false);

  const containerRef = useRef(null);

  // Add percentage calculation
  const addPercentageToQuestion = (questions) => {
    if (!questions) return [];
    return questions.map((question) => {
      if (!question?.options) return question;

      const totalVotes = question.options.reduce(
        (sum, option) => sum + (option.votes || 0),
        0
      );

      const updatedOptions = question.options.map((option) => ({
        ...option,
        percentage: totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100),
      }));

      return { ...question, options: updatedOptions };
    });
  };

  // SOCKET IO CONNECTION
  const socket = useRef(null);

  const socketHandler = async () => {
    isLoading(true);
    socket.current = io('https://ai-based-quiz-builder-quizfy-backend.onrender.com/userControlledQuiz', {
      transports: ['websocket', 'polling'],
    });

    socket.current.emit('joinQuizByAdmin', { presentationId, accessToken });

    socket.current.on('questionsForAdmin', ({ questions }) => {
      isLoading(false);
      const updated = addPercentageToQuestion(questions);
      setAllQuestion(updated || []);
    });

    socket.current.on('votesUpdates', ({ questions }) => {
      const updated = addPercentageToQuestion(questions);
      setAllQuestion(updated || []);
    });

    socket.current.emit("getComments", { presentationId });

    socket.current.on("commentUpdate", ({ comments }) => {
      console.log("Received comments:", comments);
      setCommentList(comments || []);
    });

    socket.current.on("newComment", (comment) => {
      console.log("New Comment recieved ", comment)
      setCommentList(prev => [...prev, comment]);
      toast.success(`New Message!`, {
        icon: <TbMessage2Bolt className='text-indigo-500 text-lg' />,
        position: "top-right",
        autoClose: 3000,
      })
    });

    socket.current.on("participantsList", ({ participants }) => {
      console.log(participants);
      setParticipantList(participants || []);
    });

    socket.current.on("participantsUpdate", ({ participants }) => {
      console.log(participants);
      setParticipantList(participants || []);
      if (participants.length > 0) {
        toast(`😉 Someone Just Joined!`, {
          position: "top-right",
          autoClose: 3000,
        })
      }
    })
    socket.current.on("participantsUpdateLeft", ({ participants }) => {
      console.log(participants);
      setParticipantList(participants || []);
    })

    socket.current.on("quizEnded", ({ message }) => {
      console.log(message)
      setAllQuestion([]);
      setSelectedQuestionId(null);
      setQuizEnded(true);
    })

    socket.current.on("unauthorized", () => {
      setUnautorized(true);
    })
  };


  const sendComment = (message) => {
    console.log("sending Comments")
    socket.current.emit("sendComment", { presentationId, userId, userName, message });
  }

  const goOffline = async () => {
    console.log("Going Offline")
    socket.current.emit("quizEndingReq", { presentationId });
  }

  useEffect(() => {
    isLoading(true);
    socketHandler();
  }, []);

  // Derive currentQuestion from allQuestion
  const currentQuestion = allQuestion.find((q) => q._id === selectedQuestionId) || null;

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
      case 'poll':
        return <MdOutlinePoll className="text-blue-400" size={16} />;
      case 'ranking':
        return <ChartBarDecreasing color="indigo" size={14} />;
      case 'quiz':
        return <SiQuizlet className="text-red-400" />;
      case 'pie':
        return <PieChart className="text-orange-400" />;
      case 'donut':
        return <TbChartDonutFilled className="text-emerald-400" />;
      default:
        return null;
    }
  };

  const selectType = (design) => {
    switch (design) {
      case 'ranking':
        return <Ranking allQuestion={allQuestion} currentQuestion={currentQuestion} />;
      case 'poll':
        return <Poll showRespInPercen={inPercent} allQuestion={allQuestion} currentQuestion={currentQuestion} />;
      case "quiz":
        return <Quiz showRespInPercen={inPercent} allQuestion={allQuestion} currentQuestion={currentQuestion} />
      case "donut":
        return <DonutType showRespInPercen={inPercent} allQuestion={allQuestion} currentQuestion={currentQuestion} />
      case "pie":
        return <Pie showRespInPercen={inPercent} allQuestion={allQuestion} currentQuestion={currentQuestion} />
      default:
        return null;
    }
  };

  const maxLength = 70;
  const truncateText = (text) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className='w-screen h-screen absolute top-0 left-0 bg-white flex flex-col justify-center items-center'>
        <div className='h-10 w-10 border-4 border-t-indigo-500 border-gray-400 rounded-full animate-spin'></div>
        <div className='font-Outfit text-gray-800 text-center flex justify-center items-center'>Loading Content! Please wait...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-screen min-h-screen bg-white relative overflow-hidden">
      {/* Popup :  */}
      {shareLink && <ShareLink presentationId={presentationId} onClose={() => setShareLink(false)} />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {quizEnded && <QuizEndedPopUp />}

      {/* Top Navbar */}
      <div className="w-screen border-b border-b-stone-200 h-14 bg-white">
        <div className="flex h-full justify-between pr-7 pl-7 items-center">
          <div className="font-Outfit flex gap-3 h-full justify-center items-center">
            <NavLink to="/App/Admin/Home">
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
          <div className="font-Outfit hidden h-full md:flex justify-center items-center gap-5">
            <div className="h-full flex border-b-2 justify-center cursor-pointer items-center">
              <h1 className="pt-1">Detailed Result</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 font-Outfit text-sm">
            <div className='hidden sm:flex justify-center items-center'>
              <button className="pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-gray-300 items-center justify-center text-black rounded-4xl text-xs cursor-pointer">
                <AiFillBug size={18} />
                <p>Report a Bug</p>
              </button>
              <div className="h-6 w-1 border-l border-l-stone-400"></div>
              <button
                onClick={() => setShareLink(true)}
                className="pt-1 pb-1 pr-3 pl-3 flex gap-1 cursor-pointer bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs"
              >
                <ExternalLink size={13} />
                <p>Share Link</p>
              </button>
            </div>
            <div className='flex relative md:hidden'>
              <div className='p-1 border border-stone-200 rounded-full bg-gray-200'>
                <BsThreeDots className='cursor-pointer' onClick={() => setShowOptions(!showOptions)} />
              </div>
              <div className={`absolute transition-all ${showOptions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}  bg-white font-Outfit p-5  rounded-xl shadow-sm flex flex-col gap-3 top-12 z-[999999] -left-6 `}>
                <div onClick={() => { setPreview(true); setShowOptions(false) }} className='flex justify-center cursor-pointer items-center'>
                  <h1 className='pt-1'>Preview</h1>
                </div>
                <div onClick={() => { setReportBugPopUp(true); setShowOptions(false) }} className='border-b-transparent flex justify-center cursor-pointer items-center'>
                  <h1 className='pt-1'>Report</h1>
                </div>
              </div>
            </div>
            <button
              onClick={() => goOffline()}
              className="cursor-pointer pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs"
            >
              <Ban size={13} />
              <p>Go Offline</p>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-screen relative flex items-center pt-5 gap-14">

        <div className='absolute  md:hidden z-10  top-5 left-4  bg-black pt-1 pb-1 pr-4 pl-4  rounded-3xl flex lg:hidden justify-center items-center gap-2' onClick={() => setShowSlide(!showSlide)}>
          <LuFileStack className='text-white flex lg:hidden' />
          <p className='text-white font-Outfit'>{currentQuestion?.order ? currentQuestion.order : "-"}/{allQuestion.length}</p>
        </div>


        {/* Sidebar */}
        <div className="w-[12%] hidden md:block ml-2">
          <div className="flex mr-5 flex-col gap-4 items-center w-full">
            <button className="flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl">
              <p>All Slides 👇</p>
            </button>
            <div
              className="h-[550px] flex flex-col gap-2 w-full overflow-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allQuestion.map((q, index) => (
                <div
                  onClick={() => setSelectedQuestionId(q._id)}
                  key={q._id}
                  className="w-full relative h-24 flex justify-center gap-1 cursor-pointer"
                >
                  <p className="font-Outfit text-xs w-[8%] pt-4">{index + 1}</p>
                  <div
                    className={`w-full hover:border-indigo-400 transition ease-in-out duration-150 h-20 border-2 flex justify-center flex-col items-center ${selectedQuestionId === q._id
                      ? 'border-indigo-400'
                      : 'border-gray-200'
                      } rounded-xl bg-center ${q.designTemplate} bg-cover gap-1`}
                  >
                    {setIcon(q.designType)}
                    <h1 className="text-[9px] text-center font-Outfit">
                      {truncateText(q.question)}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`fixed top-0 left-0 h-full z-[999] pt-6 bg-white transition-all duration-500 ease-in-out transform ${showSlide ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} flex justify-center w-[40%]`}>
          <div className='fixed md:hidden z-[99999] left-[105%] border p-2 bg-black rounded-full ' onClick={() => setShowSlide(!showSlide)}>
            <RxCross1 className='text-white text-sm' />
          </div>

          <div className='flex  pr-5 pl-2 flex-col gap-4 items-center w-full'>
            <button className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
              <GoPlus />
              <p>All Slide👇</p>
            </button>
            <div className='h-screen flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {allQuestion.map((key, index) => (
                <div
                  onClick={() => { setSelectedQuestionId(key._id); setShowSlide(false) }}
                  key={key._id}
                  className='w-full h-20 flex justify-center gap-1 cursor-pointer'
                >
                  <p className='font-Outfit text-xs pt-2'>{index + 1}</p>
                  <div
                    className={`w-full h-20 border-2 flex justify-center flex-col items-center ${selectedQuestionId === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
                    {
                      setIcon(key.designType)
                    }
                    <h1 className='text-[7px] text-center font-Outfit'>{truncateText(key.question)}</h1>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Main question display */}
        <div className="w-[98%] ml-2 md:ml-0 md:w-[73%] h-[600px] flex justify-center items-center">
          {currentQuestion == null ? (
            <div className="w-full cursor-pointer relative h-[550px] flex justify-center items-center border-2 bg-stone-200 border-gray-500 border-dashed">
              <div className="absolute top-4 right-4">
                <img src={logo} className="w-44" alt="" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <CiCirclePlus className="text-6xl" />
                <h1 className="font-Montserrat text-lg font-semibold">
                  Click on a question To display the Content
                </h1>
              </div>
            </div>
          ) : (
            <div className="w-full h-full">{selectType(currentQuestion.designType)}</div>
          )}
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

      <div
        className="fixed bottom-6 right-[216px] md:bottom-8 md:right-[214px] cursor-pointer p-[13px] border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setInPercentage(!inPercent)}
        onMouseEnter={() => setShowInPerncetagePopUp(true)}
        onMouseLeave={() => setShowInPerncetagePopUp(false)}
      >
        <div className="absolute -top-2">
          <BasicPopUp isVisible={showInPercentPopUp} value={inPercent ? "Change into Numbers" : "Change into Percentage"} />
        </div>
        {
          inPercent ?
            <Binary color='white' />
            :
            <BadgePercent color="white" />
        }
      </div>

      <div
        className="fixed bottom-6 right-[280px] md:bottom-8 md:right-[276px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setImage(!showParticipantCompo)}
        onMouseEnter={() => setImagePopUp(true)}
        onMouseLeave={() => setImagePopUp(false)}
      >
        <div className="absolute -top-2">
          <BasicPopUp isVisible={imagePopup} value={'Image Section for Image Question'} />
        </div>
        <Image color="white" />
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

      {/* Conditional Rendering */}
      <div
        className={`fixed right-4 bottom-4 z-50 w-[90%] sm:w-[400px] max-w-[90%] transition-all ease-in-out duration-500 ${showCommentSection || showParticipantCompo ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        {showCommentSection && (
          <CommentPage
            commentList={commentList}
            onClose={() => setShowCommentSection(false)}
            isVisible={showCommentSection}
            sendComment={sendComment}
          />
        )}
        {showParticipantCompo && (
          <ParticipantsPage
            participantList={participantList}
            onClose={() => setShowParticipantCompo(false)}
            isVisible={showParticipantCompo}
          />
        )}
      </div>

      <div className={`absolute bottom-4 z-[20000] right-4 transition-all ease-in-out duration-500 ${image ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} `}>
        <ImagePreviewer image={currentQuestion?.Image} onClose={() => setImage(false)} />
      </div>

      <div className={`w-screen z-[9999999999999] h-screen transition-all duration-300 ease-in-out absolute top-0 left-0 ${unauthorized ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <section className="w-full h-screen flex flex-col items-center justify-center bg-stone-950/90 font-Outfit px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 text-center max-w-md w-full">
            <FaExclamationTriangle className="text-yellow-500 text-6xl" />
            <h1 className="text-2xl font-semibold text-stone-800">
              Unauthorized Access
            </h1>
            <p className="text-stone-500 text-sm">
              You do not have permission to access this page or perform this action as you are not the admin of this presentation.
              Please contact your administrator if you think this is an error or report a bug.
            </p>
            <button
              onClick={() => navigate("/App/Admin/Home")} // navigate to home or safe page
              className="mt-4 px-6 py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition hover:scale-105"
            >
              Go Back Home
            </button>
          </div>
        </section>
      </div>

    </div>

  );
};

export default AdminUserControlledLanding;
