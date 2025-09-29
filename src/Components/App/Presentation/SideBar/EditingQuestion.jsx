import React, { useState } from 'react';
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
  selectedCorrect,
  setSelectedCorrect,
  designType
}) => {
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : null);
  };

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
                      onClick={() => setSelectedCorrect(opt._id)}
                      checked={selectedCorrect === opt._id}
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
              <div onClick={addOption} className="mt-3 flex justify-center">
                <button className="px-5 py-1 bg-indigo-400 hover:bg-indigo-500 text-white rounded-2xl font-Outfit text-sm">
                  Add an Option
                </button>
              </div>
            </div>

            <div className="w-full mt-5 h-[1px] border-b border-stone-300"></div>
            <h2 className="font-Outfit font-semibold text-stone-600 mb-1 mt-3">Ask question By Image :</h2>
            <p className='font-Outfit text-sm text-black pt-2'>You ask question also by providing image(optional) :</p>
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
                  <span className="font-space font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="font-space text-xs">JPG, PNG, WEBP supported</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>

            {/* File Info */}
            <p className="text-xs pl-2 font-Outfit text-stone-600 mt-2">
              {fileName ? `Selected File: ${fileName}` : 'No file selected'}
            </p>



            {/* Description Field */}
            {
              designType == "quiz" &&
              <div className='w-full'>
                <div className="w-full mt-5 h-[1px] border-b border-stone-300"></div>
                <div className="mt-4 font-Outfit text-stone-600">
                  <h3 className="font-semibold text-base mb-1">Enter the Description:</h3>
                  <p className="text-sm mb-2">Tell the user why an option is correct.</p>
                  <input
                    type="text"
                    className="h-8 w-full bg-stone-200 border border-stone-300 focus:bg-white focus:border-indigo-400 rounded-2xl pl-3 text-sm"
                    placeholder="Write a brief explanation..."
                  />
                </div>

                {/* File Upload Section */}
                <div className="pt-6 font-Outfit text-stone-600">
                  <p className="text-sm font-semibold mb-2">Insert an Image (Optional):</p>
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
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs">JPG, PNG, WEBP supported</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>

                  {/* File Info */}
                  <p className="text-xs font-Outfit text-stone-600 mt-2">
                    {fileName ? `Selected File: ${fileName}` : 'No file selected'}
                  </p>
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
