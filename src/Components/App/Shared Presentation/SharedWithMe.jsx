import React, { useEffect, useMemo, useState } from 'react'
import { FaSearch, FaPlay } from 'react-icons/fa'
import empty from '../../../assets/Images/Logo/empty.png'
import { useNavigate } from 'react-router';
import Bell from "../../../assets/Images/HomePageImages/bell.png";
import userone from "../../../assets/Images/HomePageImages/user_one.png";
import NotificationCom from '../Home/NotificationCom';
import ProfileSection from '../Home/ProfileSection';
import AccountSettingPOPUP from '../Home/AccountSettingPOPUP';
import { useAuth } from '../../../Context/authContext';

const SharedWithMe = () => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [presentation, setPresentations] = useState([]);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const [state, setState] = useState(false);
    const [NotificationState, setNotificationState] = useState(false);
    const [settingState, setSettingState] = useState(false);

    // Fetch shared presentations from backend
    const findPresentation = async () => {
        try {
            const response = await fetch("https://quizidy-backend.duckdns.org/handleQuestions/getSharedPresentations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            if (response.ok) {
                setPresentations(data.presentations);
            }
            else {
                setPresentations([]);
                console.error("Failed to fetch shared presentations");
            }
        }
        catch (e) {
            console.error("Error fetching shared presentations:", e);
        }
    }

    useEffect(() => {
        findPresentation();
    }, []);

    // Debounce query input
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(handler);
    }, [query]);

    // Filter presentations based on debounced query
    const filteredPresentations = useMemo(() => {
        if (!debouncedQuery.trim()) return presentation;
        const q = debouncedQuery.trim().toLowerCase();
        return presentation.filter(p =>
            p.title.toLowerCase().includes(q) ||
            (p.owner && p.owner.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
    }, [debouncedQuery, presentation]);

    return (
        <main className="w-full min-h-screen bg-stone-50 font-Outfit">
            <div className="max-w-6xl mx-auto px-6 py-7">

                {/* Navbar */}
                <div className="w-full flex justify-end pr-2 items-center">
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

                {/* Header */}
                <header className="flex mt-8 flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-stone-800">Shared Presentations</h1>
                        <p className="text-sm text-stone-400 mt-1">
                            Presentations shared with you by others.
                        </p>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center w-full md:w-1/2 bg-white border border-stone-200 rounded-lg px-3 py-2">
                        <FaSearch className="text-stone-400 mr-3 text-sm" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search shared presentations..."
                            className="w-full outline-none text-sm text-stone-400 bg-transparent focus:text-black focus:border-black"
                            aria-label="Search shared presentations"
                        />
                    </div>
                </div>

                {/* Presentation Grid */}
                {filteredPresentations.length === 0 ? (
                    <div className="bg-white border border-stone-200 rounded-xl p-10 flex flex-col items-center justify-center">
                        <img src={empty} alt="empty" className="h-28 mb-4" />
                        <h2 className="text-lg font-medium text-stone-700">Nothing shared yet</h2>
                        <p className="text-sm text-stone-400 mt-2">
                            Presentations shared with you will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPresentations.map((p) => (
                            <article
                                key={p._id}
                                className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-200 transition-colors"
                            >
                                <div
                                    className="flex items-start gap-4 cursor-pointer"
                                    onClick={() => navigate(`/App/AdminPanel/Presentation/${p._id}`)}
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 border border-indigo-100 rounded-md">
                                        <FaPlay className="text-indigo-500 text-xs" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-medium text-stone-800">{p.title}</h3>
                                        <p className="text-xs text-stone-400">
                                            Shared by {p.owner} • {new Date(p.createdAt).toLocaleDateString()}
                                        </p>
                                        {p.description && (
                                            <p className="text-sm text-stone-500 mt-1 line-clamp-2">{p.description}</p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Account Settings Popup */}
            <div className={`w-screen bg-black/70 absolute transition-all ease-in-out duration-300 top-0 left-0 h-screen flex justify-center items-center ${settingState ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0 '}`}>
                <AccountSettingPOPUP onClose={() => setSettingState(false)} />
            </div>
        </main>
    );
};

export default SharedWithMe;
