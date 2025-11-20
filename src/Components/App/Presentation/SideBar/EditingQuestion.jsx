import React, { useState, useEffect, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

const EditingQuestion = ({
  localQuestion,
  localOptions,
  handleColorChange,
  handleOptionChange,
  updateQuestion,
  deleteOption,
  addOption,
  designType,
  questionId,
  previewUrl,
  setPreviewUrl,
  Description,
  setDescription,
  setStatus,
  setShowPopUp,
  setDetails, 
  setLocalOptions // initial image URL from backend if exists
}) => {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const fileInputRef = useRef(null);


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
    setFileName(file ? file.name : null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = () => {
    // Trigger hidden file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      setStatus(false);
      setDetails("Please select a file first!");
      setShowPopUp(true);

      setTimeout(() =>
        setShowPopUp(false),
        3000
      )
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("questionId", questionId);

    try {
      const res = await fetch(`https://quizidy-backend.duckdns.org/handleQuestions/uploadImage`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setStatus(true);
        setDetails("Image Uploaded Successfully!");
        setShowPopUp(true);
        setPreviewUrl(data.question.Image)
        setFileName(null);

        setTimeout(() =>
          setShowPopUp(false),
          3000
        )
      } else {
        setStatus(false);
        setDetails(data.Message);
        setShowPopUp(true);

        setTimeout(() =>
          setShowPopUp(false),
          3000
        )
      }
    } catch (err) {
      console.log(err)
      setStatus(true);
      setDetails("Unexpected error occured! Please try again later");
      setShowPopUp(true);

      setTimeout(() =>
        setShowPopUp(false),
        3000
      )
    }
  };
  const descriptionRef = useRef(null);
    useEffect(() => {
    descriptionRef.current = Description;
  }, [Description]);

  const descrRef = useRef(null);

  const sendDescription = (e)=>{
    const newDescription = e.target.value;
    setDescription(newDescription); // Update the parent state


    if(descrRef.current)
        clearTimeout(descrRef.current);

    descrRef.current = setTimeout(async()=>{
      console.log("send")
      const response = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/question/description",{
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({questionId, description: descriptionRef.current})
      })

      const data = await response.json();

      console.log(data);
      if(response.ok){
        setStatus(true);
        setDetails("Description Updated Successfully");
        setShowPopUp(true);

        setTimeout(()=>{
          setShowPopUp(false);
        },2000);
      }
    },2000);
  }

  const deleteImage = async()=>{
    const response = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/deleteImage",{
      method : "DELETE",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({questionId}),
    });

    const data = await response.json();

    console.log(data);
    if(response.ok){
      setPreviewUrl(null);
      setStatus(true);
      setDetails("Image Deleted Successfully");
      setShowPopUp(true);

      setTimeout(()=>{
        setShowPopUp(false);
      } ,2000);
    }

  }


  const updateCorrectOption = async(optionId)=>{
    const response = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/question/correctOption",{
      method : "POST", 
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({questionId, optionId})
    });

    const data = await response.json();
    console.log(data);

    if(response.ok){
      setLocalOptions(data.question.options);
      setStatus(true);
      setDetails("Successfully marked as corrected");
      setShowPopUp(true)
      
      setTimeout(()=>{
        
        setShowPopUp(false);
      }, 2000)
    }
    else{
        setStatus(false);
      setDetails(data.message);
      setShowPopUp(true)
      
      setTimeout(()=>{
        
        setShowPopUp(false);
      }, 2000)
    }
  }

  
  return (
  <section
  className="
    w-full md:bg-transparent
    fixed md:static
    left-1/2 md:left-0
    top-5 md:top-0
    transform md:transform-none
    -translate-x-1/2 md:translate-x-0
    z-50 md:z-auto
    flex justify-center
    md:w-[24%]
    md:h-auto
  "
>
  <div
    className="
      w-[90%] sm:w-[85%] md:w-full
      max-w-md md:max-w-none
      h-[85vh] md:h-[96%] md:mt-6
      bg-white/95 md:bg-white
      backdrop-blur-sm
      border border-stone-300
      shadow-lg md:shadow-none
      rounded-2xl
      flex flex-col
      gap-6
      overflow-y-auto
      p-4 md:p-0
    "
  >
    {/* Header */}
    <div className="flex pt-3 pl-2 pr-3 justify-between items-center sticky top-0 bg-white z-10 border-b border-stone-200">
      <h1 className="flex gap-2 items-center text-lg md:text-xl font-semibold font-Outfit text-indigo-400">
        <MdEdit /> Editing Section
      </h1>
    </div>

    {/* Body */}
    <div className="px-2 md:px-4 pb-6">
      {/* Question Editing */}
      <h2 className="font-Outfit font-semibold text-stone-600 mb-1 text-sm md:text-base">
        Edit Question:
      </h2>
      <input
        onChange={(e) => updateQuestion(e.target.value)}
        type="text"
        value={localQuestion}
        className="h-9 w-full border border-stone-300 bg-stone-100 focus:bg-white focus:border-indigo-400 font-Outfit pl-2 text-sm rounded-lg transition-all duration-200"
        placeholder="Enter your question"
      />

      <div className="h-px w-full bg-stone-200 my-4"></div>

      {/* Options Section */}
      <h3 className="text-sm font-Outfit font-semibold mb-2 text-stone-600">
        Edit Options:
      </h3>
      <div className="flex flex-col gap-3">
        {localOptions.map((opt, index) => (
          <div key={opt._id} className="relative flex items-center gap-2">
            {designType === "quiz" && (
              <input
                type="radio"
                className="absolute top-2 right-8 w-4 h-4 accent-indigo-400 cursor-pointer"
                onClick={() => updateCorrectOption(opt._id)}
                checked={opt.answer}
              />
            )}
            <input
              value={opt.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              type="text"
              placeholder={`Option ${index + 1}`}
              className="h-8 w-[70%] border border-stone-300 bg-stone-100 focus:bg-white focus:border-indigo-400 font-Outfit pl-8 text-sm rounded-lg transition-all"
            />
            <label
              className="absolute top-[6px] left-[6px] h-5 w-5 rounded-full border border-gray-300 cursor-pointer"
              style={{ backgroundColor: opt.color }}
            >
              <input
                type="color"
                value={opt.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="opacity-0 absolute w-full h-full cursor-pointer"
              />
            </label>
            <div
              onClick={() => deleteOption(opt._id)}
              className="p-[6px] bg-stone-300 hover:bg-red-500 rounded-2xl cursor-pointer text-white transition-all"
            >
              <RxCross1 size={14} />
            </div>
          </div>
        ))}
        <div className="mt-3 flex justify-center">
          <button
            onClick={addOption}
            className="px-5 py-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl font-Outfit text-sm transition-all"
          >
            Add an Option
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-stone-200 my-4"></div>

      {/* Image Section */}
      <div className="mt-6">
        <h2 className="font-Outfit font-semibold text-stone-600 mb-1">
          Ask question By Image :
        </h2>
        <p className="font-Outfit text-sm text-black pt-2">
          You can provide an image also (optional):
        </p>
        <p className="font-Outfit text-xs text-stone-600 pb-2">
          Max Size: 10MB (JPG/PNG/JPEG)
        </p>

        {/* Existing preview or upload */}
        {previewUrl ? (
          <div className="w-full h-56 rounded-xl overflow-hidden border border-indigo-400 flex items-center justify-center relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={deleteImage}
              className="absolute bottom-2 right-[90px] font-Outfit cursor-pointer bg-red-500 text-white px-3 py-1 rounded-xl text-xs sm:text-sm"
            >
              Delete
            </button>
            <button
              onClick={handleChangeImage}
              className="absolute bottom-2 right-2 font-Outfit cursor-pointer bg-indigo-400 text-white px-3 py-1 rounded-xl text-xs sm:text-sm"
            >
              Change
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-400 bg-indigo-400 text-white rounded-xl cursor-pointer transition hover:bg-indigo-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.2 5.02A4 4 0 0 0 5 13h2.2M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm font-Outfit">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs font-Outfit">JPG, PNG, JPEG supported</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        )}

        <p className="text-xs font-Outfit text-stone-600 mt-2">
          {fileName ? `Selected File: ${fileName}` : "No file selected"}
        </p>

        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleUploadImage}
            className="mt-3 px-5 py-2 cursor-pointer bg-indigo-400 hover:bg-indigo-500 text-white rounded-xl font-Outfit text-sm transition-all"
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Reasoning section */}
      {designType === "quiz" && (
        <div className="w-full flex flex-col pt-3">
          <div className="h-px w-full bg-stone-200 my-4"></div>
          <h2 className="font-Outfit font-semibold text-stone-600 mb-1">
            Add Reasoning:
          </h2>
          <h4 className="font-Outfit text-sm text-stone-600 mb-1 mt-2">
            Explain why an option is correct or incorrect.
          </h4>
          <input
            onChange={(e) => sendDescription(e)}
            type="text"
            value={Description}
            className="h-8 w-full border border-stone-300 bg-stone-100 focus:bg-white focus:border-indigo-400 font-Outfit pl-2 text-sm rounded-lg transition-all"
            placeholder="Enter your reasoning"
          />
        </div>
      )}
    </div>
  </div>
</section>

  );
};

export default EditingQuestion;
