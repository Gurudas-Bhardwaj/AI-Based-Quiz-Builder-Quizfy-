import { BadgePercent, Ban, BinaryIcon, ChartColumn, Cog, Donut, ExternalLink, Image, Lightbulb, MessageCircle, MessageCircleMore, PencilLine, Share, Timer, User, Users } from 'lucide-react'
import React, { use, useEffect, useRef, useState } from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router'
import { useAuth } from '../../../../Context/authContext'
import { BiReset } from 'react-icons/bi'
import { FaCaretUp, FaExclamationTriangle } from 'react-icons/fa'
import PopUp from './Pop ups/PopUp'
import CommentSection from './Pop ups/CommentSection'
import ParticipantResponse from './Pop ups/ParticipantResponse'
import Poll from './Types/Poll'
import { io } from "socket.io-client"
import Ranking from './Types/Ranking'
import QuizEndedPopUp from './Pop ups/QuizEndedPopUp'
import ShareLinkPopUp from './Pop ups/ShareLinkPopUp'
import JoiningPopup from './Pop ups/JoiningPopup'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { TbMessage2Bolt } from 'react-icons/tb'
import StopWatch from './Pop ups/StopWatch'
import ImagePreviewer from './Pop ups/ImagePreviewer'
import Quiz from './Types/Quiz'
import Pie from './Types/Pie'
import DonutType from './Types/Donut';
import { BsThreeDots } from 'react-icons/bs'
const AdminLiveSession = () => {

  const { presentationId } = useParams();
  const { userName, userId } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [designType, setDesignType] = useState("");

  const [showJoiningPopup, setShowJoiningPopup] = useState(false);
  const [userNameJustJoined, setUserNameJustJoined] = useState("");
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();

  // UI state
  const [comment, setComment] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [goLeft, setGoLeft] = useState(false);
  const [goRight, setGoRight] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [stopWatch, setStopWatch] = useState(false);
  const [resetResult, setResetResult] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [timerInfo, setTimerInfo] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showParticipant, setShowParticipant] = useState(false);

  const [showPercentage, setShowPercentage] = useState(false);

  const [participantList, setParticipantList] = useState([]);
  const [participantResponses, setParticipantResponses] = useState([]);

  const [imageDispay, setImageDisplay] = useState(false);

  const socket = useRef(null);
  // const navigate = useNavigate();

  const [showQuizEnded, setShowQuizEnded] = useState(false);
  const [shareLinkPopUp, setShareLinkPopUp] = useState(false);



  const [commentList, setCommentList] = useState([]);

  const addPercentageToQuestion = (question) => {
    if (!question || !question.options) return question;
    console.log(question)

    const totalVotes = question.options.reduce((sum, option) => sum + (option.votes || 0), 0);

    const updatedOptions = question.options.map(option => ({
      ...option,
      percentage: totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
    }));

    return {
      ...question,
      options: updatedOptions
    };
  };


  useEffect(() => {


    socket.current = io("http://localhost:9000/adminControlledQuiz", {
      transports: ["websocket", "polling"]
    });

    socket.current.emit("joinQuizByAdmin", { presentationId, accessToken });

    // New question (initial or next/prev)
    socket.current.on("newQuestionForAdmin", ({ question }) => {
      const updatedQuestion = addPercentageToQuestion(question);
      setCurrentQuestion(updatedQuestion);
      setOptions(updatedQuestion?.options || []);
      setDesignType(updatedQuestion?.designType || "");
      console.log(question)
      console.log(question.Image)
      console.log("Received question:", updatedQuestion);
    });

    socket.current.on("unauthorized", () => {
      setIsUnauthorized(true);
    });


    // Vote update — backend now sends full question object
    socket.current.on("voteUpdate", ({ question }) => {
      // question is entire question object (options have votes)
      const updatedQuestion = addPercentageToQuestion(question);
      setCurrentQuestion(updatedQuestion);
      setOptions(updatedQuestion?.options || []);
      setDesignType(updatedQuestion?.designType || "");
    });

    // userResponse — append to live response log and also ensure UI sync
    // 🔵 Live updates
    socket.current.on("userResponse", ({ question, user, optionIndex, optionLabel, optionText }) => {
      const updatedQuestion = addPercentageToQuestion(question);
      setCurrentQuestion(updatedQuestion);
      setOptions(updatedQuestion?.options || []);
      setDesignType(updatedQuestion?.designType || "");

      setParticipantResponses(prev => [
        {
          questionIndex: updatedQuestion.index,
          userId: user.userId,
          userName: user.userName,
          optionIndex,
          optionLabel,
          optionText,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    });

    // 🟢 Replay old responses after refresh
    socket.current.on("existingResponses", (responses) => {
      setParticipantResponses(responses); // restore all old responses in log
    });


    // participants list
    socket.current.on("participantsUpdate", ({ participants }) => {
      setParticipantList(participants || []);
      if (!participants.length) return;

      const latestUser = participants[0];
      const latestUserName = latestUser?.userName || "";

      setUserNameJustJoined(latestUserName); // for UI state, if needed elsewhere

      // 💡 Use local variable here instead of relying on state
      toast.success(`🎉${latestUserName} joined the quiz!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });

    socket.current.emit("getComments", { presentationId });

    socket.current.on("commentUpdate", ({ comments }) => {
      setCommentList(comments || []);
    });

    socket.current.on("newComment", (comment) => {
      setCommentList(prev => [...prev, comment]);
      toast.success(`New Message!`, {
        icon: <TbMessage2Bolt className='text-indigo-500 text-lg' />,
        position: "top-right",
        autoClose: 3000,
      })
    });

    socket.current.on("quizEnded", () => {
      setShowQuizEnded(true);
      setCurrentQuestion(null);
      setOptions([]);
      setDesignType("");
    });

    return () => {
      socket.current.disconnect();
    };
  }, [presentationId]); // keep deps minimal so handlers are registered once per presentation


  const handleNextQuestion = () => {
    socket.current.emit("nextQuestion", {
      presentationId, accessToken
    })
  }

  const handleEndQuiz = () => {
    socket.current.emit("endQuizByAdmin", {
      presentationId, accessToken
    })
  }

  const handlePrevQuestion = () => {
    socket.current.emit("previousQuestion", {
      presentationId, accessToken
    })
  };

  const sendComment = (message) => {
    socket.current.emit("sendComment", { presentationId, userId, userName, message });
  }



  const chooseDesignType = (type) => {
    switch (type) {
      case "poll":
        return <Poll currentQuestion={currentQuestion} showRespInPercen={showPercentage} />;
      case "ranking":
        return <Ranking currentQuestion={currentQuestion} showRespInPercen={showPercentage} />;
      case "quiz":
        return <Quiz currentQuestion={currentQuestion} showRespInPercen={showPercentage} />;
      case "pie":
        return <Pie currentQuestion={currentQuestion} showRespInPercen={showPercentage} />;
      case "donut":
        return <DonutType currentQuestion={currentQuestion} showRespInPercen={showPercentage} />;
      default:
        return <div className='text-center flex justify-center items-center font-Outfit text-stone-400'>No question active</div>;

    }

  }

  const [startingTimer, setStartingTimer] = useState(false);
  const setTimerDetails = () => {
    setStartingTimer(!startingTimer);
  }


  return (
    <div className='relative top-0  left-0 z-50 overflow-hidden w-screen h-screen bg-stone-200 flex flex-col items-center   '>
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
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>

      {startingTimer && <div><StopWatch timeGiven={60} /></div>}


      {showQuizEnded && <QuizEndedPopUp />}

      {/* Top Navbar */}
      <div className='w-screen h-12 bg-white '>
        <div className='flex h-full justify-between pr-7 pl-7 items-center'>
          <div className='font-Outfit flex gap-3 h-full justify-center items-center'>

            <NavLink to="/App/Admin/Home" className='' >
              <IoMdArrowRoundBack />
            </NavLink>

            <div className='font-Outfit relative text-[13px]'>
              <p>Testing Presentation</p>
              <p className='text-[10px] text-stone-600 flex  justify-start items-center'><User size={13} />{userName}
              </p>

            </div>
            <div className='h-5 w-1 border-r border-r-stone-200'></div>

            <div className='h-7 w-7 flex bg-stone-200 justify-center items-center rounded-full'>
              <Cog size={19} />
            </div>
          </div>

          <div className=' font-Outfit hidden  h-full md:flex justify-center items-center gap-5 text-sm'>
            <div className='h-full flex border-b-2 justify-center cursor-pointer items-center'>

              <h1 className='pt-1'>Detailed Result</h1>
            </div>
          </div>

          <div className='flex items-center gap-3 font-Outfit text-sm'>
            <div>
              <button className=' pt-1 pb-1 pr-3 pl-3 hidden sm:flex gap-1 bg-gray-300 items-center justify-center text-black rounded-4xl text-xs '>
                <PencilLine size={13} />
                <p className=''>Edit Slide</p>
              </button>
            </div>

            <div className='p-1 flex sm:hidden  border border-stone-200 rounded-full bg-gray-200'>
              <BsThreeDots className='cursor-pointer' onClick={() => setShowOptions(!showOptions)} />
            </div>

            <div className='h-6 w-1 border-l  border-l-stone-400'></div>

            <div>
              <button className=' pt-1 pb-1 pr-3 pl-3 hidden sm:flex gap-1 cursor-pointer bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs '>
                <ExternalLink size={13} />
                <p onClick={() => setShareLinkPopUp(true)} className=''>Share Link</p>
              </button>
            </div>
            <div>
              <button onClick={handleEndQuiz} className='cursor-pointer pt-1 pb-1 pr-3 pl-3 flex gap-1 bg-indigo-400 items-center justify-center text-white rounded-4xl text-xs '>
                <Ban size={13} />
                <p className=''>Go Offline</p>
              </button>
            </div>
          </div>
        </div>
      </div>



      <div className='w-screen h-[100%] lg:h-[80%] flex justify-center items-center '>
        {
          chooseDesignType(designType)
        }
      </div>

      <div className='fixed w-auto md:w-screen right-0 top-[10%] md:top-[86%] flex flex-col md:flex-row justify-center items-center'>
        <div className='h-[100%] b pt-2 pb-2 pl-7 pr-7 flex flex-col md:flex-row justify-center items-center gap-5 rounded-3xl drop-shadow-2xl '>

          <div
            onMouseEnter={() => setCurrentParticipant(true)}
            onMouseLeave={() => setCurrentParticipant(false)}
            className='cursor-pointer relative bg-white p-3 rounded-full'
          >
            <div className='absolute top-0 left-[30%]'>
              <PopUp isVisible={currentParticipant} value={"Participant responded"} />
            </div>
            <Users onClick={() => { setShowCommentSection(false); setShowParticipant(!showParticipant) }} className='' size={24} />
          </div>
          {
            showPercentage ?
              <div
                onMouseEnter={() => setComment(true)}
                onMouseLeave={() => setComment(false)}
                onClick={() => setShowPercentage(!showPercentage)}
                className='cursor-pointer relative  bg-white p-3 rounded-full'
              >
                <div className='absolute top-0 left-[30%]'>
                  <PopUp isVisible={comment} value={"Show Response in Number"} />
                </div>
                <BinaryIcon className='transition-all duration-500 ease-in-out' size={24} />
              </div> :
              <div
                onMouseEnter={() => setComment(true)}
                onMouseLeave={() => setComment(false)}
                onClick={() => setShowPercentage(!showPercentage)}
                className='cursor-pointer relative  bg-white p-3 rounded-full'
              >
                <div className='absolute top-0 left-[30%]'>
                  <PopUp isVisible={comment} value={"Show Response in Percentage"} />
                </div>
                <BadgePercent className='transition-all duration-500 ease-in-out' size={24} />
              </div>
          }


          <div onMouseEnter={() => setAnalytics(true)}
            onMouseLeave={() => setAnalytics(false)}
            className='cursor-pointer relative  bg-white p-3 rounded-full'
          >
            <div className='absolute top-0 left-[30%]'>
              <PopUp isVisible={analytics} value={"View Full Analytics"} />
            </div>
            <ChartColumn size={24} />
          </div>
          <div className='flex flex-col md:flex-row h-full justify-center items-center gap-2'>
            <div
              onClick={handlePrevQuestion}
              onMouseEnter={() => setGoLeft(true)}
              onMouseLeave={() => setGoLeft(false)}
              className='cursor-pointer relative  bg-white p-3 rounded-full'>
              <div className='absolute top-0 left-[30%]'>
                <PopUp isVisible={goLeft} value={"Go To Previous Question"} />
              </div>
              <IoMdArrowRoundBack className='text-lg' />
            </div>
            <div
              onMouseEnter={() => setShareLink(true)}
              onMouseLeave={() => setShareLink(false)}
              className=' relative bg-amber-100 border flex justify-center items-center  cursor-pointer border-amber-400    p-3 rounded-full'>
              <div className='absolute top-1 flex left-2'>
                <PopUp isVisible={shareLink} value={"Share the Link to all"} />
              </div>
              <Lightbulb className='text-amber-500 ' size={20} />
            </div>
            <div className='cursor-pointer relative  bg-white p-3 rounded-full'
              onClick={handleNextQuestion}
              onMouseEnter={() => setGoRight(true)}
              onMouseLeave={() => setGoRight(false)}>
              <div className='absolute top-0 left-[30%]'>
                <PopUp isVisible={goRight} value={"Go to next Question"} />
              </div>
              <IoMdArrowRoundForward className='text-lg  cursor-pointer' />
            </div>
          </div>
          {/* Timer Icon with Hover Tooltip */}
          <div
            className={`cursor-pointer   relative  bg-white p-3 rounded-full`}
            onMouseEnter={() => setStopWatch(true)}
            onMouseLeave={() => setStopWatch(false)}
            onClick={setTimerDetails}
          >
            <div className='absolute top-0 left-[30%]'>
              <PopUp isVisible={stopWatch} value={"Start Timer"} />
            </div>
            <Timer size={24} className={``} />
          </div>

          {/* Reset Icon with Hover Tooltip */}
          <div
            className='cursor-pointer relative  bg-white p-3 rounded-full'
            onMouseEnter={() => setResetResult(true)}
            onMouseLeave={() => setResetResult(false)}
            onClick={() => setImageDisplay(!imageDispay)}
          >
            <div className='absolute top-0 left-[30%]'>
              <PopUp isVisible={resetResult} value={"Show the image (if Provided any)"} />
            </div>
            <Image size={24} />
          </div>

          <div
            className='cursor-pointer relative  bg-white p-3 rounded-full'
            onMouseEnter={() => setOpenComment(true)}
            onMouseLeave={() => setOpenComment(false)}
            onClick={() => { setShowCommentSection(!showCommentSection); setShowParticipant(false) }}
          >
            <div className='absolute top-0 left-[30%]'>
              <PopUp isVisible={openComment} value={"Open Comment Section"} />
            </div>
            <MessageCircleMore size={24} />
          </div>

        </div>
      </div>

      {/* comment section :  */}
      <div className={`absolute bottom-2 right-4 transition-all ease-in-out duration-500 ${showCommentSection ? 'opacity-100 ' : 'opacity-0   pointer-events-none'}`}>
        <CommentSection
          onClose={() => setShowCommentSection(!showCommentSection)}
          sendComment={sendComment}
          isVisible={showCommentSection}
          commentList={commentList}
        />
      </div>
      <div className={`absolute  bottom-2 right-4 transition-all ease-in-out duration-500  ${showParticipant ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3  pointer-events-none'}`}>
        <ParticipantResponse
          isVisible={showParticipant}
          onClose={() => setShowParticipant(false)}
          participantList={participantList}
          participantResponses={participantResponses} // pass the live log
        />

      </div>
      <div className={`absolute bottom-2 right-4 transition-all ease-in-out duration-500 ${imageDispay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3  pointer-events-none'}`}>
        <ImagePreviewer image={currentQuestion?.Image} onClose={() => setImageDisplay(false)} // pass the live log
        />

      </div>

      <div className={`w-screen h-screen transition-all duration-300 ease-in-out absolute top-0 left-0 ${shareLinkPopUp ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <ShareLinkPopUp presentationId={presentationId} onClose={() => setShareLinkPopUp(false)} />
      </div>

      <div className={`w-screen h-screen transition-all duration-300 ease-in-out absolute top-0 left-0 ${isUnauthorized ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <section className="w-full h-screen flex flex-col items-center justify-center bg-stone-950/90 font-Outfit px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 text-center max-w-md w-full">
            <FaExclamationTriangle className="text-yellow-500 text-6xl" />
            <h1 className="text-2xl font-semibold text-stone-800">
              Unauthorized Access
            </h1>
            <p className="text-stone-500 text-sm">
              You do not have permission to access this page or perform this action.
              Please contact your administrator if you think this is an error.
            </p>
            <button
              onClick={() => navigate("/App/Admin/Home")} // navigate to home or safe page
              className="mt-4 px-6 py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
            >
              Go Back Home
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminLiveSession
