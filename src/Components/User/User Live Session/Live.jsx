import React, { useEffect, useRef, useState } from 'react'
import logo from '../../../assets/Images/Logo/LOGO.png'
import { io } from 'socket.io-client';
import { NavLink, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../Context/authContext';
import { Expand, Info, Key, MessageCircleMore } from 'lucide-react';
import { FaChevronCircleLeft, FaChevronCircleRight, FaExclamationTriangle } from 'react-icons/fa';
import Slogan from '../../Messages/Slogan';
import thnks from '../../../assets/Images/Going live Images/thankYou.png'
import { FiArrowRight } from 'react-icons/fi';
import waitImage from "../../../assets/Images/Going live Images/wait.png"
import CommentPage from '../../App/Going Live Functionality/User Controlled/Main Files/CommentPage';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { TbMessage2Bolt } from 'react-icons/tb';
import QuizEndedPopUp from '../../App/Going Live Functionality/Admin Controlled/Pop ups/QuizEndedPopUp';
import CorrectOptionPopup from "./Popup/CorrectOptionPopup.jsx"
import IncorrectOptionPopup from "./Popup/IncorrectOptionPopup.jsx"

const Live = () => {
  const { presentationId } = useParams();
  const { userId, userName } = useAuth();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [infoForPopUp, setInfoForPopUp] = useState("");
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(true);

  const [quizEnded, setQuizEnded] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const [isLive, setIsLive] = useState(false);

  const [correctAnsPopup, setCorrectAnsPopup] = useState(false);
  const [incorrectAnsPopup, setIncorrectAnsPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [detail, setDetails] = useState("")

  const [unauthorized, setUnauthorized] = useState(false);

  const socket = useRef(null);
  const containerRef = useRef(null);

  const socketHandler = async () => {
    socket.current = io("https://ai-based-quiz-builder-quizfy-backend.onrender.com/userControlledQuiz", {
      transports: ["websocket", "polling"]
    })

    socket.current.emit("quizJoinedByUser", { presentationId, userId, userName, accessToken });

    socket.current.on("questionForUser", ({ questions }) => {
      setQuestions(questions);
      setIsLive(true);
      console.log(questions)
      // Find first unattempted question
      const firstUnattemptedIdx = questions.findIndex(q => q.attempted === false);
      if (firstUnattemptedIdx !== -1) {
        setCurrentIndex(firstUnattemptedIdx);
        setCurrentQuestion(questions[firstUnattemptedIdx]);
      } else {
        setCurrentIndex(0);
        setCurrentQuestion(questions[0] || null);
      }
    });

    socket.current.on("unauthorized", () => {
      setUnauthorized(true);
    });

    socket.current.on("updatedQuestion", (question) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === question.questionId
            ? { ...q, attempted: question.attempted, selectedOption: question.optionId }
            : q
        )
      );
      setVisible(true);
      setStatus(true);
      setInfoForPopUp("Successfully Submitted!");
      setTimeout(() => {
        setVisible(false);
      }, [2000]);
    });

    socket.current.emit("getComments", { presentationId });

    socket.current.on("commentUpdate", ({ comments }) => {
      console.log("Received comments:", comments);
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

    socket.current.on("quizEnded", ({ message }) => {
      console.log(message);
      setQuizEnded(true);
      setCurrentQuestion([]);
      setQuestions([]);
      setCurrentIndex(null);
    })

    socket.current.on("error", ({ message }) => {
      console.log(message);
      setIsLive(false);
    });


  };
  const sendComment = (message) => {
    socket.current.emit("sendComment", { presentationId, userId, userName, message });
  }

  const submitVote = async (question, option) => {
    const questionId = question._id;
    const optionId = option._id;
    console.log("Option Id : ", optionId)

    socket.current.emit("handleVotes", { presentationId, userId, questionId, optionId, userName });

    if(question.designType === 'quiz'){
      const correctOptionInside = question.options.filter((s)=> s.answer !== false);
      const correctOptionId = correctOptionInside[0]._id;
      console.log("Correct option inside : ",correctOptionInside);
      console.log("Correct option inside Id : ",correctOptionId);
      setCorrectOption(correctOptionInside[0].text);
      setSelectedOption(option.text);
      setDetails(question.description); 

      if(correctOptionId == optionId){
        setCorrectAnsPopup(true);
      }else{
        setIncorrectAnsPopup(true);
      }
    }
  }



  // Navigation handlers for next/previous unattempted question
  const showNextUnattempted = () => {
    console.log("going to next")
    if (!questions.length) return;
    let idx = currentIndex + 1;
    while (idx < questions.length && questions[idx].attempted) {
      idx++;
    }
    if (idx < questions.length) {
      setCurrentIndex(idx);
      setCurrentQuestion(questions[idx]);
    }
    else {
      setVisible(true);
      setInfoForPopUp("No more Question Left !")
      setStatus(false);
      setTimeout(() => {
        setVisible(false);
      }, [2000])
    }
  };

  const showPrevUnattempted = () => {
    if (!questions.length) return;
    let idx = currentIndex - 1;



    while (idx >= 0 && questions[idx].attempted) {
      idx--;
    }
    if (idx >= 0) {
      setCurrentIndex(idx);
      setCurrentQuestion(questions[idx]);
    } else {
      setVisible(true);
      setStatus(false);
      setInfoForPopUp("Nothing top Go Back !")
      setTimeout(() => {
        setVisible(false);
      }, [2000])
    }
  };



  const handleEnterFullscreen = () => {
    const elem = containerRef.current;

    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err);
      });
    } else {
      console.warn("Fullscreen API is not supported in this browser.");
    }
  };


  useEffect(() => {
    socketHandler();
  }, [])

  const checkQuestion = () => {
    if (!questions.length) return;


    // if current question is attempted, auto-advance
    if (questions[currentIndex]?.attempted) {
      let idx = currentIndex + 1;
      while (idx < questions.length && questions[idx].attempted) {
        idx++;
      }
      if (idx < questions.length) {
        setCurrentIndex(idx);
        setCurrentQuestion(questions[idx]);
      }
      else {
        idx = 0;
        while (idx < questions.length && questions[idx].attempted) {
          idx++;
        }
        if (idx < questions.length) {
          setCurrentIndex(idx);
          setCurrentQuestion(questions[idx]);
        }
      }

    }
  }

  useEffect(() => {
    checkQuestion();
  }, [questions]);



  return (
    <div ref={containerRef} className='w-screen overflow-hidden h-screen relative flex'>
      <div className={`w-full h-full  flex flex-col gap-5 justify-center ${currentQuestion ? currentQuestion.designTemplate : ""} items-center bg-cover bg-center bg-no-repeat`}>

        {quizEnded && <QuizEndedPopUp />}

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
        <div className=''>
          <img src={logo} className='w-48' alt="" />
        </div>

        <div className='flex flex-col gap-6  w-full justify-center items-center '>
          {(() => {
            if (!isLive) {
              return (
                <div className='w-screen h-screen overflow-hidden  bg-BG-8  bg-no-repeat bg-cover bg-center '>
                  <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                    <div className="w-full flex justify-center items-center">
                      <img src={waitImage} className="h-23 animate-bounce" alt="Please wait" />
                    </div>
                    <div className="text-stone-700 text-xl sm:text-2xl md:text-3xl font-Outfit">Waiting for the Presenter to Start the Quiz!</div>
                    <div className="w-full flex justify-center items-center ">
                      <p className="text-xs md:text-sm lg:text-base text-center font-Outfit xs:w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-gray-900">If Presenter is Live and you are unable to see the question, please refresh the page once or check your Joining Link. If the Problem presists conta  ct us!</p>
                    </div>
                  </div>
                </div>
              )
            }
            // If there are no questions at all
            if (!questions.length) {
              return (
                <div className='w-full flex flex-col items-center justify-center py-20'>
                  <div className='bg-white rounded-xl shadow p-8 flex flex-col items-center'>
                    <h2 className='font-Outfit text-2xl text-stone-700 mb-2'>No questions available</h2>
                    <p className='text-stone-400 text-sm'>No questions have been loaded for this quiz.</p>
                  </div>
                </div>
              );
            }
            // If all questions are attempted
            if (questions.every(q => q.attempted)) {
              return (
                <div className='w-full flex flex-col items-center justify-center py-20'>
                  <div className='  p-8 flex flex-col items-center'>
                    <img src={thnks} alt="" className='w-30 animate-bounce pb-5 ' />
                    <h2 className='font-Montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-center text-stone-700 mb-2'>You have Completed the current Quiz!</h2>
                    <p className='text-gray-900 text-xs sm:text-md md:text-base font-Outfit w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] text-center '>Thanks for using Quizfy, how's your experience so Far please <span className='text-indigo-500'> Rate </span> us! You may Leave now or wait for Admin to restart the quiz again.</p>
                    <NavLink to="/App/Admin/Home" className='font-Outfit pt-5 text-indigo-500 font-black flex justify-center items-center gap-2 text-xs sm:text-md md:text-base cursor-pointer'>GO TO HOME <FiArrowRight /></NavLink>
                  </div>
                </div>
              );
            }
            // Otherwise, show current question
            if (currentQuestion) {
              return (
                <>
                  <div className='font-Outfit text-2xl'>
                    Q) {currentQuestion.question}
                  </div>

                  {
                    currentQuestion.Image != null ? 
                    <div className='w-full h-[300px] flex justify-center items-center'>
                      <img className='h-full' src={currentQuestion.Image} alt="" />
                    </div>
                    :
                    null
                  }

                  <div className={` ${currentQuestion.Image == null ? "flex w-[40%] flex-col justify-center items-center" : "grid grid-cols-2 w-[60%]" } gap-4 px-4 sm:px-8`}>
                    {(currentQuestion.options || []).map((option, index) => (
                      <div
                        key={option._id || index}
                        className={`h-16 ${currentQuestion.Image == null ? "w-[80%]": "w-[100%]"} cursor-pointer text-white font-Outfit flex items-center px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] bg-stone-900`}
                        onClick={() => submitVote(currentQuestion, option)}
                      >
                        <span className="w-full text-sm sm:text-base md:text-lg">
                          {option.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className='w-full mt- flex flex-col  justify-center items-center gap-4'>
                    <div className='w-full flex gap-4 justify-center items-center'>
                      <div>
                        <button
                          className='font-Outfit flex justify-center items-center gap-2 text-lg h-10 w-40 rounded-2xl bg-black hover:scale-110 transition-all ease-in-out duration-100 cursor-pointer text-white'
                          onClick={() => showPrevUnattempted()}
                        >
                          <FaChevronCircleLeft />Previous
                        </button>
                      </div>
                      <div>
                        <button
                          className='font-Outfit flex justify-center items-center gap-2 text-lg h-10 w-40 rounded-2xl bg-black hover:scale-110 transition-all ease-in-out duration-100 cursor-pointer text-white'
                          onClick={() => showNextUnattempted()}
                        >
                          Next <FaChevronCircleRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            // Fallback
            return null;
          })()}
        </div>
      </div>
      {/*-----------------------------------Floating Icons-----------------------------// */}
      <div
        className="fixed bottom-6 right-[155px] md:bottom-8 md:right-[155px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={handleEnterFullscreen}
      >
        <Expand color="white" />
      </div>

      <div
        className="fixed bottom-6 right-[96px] md:bottom-8 md:right-[96px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setShowInfo(!showInfo)}
      >
        <Info color="white" />
      </div>

      <div
        className="fixed bottom-6 right-10 md:bottom-8 md:right-10 cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setShowCommentSection(!showCommentSection)}
      >
        <MessageCircleMore color="white" />
      </div>

      {/* Comment Section */}
      <div className={`fixed left-[18%] sm:left-[55%] top-[23%] md:left-[60%] lg:top-[23%] lg:left-[72%] z-50 w-[90%] sm:w-[400px] max-w-[90%] transition-all ease-in-out duration-500 ${showCommentSection ? "opacity-100" : "opacity-0 pointer-events-none"}`} >

        <CommentPage commentList={commentList} sendComment={sendComment} onClose={() => setShowCommentSection(false)} isVisible={showCommentSection} />
      </div>
      <div className='fixed top-[86%] w-screen'>
        <div className={`w-full absolute  left-[40%] ${visible ? "translate-x-3 opacity-100 pointer-events-auto" : "translate-x-0 pointer-events-none opacity-0"}`}>
          <Slogan status={status} details={infoForPopUp} />
        </div>
      </div>

      {
        correctAnsPopup
        &&
        <div className='absolute top-0 left-0 '>
          <CorrectOptionPopup onClose={setCorrectAnsPopup} CorrectOption={correctOption} selectedOption={selectedOption} detail={detail}/>
        </div>
      }

      {
        incorrectAnsPopup
        &&
        <div className='absolute top-0 left-0 '>
          <IncorrectOptionPopup onClose={setIncorrectAnsPopup} CorrectOption={correctOption} selectedOption={selectedOption} detail={detail}/>
        </div>
      }

            <div className={`w-screen z-[99999] h-screen transition-all duration-300 ease-in-out absolute top-0 left-0 ${unauthorized ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <section className="w-full h-screen flex flex-col items-center justify-center bg-stone-950/90 font-Outfit px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 text-center max-w-md w-full">
            <FaExclamationTriangle className="text-yellow-500 text-6xl" />
            <h1 className="text-2xl font-semibold text-stone-800">
              Unauthorized Access
            </h1>
            <p className="text-stone-500 text-sm">
             You can't access it as a user because you are the admin of this quiz, if you still want to access it for testing purposes please login with another account who is not the admin of this presentation.
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

export default Live
