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
      const res = await fetch(`http://localhost:9000/handleQuestions/uploadImage`, {
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
      const response = await fetch("http://localhost:9000/handleQuestions/question/description",{
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({questionId, description: descriptionRef.current})
      })

      const data = await response.json();

      console.log(data);
    },2000)
  }

  const deleteImage = async()=>{
    const response = await fetch("http://localhost:9000/handleQuestions/deleteImage",{
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
    }

  }


  const updateCorrectOption = async(optionId)=>{
    const response = await fetch("http://localhost:9000/handleQuestions/question/correctOption",{
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
    <section className="w-full lg:w-[24%] h-full hidden sm:flex justify-center">
      <div className="w-full h-auto flex justify-center gap-2">
        <div className="bg-white pb-10 overflow-auto mt-6 border border-stone-300 rounded-2xl w-full hidden lg:flex flex-col gap-6">
          {/* Header */}
          <div className="flex pt-5 pl-3 pr-4 justify-between items-center">
            <h1 className="flex gap-2 items-center text-xl font-semibold font-Outfit text-indigo-400">
              <MdEdit /> Editing Section
            </h1>
          </div>

          {/* Question Editing */}
          <div className="px-4">
            <h2 className="font-Outfit font-semibold text-stone-600 mb-1">Edit Question:</h2>
            <input
              onChange={(e) => updateQuestion(e.target.value)}
              type="text"
              value={localQuestion}
              className="h-8 w-full border border-stone-300 bg-stone-200 focus:bg-white focus:border-indigo-400 font-Outfit pl-2 text-sm rounded-lg"
              placeholder="Enter your question"
            />

            <div className="h-1 w-full border-t border-stone-300 mt-5 mb-3"></div>

            {/* Options Section */}
            <h3 className="text-sm font-Outfit font-semibold mb-2 text-stone-600">Edit Options:</h3>
            <div className="flex flex-col gap-3">
              {localOptions.map((opt, index) => (
                <div key={opt._id} className="relative flex items-center gap-2">
                  {designType === 'quiz' && (
                    <input
                      type="radio"
                      className="absolute top-2 right-10 w-4 h-4 accent-indigo-400 cursor-pointer"
                      onClick={() => updateCorrectOption(opt._id)}
                      checked={opt.answer}
                    />
                  )}
                  <input
                    value={opt.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="h-8 w-[70%] border border-stone-300 bg-stone-200 focus:bg-white focus:border-indigo-400 font-Outfit pl-8 text-sm rounded-lg"
                  />

                  {/* Color Picker */}
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

                  {/* Delete Button */}
                  <div
                    onClick={() => deleteOption(opt._id)}
                    className="p-[6px] bg-stone-300 hover:bg-red-500 rounded-2xl cursor-pointer text-white"
                  >
                    <RxCross1 size={14} />
                  </div>
                </div>
              ))}

              {/* Add Option Button */}
              <div className="mt-3 flex justify-center">
                <button onClick={addOption} className="px-5 py-2 cursor-pointer bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl font-Outfit text-sm">
                  Add an Option
                </button>
              </div>
            </div>

            <div className="h-1 w-full border-t border-stone-300 mt-5 mb-3"></div>

            {/* Image Section */}
            <div className="mt-6">
              <h2 className="font-Outfit font-semibold text-stone-600 mb-1">Ask question By Image :</h2>
              <p className="font-Outfit text-sm text-black pt-2">You can provide an image also(optional):</p>
              <p className="font-Outfit text-sm text-black ">This'll make this question a Image Question</p>
              <p className="font-Outfit text-xs text-stone-600 pb-2">Maximum Size allowed : 10mb</p>

              {previewUrl ? (
                // Preview Mode with Change button
                <div className="w-full h-56 rounded-xl overflow-hidden border border-indigo-400 flex items-center justify-center relative">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    onClick={deleteImage}
                    className="absolute bottom-2 right-[90px] font-Outfit cursor-pointer bg-red-500 text-white px-3 py-1 rounded-xl text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleChangeImage}
                    className="absolute bottom-2 right-2 font-Outfit cursor-pointer bg-indigo-400 text-white px-3 py-1 rounded-xl text-sm"
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
                // Dropzone Mode
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-indigo-400 bg-indigo-400 text-white rounded-xl cursor-pointer transition hover:bg-indigo-500"
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
                    <p className="text-sm">
                      <span className="font-semibold font-Outfit">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs font-Outfit">JPG, PNG and JPEG supported</p>
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

              {/* File Info */}
              <p className="text-xs font-Outfit text-stone-600 mt-2">
                {fileName ? `Selected File: ${fileName}` : 'No file selected'}
              </p>

              {/* Upload Button */}
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={handleUploadImage}
                  className="mt-3 px-5 py-2 cursor-pointer bg-indigo-400 hover:bg-indigo-500 text-white rounded-xl font-Outfit text-sm"
                >
                  Upload Image
                </button>
              </div>
            </div>

            {
              designType == "quiz" &&
              <div className='w-full flex flex-col pt-3'>

                <div className="h-1 w-full border-t border-stone-300 mt-5 mb-3"></div>

                <div>
                  <h2 className="font-Outfit font-semibold text-stone-600 mb-1">Add Reasoning : </h2>
                </div>

                <div>
                  <h4 className="font-Outfit text-sm text-stone-600 mb-1 mt-2">You can tell user why a option is incorrect or correct.</h4>
                  <input
                    onChange={(e) => sendDescription(e)}
                    type="text"
                    value={Description}

                    className="h-8 w-full border border-stone-300 bg-stone-200 focus:bg-white focus:border-indigo-400 font-Outfit pl-2 text-sm rounded-lg"
                    placeholder="Enter your Reasoning"
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditingQuestion;
