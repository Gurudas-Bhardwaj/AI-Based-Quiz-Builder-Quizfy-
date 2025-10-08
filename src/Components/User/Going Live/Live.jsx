import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assests/Images/Logo/LOGO.png";
import { Expand, Info, MessageCircleMore } from "lucide-react";
import CommentSection from "../../App/Going Live Functionality/Admin Controlled/Pop ups/CommentSection";
import { useParams } from "react-router";
import { useAuth } from "../../../Context/authContext";
import { io } from "socket.io-client";
import waitImage from "../../../assests/Images/Going live Images/wait.png"
import QuizEndedPopUp from "./PopUp/QuizEnded";
import CorrectOptionPopup from "./PopUp/CorrectOptionPopup";
import IncorrectOptionPopup from "./PopUp/IncorrectOptionPopup"

const Live = () => {
  const { presentationId } = useParams();
  const { userId, userName } = useAuth();
  const [commentList, setCommentList] = useState([]);

  const [questionList, setQuestionList] = useState({});
  const [designTemplate, setDesignTemplate] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const [CorrectOption, setCorrectOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [detail, setDetail] = useState('');

  const containerRef = useRef(null);
  const socketRef = useRef(null);

  const [hasVoted, sethasVoted] = useState(false);

  const [quizEnded, setQuizEnded] = useState(false);

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);


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

  const socketConnection = () => {

    socketRef.current = io("https://ai-based-quiz-builder-quizfy-backend.onrender.com/adminControlledQuiz", {
      transports: ["websocket", "polling"]
    });

    socketRef.current.emit("joinQuizByUser", { presentationId, userId, userName });

    socketRef.current.on("newQuestionForUser", ({ question }) => {
      console.log("New question received:", question);
      sethasVoted(false);
      setQuestionList(question);

      if (question.designType == 'quiz') {
        setCorrectOption(
          question.options.find((option) => option.answer === true) || null
        );
        setDetail(question.description);        
      }
    });

    socketRef.current.on("alreadyVoted", () => {
      sethasVoted(true);

      localStorage.setItem("voted_question", questionList._id); //
      console.log("You have already voted for this question.");
    })

    socketRef.current.emit("getComments", { presentationId });

    socketRef.current.on("commentUpdate", ({ comments }) => {
      console.log("Received comments:", comments);
      setCommentList(comments || []);
    });

    socketRef.current.on("newComment", (comment) => {
      setCommentList(prev => [...prev, comment]);
      console.log("New comment received:", comment);
    });

    socketRef.current.on("quizEnded", () => {
      console.log("Quiz has ended.");
      setQuizEnded(true);
      setQuestionList({});
      sethasVoted(false);
      localStorage.removeItem("voted_question"); // clear vote on quiz end
    });

  }

  const handleVoteSubmission = (optionIndex, option) => {
    if (hasVoted || !socketRef.current) return;

    if (questionList.designType == 'quiz') {
      setSelectedOption(option.text);
      
      if(option._id == CorrectOption._id){
        setCorrect(true);
      }else{
        setIncorrect(true);
      }
    }

    if (socketRef.current) {
      socketRef.current.emit("submitVote", {
        presentationId,
        userId,
        userName,
        optionIndex,
      });

      sethasVoted(true);
      localStorage.setItem("voted_question", questionList._id); //
    }
  };

  useEffect(() => {
    socketConnection();
    return () => socketRef.current?.disconnect();
  }, [presentationId]);


  useEffect(() => {
    setDesignTemplate(questionList.designTemplate || "");

    if (questionList._id) {

      const hasVotedInLocal = localStorage.getItem(`voted_question`);

      if (!hasVotedInLocal) {
        sethasVoted(false);
      }
      else if (hasVotedInLocal === questionList._id) {
        sethasVoted(true);
      } else {
        localStorage.removeItem("voted_question"); // old vote, clear it
        sethasVoted(false);
      }

    }
  }, [questionList]);

  const sendComment = (message) => {
    socketRef.current.emit("sendComment", { presentationId, userId, userName, message });
  }

  return (
    <div ref={containerRef} className="relative w-screen min-h-screen flex flex-col justify-between">
      {/* Background Section */}
      <div className={`w-full flex-1 ${designTemplate} flex flex-col justify-center items-center bg-center bg-cover px-4 md:px-8`}>
        {/* Logo */}
        <div className="w-full flex justify-center mt-4">
          <img src={logo} className="w-28 md:w-40 lg:w-48" alt="Logo" />
        </div>

        {/* Question Section */}

        <div className="w-full flex flex-col flex-1/2 justify-center items-center">

          {
            hasVoted ?
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div>
                  <img src={waitImage} className="h-23 animate-bounce" alt="Please wait" />
                </div>
                <div className="w-[60%] text-center flex justify-center items-center mt-6">
                  <h1 className="text-stone-700 text-2xl font-Outfit">Your Response is being Submitted, Please wait for the Presenter to change the Question!</h1>
                </div>
              </div>
              :
              <div className="w-full">
                <div className="w-full h-full flex flex-col justify-center items-center">

                  <div className="w-full">
                    <div className="text-black font-Outfit text-2xl text-center">
                      <h1>
                        {questionList.question ||
                          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                            <div className="w-full flex justify-center items-center">
                              <img src={waitImage} className="h-23 animate-bounce" alt="Please wait" />
                            </div>
                            <div className="text-stone-700 text-2xl font-Outfit">Waiting for the Presenter to Start the Quiz!</div>
                            <div className="w-full flex justify-center items-center">
                              <p className="text-sm w-[60%] text-gray-700">If Presenter is Live and you are unable to see the question, please refresh the page once or contact us.</p>
                            </div>
                          </div>
                        }
                      </h1>
                    </div>
                    <div className="w-full flex justify-center items-center mt-6">
                      {questionList.Image == null ? (
                        <div className="w-full max-w-2xl flex flex-col justify-center items-center gap-4 px-4 sm:px-8">
                          {(questionList.options || []).map((option, index) => (
                            <div
                              key={option._id || index}
                              className="h-16 w-[80%] cursor-pointer text-white font-Outfit flex items-center px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] bg-stone-900"
                              onClick={() => handleVoteSubmission(index, option)}
                            >
                              <span className="w-full text-sm sm:text-base md:text-lg">
                                {option.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center gap-6 items-center w-full">
                          <div className="h-[300px] w-full flex justify-center items-center">
                            <img src={questionList.Image} className="w-full sm:w-auto sm:h-full" alt="" />
                          </div>
                          <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 place-content-center gap-4">
                            {(questionList.options || []).map((option, index) => (
                              <div
                                key={option._id || index}
                                className="h-16 w-[100%] cursor-pointer text-white font-Outfit flex items-center px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] bg-stone-900"
                                onClick={() => handleVoteSubmission(index, option)}
                              >
                                <span className="w-full text-sm sm:text-base md:text-lg">
                                  {option.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>




                </div>
              </div>
          }


        </div>

      </div>

      {/* Floating Icons */}
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
      <div
        className={`fixed left-[18%] sm:left-[55%] top-[23%] md:left-[60%] lg:top-[23%] lg:left-[72%] z-50 w-[90%] sm:w-[400px] max-w-[90%] transition-all ease-in-out duration-500 ${showCommentSection ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <CommentSection commentList={commentList} onClose={() => setShowCommentSection(false)} isVisible={showCommentSection} sendComment={sendComment} />
      </div>

      {incorrect && <div className={`absolute top-0 transition-all ease-in-out duration-100 left-0 z-[100]`}>
        <IncorrectOptionPopup selectedOption={selectedOption} CorrectOption={CorrectOption.text} detail={detail} onClose={setIncorrect} />
      </div>}
      {correct &&
        <div className={`absolute top-0 transition-all ease-in-out duration-100  left-0 z-[100]`}>
        <CorrectOptionPopup selectedOption={selectedOption} CorrectOption={CorrectOption.text} detail={detail} onClose={setCorrect}/>
      </div>}
    </div>  

  );
};

export default Live;
