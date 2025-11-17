import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Expand, Info } from "lucide-react";
import logo from "../../assets/Images/Logo/LOGO.png";
import thnks from "../../assets/Images/Going live Images/thankYou.png";
import IncorrectOptionPopup from "./IncorrectOptionPopup";
import CorrectOptionPopup from "./CorrectOptionPopup";
import { useParams } from "react-router";
import { useAuth } from "../../Context/authContext";

const AI_Powered_Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const { userId } = useAuth();

  const { presentationId } = useParams();


  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const [showIncorrectPopup, setShowIncorrectPopup] = useState(false);

  const [popupData, setPopupData] = useState({
    isCorrect: false,
    selectedOption: "",
    correctOption: "",
    description: "",
    selectedOptionObj: null,
  });

  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [shouldShowConfetti, setShouldShowConfetti] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const containerRef = useRef(null);

  const allAttempted = useMemo(() => {
    return questions.length > 0 ? questions.every((q) => q.attempted?.attempted === true) : false;
  }, [questions]);

  const submitAnswer = useCallback(async (question, option) => {
    // Check if already attempted
    if (question.attempted?.attempted === true) {
      return;
    }

    const correctOption = question.options.find((opt) => opt.answer === true);
    const isCorrect = option.answer === true;

    // Optimistically update UI
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === question._id
          ? { 
              ...q, 
              attempted: { 
                attempted: true, 
                optionId: option._id, 
                timeStamp: new Date().toISOString() 
              }
            }
          : q
      )
    );

    // Send answer to backend
    try {
      const response = await fetch(
        `https://ai-based-quiz-builder-quizfy-backend.onrender.com/AIFeatures/SubmitAnswerForAIPoweredQuiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            presentationId,
            userId,
            questionId: question._id,
            selectedOptionId: option._id,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to submit answer to backend");
      }
      else{
        console.log("Answer submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }

    // Show appropriate popup based on answer correctness
    setPopupData({
      isCorrect,
      selectedOption: option.text,
      correctOption: correctOption.text,
      description: question.description,
      selectedOptionObj: option,
    });

    if (isCorrect) {
      setShouldShowConfetti(true);
      setShowCorrectPopup(true);
    } else {
      setShowIncorrectPopup(true);
    }
  }, [presentationId, userId]);

  //Function to show next question
  const showNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions.length]);

  //Function to show previous question
  const showPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Handler for viewing explanation
  const handleViewExplanation = useCallback(() => {
    if (!currentQuestion) return;
    
    const correctOption = currentQuestion.options.find(
      (opt) => opt.answer === true
    );
    const selectedOption = currentQuestion.options.find(
      (opt) => opt._id === currentQuestion.attempted?.optionId
    );
    const wasCorrect = selectedOption?.answer === true;

    setPopupData({
      isCorrect: wasCorrect,
      selectedOption: selectedOption?.text || "",
      correctOption: correctOption?.text || "",
      description: currentQuestion.description,
      selectedOptionObj: selectedOption,
    });

    setShouldShowConfetti(false);

    if (wasCorrect) {
      setShowCorrectPopup(true);
    } else {
      setShowIncorrectPopup(true);
    }
  }, [currentQuestion]);

  // Handlers for closing popups
  const handleCloseCorrectPopup = useCallback(() => {
    setShowCorrectPopup(false);
  }, []);

  const handleCloseIncorrectPopup = useCallback(() => {
    setShowIncorrectPopup(false);
  }, []);

  //Function to enter fullscreen mode
  const handleEnterFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err);
      });
    }
  }, []);

  //Function to fetch questions for the quiz
  const getQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ai-based-quiz-builder-quizfy-backend.onrender.com/AIFeatures/GetQuestionsForAIPoweredQuiz/${presentationId}/${userId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch questions");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Fetched questions:", data);

      // Extract questions array from response
      const fetchedQuestions = data.questions || [];
      setQuestions(fetchedQuestions);

      // Set initial question (first unattempted or first question)
      const initialIndex = fetchedQuestions.findIndex((q) => q.attempted?.attempted !== true);
      const startIndex = initialIndex !== -1 ? initialIndex : 0;
      setCurrentIndex(startIndex);
      setCurrentQuestion(fetchedQuestions[startIndex] || null);

      setLoading(false);
    } catch (e) {
      console.error("Error while fetching questions:", e);
      setLoading(false);
    }
  };

  useEffect(()=> {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (questions.length > 0) {
      const safeIndex = Math.min(Math.max(currentIndex, 0), questions.length - 1);
      setCurrentQuestion(questions[safeIndex]);
      
      // Show completion popup once when all attempted
      if (allAttempted && !showCompletionPopup) {
        setShowCompletionPopup(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIndex, allAttempted]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-white flex justify-center items-center fixed top-0 left-0 z-10 ">
        <div className="flex justify-center items-center flex-col gap-2">
          <div className="h-10 w-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="font-Outfit flex justify-center items-center">
            <h1>Building up your Quiz.</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-screen overflow-hidden h-screen relative flex"
    >
      <div className={`w-full h-full flex flex-col gap-5 justify-center ${currentQuestion?.designTemplate || 'bg-BG-3'} items-center bg-cover bg-center bg-no-repeat`}>
        {/* Logo */}
        <div>
          <img src={logo} className="w-48" alt="Logo" />
        </div>

        <div className="flex flex-col gap-6 w-full justify-center items-center">
          {/* Question Text */}
          <div className="font-Outfit w-full flex justify-center items-center pl-5 pr-5 text-center text-2xl">
            Q) {currentQuestion?.question || ""}
          </div>

          {/* Options */}
          <div className="flex w-[90%] sm:w-[80%] md:w-[40%] flex-col justify-center items-center gap-4 px-4 sm:px-8">
            {!(currentQuestion?.options?.length) && (
              <div className="text-stone-700 font-Outfit">
                No options available for this question.
              </div>
            )}

            {(currentQuestion?.options || []).map((option, index) => {
              const isSelected =
                currentQuestion.attempted?.attempted === true &&
                option._id === currentQuestion.attempted?.optionId;
              const isCorrect = option.answer === true;
              const isAttempted = currentQuestion.attempted?.attempted === true;

              let bgColor = "bg-stone-900";
              if (isAttempted) {
                if (isSelected) {
                  // Selected option: green if correct, red if incorrect
                  bgColor = isCorrect
                    ? "bg-green-400"
                    : "bg-red-600";
                } else if (isCorrect) {
                  // Show correct answer in green when user selected wrong answer
                  bgColor = "bg-green-400";
                } else {
                  // Other unselected options
                  bgColor = "bg-stone-700";
                }
              }

              return (
                <div
                  key={option._id || index}
                  className={`h-16 w-[80%] cursor-pointer text-white font-Outfit flex items-center px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] ${bgColor} ${
                    isAttempted && !isSelected ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isAttempted && submitAnswer(currentQuestion, option)}
                >
                  <span className="w-full text-sm sm:text-base md:text-lg">
                    {option.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Attempted Badge and View Explanation */}
          {currentQuestion?.attempted?.attempted === true && (
            <div className="flex gap-3 items-center flex-wrap justify-center">
              <div className="bg-indigo-400 text-white font-Outfit rounded-md px-4 py-2 shadow-sm">
                Already Attempted
              </div>
              <button
                onClick={handleViewExplanation}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-Outfit rounded-md px-4 py-2 shadow-sm transition-colors"
              >
                View Explanation
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="w-full mt-4 flex flex-col justify-center items-center gap-4">
            <div className="w-full flex gap-4 justify-center items-center">
              <div>
                <button
                  className="font-Outfit flex justify-center items-center gap-2 text-lg h-10 w-40 rounded-2xl bg-black hover:scale-110 transition-all ease-in-out duration-100 cursor-pointer text-white"
                  onClick={showPrevious}
                >
                  <FaChevronCircleLeft />Previous
                </button>
              </div>
              <div>
                <button
                  className="font-Outfit flex justify-center items-center gap-2 text-lg h-10 w-40 rounded-2xl bg-black hover:scale-110 transition-all ease-in-out duration-100 cursor-pointer text-white"
                  onClick={showNext}
                >
                  Next <FaChevronCircleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Icons */}
      <div
        className="fixed bottom-6 right-[96px] md:bottom-8 md:right-[96px] cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={handleEnterFullscreen}
      >
        <Expand color="white" />
      </div>

      <div
        className="fixed bottom-6 right-10 md:bottom-8 md:right-10 cursor-pointer p-3 border border-stone-300 rounded-full bg-stone-900 z-10 shadow-md"
        onClick={() => setShowInfo(!showInfo)}
      >
        <Info color="white" />
      </div>

      {/* Completion Popup */}
      {showCompletionPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md mx-4">
            <img src={thnks} alt="Thank You" className="w-32 h-32 object-contain animate-bounce" />
            <h2 className="text-2xl md:text-3xl font-Outfit font-bold text-center text-stone-800">
              You have Completed the Quiz!
            </h2>
            <p className="text-stone-600 text-sm text-center font-Outfit">
              Thanks for using Quizify! You can continue reviewing your answers or close this message.
            </p>
            <button
              onClick={() => setShowCompletionPopup(false)}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200 font-Outfit"
            >
              Continue Reviewing
            </button>
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="fixed font-Outfit top-20 right-10 bg-white rounded-lg shadow-lg p-4 w-80 z-50 border border-stone-200">
          <h3 className="font-Outfit font-semibold text-stone-800 mb-2">
            Quiz Information
          </h3>
          <p className="text-sm text-stone-600 font-Outfit">
            This is a AI Powered Quiz. Answer all questions by selecting an
            option. Once submitted, you cannot change your answer. Use
            Next/Previous to navigate between questions.
          </p>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md text-sm"
          >
            Close
          </button>
        </div>
      )}

      {/* Correct Answer Popup */}
      {showCorrectPopup && (
        <CorrectOptionPopup
          onClose={handleCloseCorrectPopup}
          selectedOption={
            popupData.selectedOptionObj || { text: popupData.selectedOption }
          }
          detail={popupData.description}
          showConfetti={shouldShowConfetti}
        />
      )}

      {/* Incorrect Answer Popup */}
      {showIncorrectPopup && (
        <IncorrectOptionPopup
          onClose={handleCloseIncorrectPopup}
          selectedOption={popupData.selectedOption}
          CorrectOption={popupData.correctOption}
          detail={popupData.description}
        />
      )}
    </div>
  );
};

export default AI_Powered_Quiz;
