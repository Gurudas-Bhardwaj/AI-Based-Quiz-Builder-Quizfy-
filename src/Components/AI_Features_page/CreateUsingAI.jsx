import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../../Context/authContext.jsx";
import { useNavigate } from "react-router";
import { TypeAnimation } from "react-type-animation";

window.questionMap = new Map(); // 🧠 Global HashMap for all questions

const CreateUsingAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingPresentation, setCreatingPresentation] = useState(false);
  const messagesEndRef = useRef(null);
  const { userId } = useAuth();

  const navigate = useNavigate();

  // 📦 Create Presentation
  const createPresentation = async (items) => {
    setCreatingPresentation(true);
    console.log("Creating presentation with items:", items);
    try {
      const response = await fetch(
        "https://quizidy-backend.duckdns.org/handleQuestions/createPresentation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userId,
            title: "Untitled Presentation",
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("Failed to create presentation:", data);
        throw new Error(data.message || "Failed to create presentation");
      }

      const presentationId = data.presentationId;

      for (const q of items) {
        const { designType, designTemplate, options, question, description } =
          q;
        const res = await fetch(
          "https://quizidy-backend.duckdns.org/handleQuestions/addQuestion",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: userId,
              presentationId,
              designType,
              designTemplate,
              options,
              question,
              description,
            }),
          }
        );

        const resData = await res.json();
        if (!res.ok) {
          console.log("Failed to add question:", resData);
          throw new Error(resData.message || "Failed to add question");
        }

        navigate(`/App/AdminPanel/Presentation/${presentationId}`);
      }
    } catch (e) {
      console.log("Error creating presentation:", e);
    }
  };

  // 🧠 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 💬 Send Message to AI
  const sendMessageToAI = async (userInput) => {
    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    setInput("");
    setLoading(true);

    // show temporary loading bubble
    setMessages((prev) => [...prev, { role: "bot", type: "loading" }]);

    try {
      const res = await fetch(
        "https://quizidy-backend.duckdns.org/AIFeatures/sendMessageToAI",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        }
      );

      const data = await res.json();
      let cleaned = data.reply;

      // remove markdown code fences
      if (typeof cleaned === "string" && cleaned.includes("```")) {
        cleaned = cleaned.replace(/```json|```/g, "").trim();
      }

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        console.error("JSON parse failed:", err);
        parsed = { status: "ERROR", reply: "⚠️Something went wrong!" };
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove loading bubble

        // 🟡 MULTIPLE QUESTIONS
        if (Array.isArray(parsed)) {
          const groupId = `G${Date.now()}`;
          parsed.forEach((q, index) => {
            const id = q.id || `Q${groupId}_${index}`;
            window.questionMap.set(id, q);
          });

          return [
            ...updated,
            {
              role: "bot",
              type: "question-group",
              groupId,
              questions: parsed,
            },
          ];
        }

        // 🟢 SINGLE QUESTION or STATUS BASED
        switch (parsed.status) {
          case "QUESTION": {
            const id = parsed.id || `Q${Date.now()}`;
            window.questionMap.set(id, parsed);
            return [
              ...updated,
              {
                role: "bot",
                type: "question-group",
                groupId: id,
                questions: [parsed],
              },
            ];
          }
          case "OK":
            return [
              ...updated,
              { role: "bot", type: "text", text: parsed.reply },
            ];
          case "ERROR":
            return [
              ...updated,
              { role: "bot", type: "error", text: parsed.reply },
            ];
          default:
            return [
              ...updated,
              {
                role: "bot",
                type: "text",
                text: "⚠️ Unexpected response format. Please try again.",
              },
            ];
        }
      });
    } catch (err) {
      console.error("Error communicating with AI:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            role: "bot",
            type: "error",
            text: "⚠️ Network error. Please try again later.",
          },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  // Normalize option
  const normalizeOption = (opt) => {
    if (!opt && opt !== "")
      return { text: "", color: "#000000", votes: 0, answer: false };
    if (typeof opt === "string")
      return { text: opt, color: "#000000", votes: 0, answer: false };
    return {
      text: opt.text ?? "",
      color: opt.color ?? "#000000",
      votes: opt.votes ?? 0,
      answer: !!opt.answer,
    };
  };

  // 🧩 Render Question Card
  const renderQuestionCard = (item, index) => {
    const designType = item.designType ?? "Quiz";
    const id = item.id || `Q${Date.now()}_${index}`;
    const template = item.designTemplate ?? "bg-BG-1";
    const question = item.question ?? "Untitled question";
    const description = item.description ?? "";
    const rawOptions = item.options ?? [];
    const normalizedOptions = rawOptions.map(normalizeOption);

    const correctFromFlag = normalizedOptions.find((o) => o.answer);
    const correctOptionText =
      (typeof item.correctOption === "string" && item.correctOption) ||
      (correctFromFlag && correctFromFlag.text) ||
      null;

    if (creatingPresentation)
      return (
        <div className="h-screen w-screen bg-white top-0 left-0 flex justify-center items-center absolute z-10">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-b-indigo-400 rounded-full animate-spin"></div>
            <div className="font-Outfit ">Building up the Presentation!</div>
          </div>
        </div>
      );

    return (
      <div
        key={id}
        className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-gray-800 mb-3"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-indigo-600 uppercase">
            {designType}
          </div>
          <div className="text-xs text-gray-400">{template}</div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-3">{question}</h3>

        <div className="grid grid-cols-1 gap-2">
          {normalizedOptions.map((opt, i) => {
            const isCorrect =
              (correctOptionText && opt.text === correctOptionText) ||
              opt.answer === true;
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isCorrect
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: opt.color || "#000000" }}
                  />
                  <div className="text-sm font-medium">
                    <span className="mr-2 font-semibold">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-500">
                    {opt.votes ?? 0} votes
                  </div>
                  {isCorrect && (
                    <div className="text-xs text-green-700 font-semibold">
                      ✔ Correct
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {description && (
          <p className="mt-3 text-sm text-gray-600">
            <strong>Explanation:</strong> {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <main className="w-full h-screen flex pt-2 font-[Outfit] bg-white">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col flex-1 pr-10 w-full rounded-3xl mx-8 shadow-inner text-gray-800 overflow-y-auto">
          <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <h1 className="text-5xl font-semibold bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text text-transparent mb-2">
                  AI ASSISTANT
                </h1>
                <p className="text-gray-600 text-sm">
                  Write a prompt and generate as many questions as you want!
                  <br />
                  Eg :{" "}
                  <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "Generate a easy level quiz question on topic animals.",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "Generate 5 medium level quiz question on topic Artificial Intelligence.",
                      1000,
                      "Generate 10 hard level quiz question on logical reasoning.",
                      1000,
                      "Generate 10 questions : 5 quiz on topic DSA, 3 poll question and 2 ranking questions.",
                      1000,
                    ]}
                    wrapper="span"
                    speed={60}
                    repeat={Infinity}
                  />
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                if (msg.type === "question-group") {
                  return (
                    <div key={msg.groupId} className="my-3">
                      {msg.questions.map((q, i) => renderQuestionCard(q, i))}
                      <div className="pt-2 relative flex justify-center">
                        <button
                          onClick={() => createPresentation(msg.questions)}
                          className="bg-indigo-400 cursor-pointer text-white pt-1 pb-1 pr-4 pl-4 rounded-2xl"
                        >
                          Create Presentation
                        </button>
                      </div>
                    </div>
                  );
                }

                // normal messages
                return (
                  <div
                    key={idx}
                    className={`my-3 flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.type === "loading" ? (
                        <div className="flex space-x-1 items-center">
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">{msg.text}</div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="w-full max-w-3xl mx-auto px-6 mt-auto">
            <div className="flex items-center w-full bg-white border border-indigo-200 rounded-2xl px-5 py-3 shadow-md focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Write your prompt here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim()) sendMessageToAI(input);
                }}
              />
              <button
                onClick={() => input.trim() && sendMessageToAI(input)}
                type="button"
                className="text-indigo-400 cursor-pointer hover:text-indigo-700 transition"
                disabled={loading}
              >
                <FiSend className="text-xl" />
              </button>
            </div>

            <div className="pt-3 pb-2 w-full flex justify-center flex-col items-center gap-2">
              <p className="flex text-center text-xs text-stone-700 font-Outfit">
                This is a customized chatbot that generates multiple choice
                questions based on you prompts. Limit is 10 questions per
                request
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Typing dots */}
      <style>{`
        .dot {
          width: 6px;
          height: 6px;
          background-color: #6366f1;
          border-radius: 50%;
          display: inline-block;
          animation: blink 1.4s infinite both;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%,80%,100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </main>
  );
};

export default CreateUsingAI;
