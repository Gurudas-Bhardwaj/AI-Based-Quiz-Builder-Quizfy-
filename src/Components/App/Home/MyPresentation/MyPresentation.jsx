import React, { useEffect, useState } from "react";
import Bell from "../../../../assets/Images/HomePageImages/bell.png";
import NotificationCom from "../NotificationCom";
import ProfileSection from "../ProfileSection";
import userone from "../../../../assets/Images/HomePageImages/user_one.png";
import empty from "../../../../assets/Images/Logo/empty.png";
import { FaPlay, FaSearch } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useAuth } from "../../../../Context/authContext";
import { useNavigate } from "react-router";
import AccountSettingPOPUP from "../AccountSettingPOPUP";

const MyPresentation = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState(false);
  const [NotificationState, setNotificationState] = useState(false);
  const [settingState, setSettingState] = useState(false);
  const [presentations, setPresentations] = useState([]);
  const [filteredPresentations, setFilteredPresentations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPresentations = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://quizidy-backend.duckdns.org/handleQuestions/GetPresentations?page=1&limit=10`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPresentations(data.presentations);
        setFilteredPresentations(data.presentations);
      }
    } catch (error) {
      console.error("Error fetching presentations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  // ✅ Debounced Search Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredPresentations(presentations);
      } else {
        const filtered = presentations.filter((p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPresentations(filtered);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm, presentations]);

  const navigateToPres = (id) => {
    navigate(`/App/AdminPanel/Presentation/${id}`);
  };

  const deletePresentation = async (id) => {
    try {
      const response = await fetch(
        "https://quizidy-backend.duckdns.org/handleQuestions/DeletePresenation",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ presentationId: id }),
        }
      );

      if (response.ok) {
        setPresentations((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (e) {
      console.error("Error deleting presentation:", e);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <main className="w-full min-h-screen bg-stone-50 text-gray-800 font-[Outfit] overflow-hidden">

      {/* Navbar */}
      <div className="w-full flex justify-end mt-7 pr-7 items-center">
        <div className="flex h-full mr-5 items-center gap-3">
          <div className="relative">
            <div
              onClick={() => {
                setNotificationState(!NotificationState);
                setState(false);
              }}
              className="h-8 w-8 rounded-full flex justify-center items-center bg-stone-200 hover:bg-stone-300 cursor-pointer transition"
            >
              <img src={Bell} className="w-3" alt="Bell" />
            </div>
            <NotificationCom display={NotificationState} />
          </div>

          <div className="relative">
            <div
              className="h-8 w-8 bg-indigo-300 hover:bg-indigo-400 transition cursor-pointer rounded-full flex justify-center items-center"
              onClick={() => {
                setState(!state);
                setNotificationState(false);
              }}
            >
              <img src={userone} className="w-4" alt="User" />
            </div>
            <ProfileSection
              display={state}
              onClose={() => setState(false)}
              setSettingState={setSettingState}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col pl-6 pr-6 sm:pl-10 sm:pr-10 pt-10">
        {/* Heading */}
        <h1 className="text-3xl font-semibold font-Outfit text-gray-800 tracking-tight mb-2">
          My Presentations
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          All your saved presentations at a glance
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-8 w-full sm:w-[60%] md:w-[45%]">
          <input
            type="text"
            className="h-9 w-full text-sm pl-3 rounded-[7px] font-Outfit bg-stone-200 text-[11px] placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Search Presentations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Presentations */}
        {filteredPresentations.length === 0 ? (
          <div className="font-Outfit h-full flex flex-col gap-3 text-2xl mt-20 w-full justify-center items-center">
            <img src={empty} alt="Empty" className="h-28 opacity-90" />
            <h1 className="inline text-gray-500 text-lg">
              No Presentations Found
            </h1>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 pb-10">
            {filteredPresentations.map((p) => (
              <div
                key={p._id}
                className="group relative border border-stone-200 bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:border-indigo-300 transition-colors duration-200"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigateToPres(p._id)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaPlay className="text-[8px] text-indigo-600" />
                    </div>
                    <h2 className="text-base font-medium text-gray-800 truncate">
                      {p.title}
                    </h2>
                  </div>

                  <div className="flex flex-col text-sm text-gray-500">
                    <span>Created by: Me</span>
                    <span>
                      {new Date(p.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  onClick={() => deletePresentation(p._id)}
                >
                  <MdDeleteSweep size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`w-screen bg-black/70 absolute transition-all ease-in-out duration-300 top-0 left-0 h-screen flex justify-center items-center ${settingState ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0 '}`}>
        <AccountSettingPOPUP onClose={() => setSettingState(false)} />
      </div>
    </main>
  );
};

export default MyPresentation;
