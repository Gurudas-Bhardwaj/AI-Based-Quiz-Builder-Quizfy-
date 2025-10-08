import React, { useEffect, useRef, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { LuFileStack } from 'react-icons/lu'

import { ChartBarDecreasing, ChartBarIncreasing, ChartColumn, DonutIcon, PieChart } from 'lucide-react'
import { MdEdit, MdOutlinePoll } from 'react-icons/md'

import EditingQuestion from './SideBar/EditingQuestion.jsx'
import SlideEditing from './SideBar/SlideEditing.jsx'
import AddAdmin from './SideBar/AddAdmin.jsx'
import NewSlide from './Slide Functionality/NewSlide.jsx'
import { useAuth } from '../../../Context/authContext.jsx'
import Slogan from '../../Messages/Slogan.jsx'
import FloatingSwitch from './others/FloatingSwitch.jsx'
import Poll from './DesignType/Poll.jsx'
import Ranking from './DesignType/Ranking.jsx'
import Quiz from './DesignType/Quiz.jsx'
import DeleteConfirmPopup from './Popup/DeleteConfirmPopup.jsx'
import { SiQuizlet } from 'react-icons/si'
import Pie from './DesignType/Pie.jsx'
import Donut from './DesignType/Donut.jsx'
import { TbChartDonutFilled } from 'react-icons/tb'

const Layout = ({currentQuestion, allQuestion, presentation, questionId, setAllQuestion}) => {
    const navigate = useNavigate();


    

    const [selectedEditingSection, setSelectedEditingSection] = useState("none");

    const [showSlide, setShowSlide] = useState(false);
    const [localQuestion, setLocalQuestion] = useState(currentQuestion.question || []);
    const [localOptions, setLocalOptions] = useState(currentQuestion.options || []);
    const [presentationName, setPresentationName] = useState(presentation.title || "");

    const [designTemplate, setDesignTemplate] = useState(currentQuestion.designTemplate);
    const [designType, setDesignType] = useState(currentQuestion.designType || "");
    
    const [presentationId, setPresentationId] = useState(presentation._id);

    const [NewSlideAppreance, setNewSlideAppearence] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState('');

    const [showPopUp, setShowPopUp] = useState(false);
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState(false);
    const [listOfAdmin, setListOfAdmin] = useState(presentation.addedAdmin || []);

    const [deletePopupDisplay, setDeletePopDisp] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(currentQuestion.Image || "");
    const [description, setDescription] = useState(currentQuestion.description || "");


    let timeOutId = useRef(null);

    useEffect(() => {
        setLocalQuestion(currentQuestion.question || "")
        setLocalOptions(currentQuestion.options || []);
        setPresentationId(presentation._id || "");
        setSelectedQuestion(currentQuestion._id || "");
        setDesignTemplate(currentQuestion.designTemplate || "");
        setDesignType(currentQuestion.designType || "");
        setListOfAdmin(presentation.addedAdmin || []);
        setPreviewUrl(currentQuestion.Image || "");
        setDescription(currentQuestion.description || "");
        setPresentationName(presentation.title || "");
    }, [currentQuestion, selectedQuestion, presentation]);

    const mainSectionSelection = ()=>{
        switch(designType){
            case "poll":
                return <Poll localOptions={localOptions} localQuestion={localQuestion} designTemplate={designTemplate}/>
            case "ranking" : 
                return <Ranking localOptions={localOptions} localQuestion={localQuestion} designTemplate={designTemplate}/>
            case "quiz" : 
                return <Quiz localOptions={localOptions} localQuestion={localQuestion} designTemplate={designTemplate}/>
            case "pie" : 
                return <Pie localOptions={localOptions} localQuestion={localQuestion} designTemplate={designTemplate}/>
            case "donut" : 
                return <Donut localOptions={localOptions} localQuestion={localQuestion} designTemplate={designTemplate}/>
        }
    }



    const debounceTimer = useRef(null); // to store timeout id

    const handleColorChange = (index, newColor) => {
        // Update local UI instantly
        setLocalOptions(prev =>
            prev.map((opt, i) => i === index ? { ...opt, color: newColor } : opt)
        );

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer for API request
        debounceTimer.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/questions/${questionId}/options/${index}/color`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ color: newColor})
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setLocalOptions(data.options);
                    console.log("success");
                } else {
                    console.error(data.Message);
                }
            } catch (err) {
                console.error("Error updating color:", err);
            }
        }, 2000); // 2 seconds debounce
    };

    const debounceRef = useRef(null);
    const latestOptionsRef = useRef(localOptions); // Track latest state

    const handleOptionChange = (index, newText) => {
        // Update both state and ref
        const newOptions = localOptions.map((opt, i) =>
            i === index ? { ...opt, text: newText } : opt
        );

        setLocalOptions(newOptions);
        latestOptionsRef.current = newOptions;


        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/questions/${questionId}/options`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ options: latestOptionsRef.current }),
                });
                if (res.ok)
                    console.log("✅ Saved:", latestOptionsRef.current);

            } catch (error) {
                console.error("❌ Failed to save:", error);
            }
        }, 2000);
    };

    const debounceForQuestion = useRef(null);

    function updateQuestion(newQuestion) {
        setLocalQuestion(newQuestion);

        if (debounceForQuestion.current)
            clearTimeout(debounceForQuestion.current);

        debounceForQuestion.current = setTimeout(async () => {
            try {
                const response = await fetch(`https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/questions/${questionId}/editQuestion`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ question: newQuestion}),
                });

                const data = await response.json();
                if (response.ok) {
                    setLocalQuestion(data.question);
                    console.log("Successfull!")
                } else {
                    console.log("Error")
                }
            }
            catch (e) {
                console.log("error : ", e)
            }
        }, 2000)

    }


    const debounceForPres = useRef(null);
    const updatePresentationName = (newName) => {
        setPresentationName(newName);

        if (debounceForPres.current)
            clearTimeout(debounceForPres.current);

        debounceForPres.current = setTimeout(async () => {
            try {
                const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/presentation/editTitle", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ presentationId, presentationName: newName}),
                });
                const data = await response.json();
            }
            catch (e) {
                console.log("Error : ", e)
            }
        }, 2000)
    }

    const maxLength = 75;
    const truncateText = (text) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };


    const switchQuestions = async (questionID) => {
        setSelectedQuestion(questionID);
        setShowSlide(false);
        navigate(`/App/AdminPanel/Presentation/${presentationId}/${questionID}`);
    }

    const setIcon = (designType) => {
        switch (designType) {
            case "poll":
                return <MdOutlinePoll className='text-blue-400' size={16} />
            case "ranking":
                return <ChartBarDecreasing color='indigo' size={14} />
            case "quiz":
                return <SiQuizlet className='text-red-400' size={16} />
            case "pie":
                return <PieChart className='text-orange-400' size={16} />
            case "donut":
                return <TbChartDonutFilled className='text-orange-400 text-lg' />
        }
    }

    const [selectedCorrect, setSelectedCorrect] = useState(null);

    const deleteOption = async (optionId) => {
        const response = await fetch(`https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/question/${questionId}/deleteOption`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ optionId })
        })
        const data = await response.json();

        if (response.ok) {
            setShowPopUp(true);
            setDetails("Successfully Deleted!")
            setStatus(true);
            setLocalOptions(data.question.options || []);

            if (timeOutId.current)
                clearTimeout(timeOutId.current);

            timeOutId.current = setTimeout(() => {
                setShowPopUp(false);
            }, [2000]);
        }
        else {
            setShowPopUp(true)
            setStatus(false);
            setDetails(data.message);

            if (timeOutId.current)
                clearTimeout(timeOutId.current);

            timeOutId.current = setTimeout(() => {
                setShowPopUp(false);
            }, [2000]);
        }

    }

    const addOption = async () => {
        const response = await fetch(`https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/question/${questionId}/addOption`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();

        if (response.ok) {
            setLocalOptions(data.question.options);
            setShowPopUp(true)
            setStatus(true);
            setDetails("Successfully Added");

            if (timeOutId.current)
                clearTimeout(timeOutId.current);

            timeOutId.current = setTimeout(() => {
                setShowPopUp(false);
            }, [2000]);
        }
        else {

            setShowPopUp(true)
            setStatus(false);
            setDetails(data.message);

            if (timeOutId.current)
                clearTimeout(timeOutId.current);

            setTimeout(() => {
                setShowPopUp(false);
            }, [2000]);
        }
    }

    const debounceForChngeTemp = useRef(null);

    const changeDesignTemplate = (newDesignTemplate)=>{
        

        if(debounceForChngeTemp.current)
            clearTimeout(debounceForChngeTemp.current);

        debounceForChngeTemp.current = setTimeout(async()=>{
            const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/editDesignTemplate", {
                method : "POST", 
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({newDesignTemplate, questionId})
            });

            const data = await response.json();


            if(response.ok){
                setDesignTemplate(data.question.designTemplate);
            }
        },2000);
    }

    const addAdminFun = async(userGmail)=>{
        if(!userGmail)
            return;

        const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/AddAdmin", {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({userGmail, presentationId})
        });
        const data = await response.json();

        if(response.ok){
            setListOfAdmin(data.presentation.addedAdmin);
            setDetails(data.message);
            setStatus(true);
            setShowPopUp(true);

            setTimeout(()=>{
                setShowPopUp(false);
            },2000)
        }
        else{
            setDetails(data.message);
            setStatus(false);
            setShowPopUp(true);

            setTimeout(()=>{
                setShowPopUp(false);
            },3000)
        }
    }
    

    const deleteAddedAdmin = async(userId, userName)=>{
        const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/handleQuestions/DeleteAddedAdmin", {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({userId, presentationId})
        })

        const data = await response.json();

        console.log(data);
                if(response.ok){
            setListOfAdmin(data.presentation.addedAdmin);
            setDetails(data.message);
            setStatus(true);
            setShowPopUp(true);

            setTimeout(()=>{
                setShowPopUp(false);
            },2000)
        }
        else{
            setDetails(data.message);
            setStatus(false);
            setShowPopUp(true);

            setTimeout(()=>{
                setShowPopUp(false);
            },3000)
        }
    }

    const sideBarChoice = ()=>{
        switch(selectedEditingSection){
            case "editQuestions" : 
                return <EditingQuestion setSelectedCorrect={setSelectedCorrect} selectedCorrect={selectedCorrect} localQuestion={localQuestion} localOptions={localOptions} handleColorChange={handleColorChange} handleOptionChange={handleOptionChange} updateQuestion={updateQuestion} deleteOption={deleteOption} addOption={addOption} designType={designType} questionId={questionId} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} setStatus={setStatus} setDetails={setDetails} setShowPopUp={setShowPopUp} Description={description} setDescription={setDescription} setLocalOptions={setLocalOptions}/>
            case "slideEditing" : 
                return <SlideEditing updatePresentationName={updatePresentationName} presentationName={presentationName} deletePopUp={()=>setDeletePopDisp(true)} designTemplate={designTemplate} changeDesignTemplate={changeDesignTemplate}/>
            case "addAdmin" : 
                return <AddAdmin AddAdminFun={addAdminFun} listOfAdmin={listOfAdmin} deleteAddedAdmin={deleteAddedAdmin}/>
            default: 
                return <div></div>
        }
    }

    return (
        <div className='relative h-screen'>
            <div className='bg-gray-200 relative h-[530px] w-screen  overflow-hidden overflow-y-hidden'>
                <div className='absolute top-5 left-4  bg-black pt-1 pb-1 pr-4 pl-4  rounded-3xl flex lg:hidden justify-center items-center gap-2' onClick={() => setShowSlide(!showSlide)}>
                    <LuFileStack className='text-white flex lg:hidden' />
                    <p className='text-white font-Outfit'>1/1</p>
                </div>

                    {/* FLoating  Menu appear in mobile*/}
                <div className={`fixed top-0 left-0 h-full z-[999] pt-6 bg-white transition-all duration-500 ease-in-out transform ${showSlide ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} flex justify-center w-[40%]`}>
                    <div className='fixed md:hidden z-[99999] left-[105%] border p-2 bg-black rounded-full ' onClick={() => setShowSlide(!showSlide)}>
                        <RxCross2 className='text-white text-sm' />
                    </div>

                    <div className='flex  pr-5 pl-2 flex-col gap-4 items-center w-full'>
                        <button onClick={() => setNewSlideAppearence(!NewSlideAppreance)} className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl'>
                            <GoPlus />
                            <p>New Slide</p>
                        </button>
                        <div className='h-screen flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {allQuestion.map((key, index) => (
                                <div
                                    onClick={() => switchQuestions(key._id)}
                                    key={key._id}
                                    className='w-full h-20 flex justify-center gap-1 cursor-pointer'
                                >
                                    <p className='font-Outfit text-xs pt-2'>{index + 1}</p>
                                    <div
                                        className={`w-full h-20 border-2 flex justify-center flex-col items-center ${selectedQuestion === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
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

                {/* appear in laptop and big display */}
                <div className='flex w-full h-full justify-center '>
                    <section className=' w-0 lg:w-[12%]  pt-6 hidden lg:flex justify-center'>
                        <div className='flex  flex-col gap-4 items-center w-full'>
                            <button onClick={() => setNewSlideAppearence(!NewSlideAppreance)} className='flex justify-center text-[13px] gap-1 pt-2 pb-2 pr-6 pl-6 bg-stone-900 text-white items-center font-Outfit rounded-2xl cursor-pointer'>
                                <GoPlus />
                                New Slide
                            </button>
                            <div className=' flex flex-col gap-2 w-full overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {allQuestion.map((key, index) => (
                                    <div
                                        onClick={() => switchQuestions(key._id)}
                                        key={key._id}
                                        className='w-full h-20 flex justify-center gap-1 cursor-pointer'
                                    >
                                        <p className='font-Outfit w-[7%] flex justify-center  text-xs pt-2'>{index + 1}</p>
                                        <div className={`w-[93%] h-20 border-2 flex justify-center flex-col items-center ${selectedQuestion === key._id ? 'border-indigo-300' : 'border-gray-200'} rounded-xl bg-center ${key.designTemplate} bg-cover gap-1`}>
                                            {
                                                setIcon(key.designType)
                                            }
                                            <h1 className='text-[8px] text-center font-Outfit'>{truncateText(key.question)}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>

                    {
                        mainSectionSelection()
                    }


                    {
                        sideBarChoice()
                    }

                </div>
            </div>

            <div
                className={`absolute top-[70px] left-3 justify-center items-center transition-all duration-500 ease-out
                    ${NewSlideAppreance ? 'pointer-events-auto' : 'pointer-events-none'}
  `}
            >
                <NewSlide
                    isVisible={NewSlideAppreance}
                    onClose={() => setNewSlideAppearence(false)}
                    presentationId={presentationId}
                />
            </div>

            <div className={`absolute bottom-[15%] transition-all duration-500 ease-in-out  w-screen z-[100] flex ${showPopUp ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none opacity-0 translate-y-3"} justify-center items-center`}>
                <Slogan status={status} details={details} />
            </div>

            <div className='absolute w-screen left-0 bottom-[5%]'>
                    <FloatingSwitch editingSection={selectedEditingSection} setEditingSection={setSelectedEditingSection}/>
            </div>

            <div className={`absolute transition-all duration-300 ease-in-out ${deletePopupDisplay ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  w-screen h-screen top-0 left-0`}>
                    <DeleteConfirmPopup presenetationId={presentationId} setDetails={setDetails} setStatus={setStatus} setDisplay={setShowPopUp} setQuestion={setAllQuestion} questionId={questionId} onClose={()=>setDeletePopDisp(false)}/>
            </div>
        </div>
    )
}

export default Layout
