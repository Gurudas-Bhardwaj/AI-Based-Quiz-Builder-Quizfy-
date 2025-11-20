import React, { useState } from "react";
import { Star, MessageSquareText, User2 } from "lucide-react";
import { useAuth } from "../../Context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

export default function ReviewPage() {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = userName.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName || !trimmedComment || rating === 0 || rating > 5) {
      toast.warn("Please fill all fields and give a rating between 1 and 5.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    console.log(rating)

    try {
      const response = await fetch("https://quizidy-backend.duckdns.org/other/giveReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userName: trimmedName, comment: trimmedComment, rating }),
      });

      const data = await response.json();
      console.log("Review submission response:", data);

      if (response.ok) {
        toast.success("✅ Review submitted successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });

        setTimeout(() => navigate("/"), 2200); // Navigate to home after toast
      } else {
        toast.error("Failed to submit review. Try again later.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (e) {
      console.error("Error submitting review:", e);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setUserName("");
    setComment("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Outfit] flex justify-center items-center px-4">
      <ToastContainer />
      <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 mb-3">
            <MessageSquareText className="text-indigo-500" size={26} />
          </div>
          <h1 className="text-3xl font-semibold text-gray-700">
            Share Your Review
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            We'd love to hear your thoughts and feedback.
          </p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              <User2
                size={16}
                className="inline-block mr-2 text-indigo-500 mb-0.5"
              />
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Comment Input */}
          <div>
            <label className="text-gray-600 text-sm font-medium mb-1 block">
              <MessageSquareText
                size={16}
                className="inline-block mr-2 text-indigo-500 mb-0.5"
              />
              Your Comment
            </label>
            <textarea
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 h-28 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="text-gray-600 text-sm font-medium mb-2 block">
              Rating
            </label>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    type="button"
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`transition-all ${
                        starValue <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-indigo-500 text-white text-sm rounded-lg font-medium hover:bg-indigo-600 transition shadow-sm"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
