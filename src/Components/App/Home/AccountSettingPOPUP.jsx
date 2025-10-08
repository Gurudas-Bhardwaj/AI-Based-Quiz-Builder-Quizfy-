import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { IoIosArrowDown } from 'react-icons/io'
import user from "../../../assets/Images/HomePageImages/user_one.png"
import { RxCrossCircled } from 'react-icons/rx'
import ConfirmDeletePopUp from './ConfirmDeletePopUp'
import Slogan from '../../Messages/Slogan'
import { useAuth } from "../../../Context/authContext.jsx"

const AccountSettingPOPUP = ({ onClose }) => {

    const [displayDeleteDailog, setDisplayDeleteDailog] = useState(false);
    const [noOfCharacter, setNoOfCharacter] = useState(50);
    const [name, setName] = useState("");


    const { refreshToken, userName } = useAuth();

    const [message, setMessage] = useState("");
    const [Status, setStatus] = useState(false);
    const [display, setDisplay] = useState(false);

    const [CurrentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [updateNameDisplay, setUpdateNameDisplay] = useState(false);
    const [updatePasswordDisplay, setUpdatePasswordDisplay] = useState(false);

    const [email, setEmail] = useState("");

    const handleLogout = async () => {

        try {
            // Call backend to clear refresh token
            await fetch('https://ai-based-quiz-builder-quizfy-backend.onrender.com/user/Logout', {
                method: 'POST',
                credentials: 'include', //  sending the cookie
            });

            // Remove access token from localStorage
            localStorage.removeItem('accessToken');

            // Redirect to login page
            window.location.href = '/login';

        } catch (err) {
            console.error('Logout failed', err);
        }

    }

    function checkingLen(e) {
        const inputValue = e.target.value;

        if (inputValue.length <= 50) {
            setName(inputValue);
            setNoOfCharacter(50 - inputValue.length);
        }
    }

    const updateName = async () => {

        const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/user/UpdateName", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.Message);
            setDisplay(true);
            setStatus(false);
            setTimeout(() => {
                setDisplay(false);
            }, 2000)

            console.log(data);
            return;
        }

        localStorage.setItem("accessToken", data.accessToken);
        await refreshToken();
        setMessage(data.Message);
        setStatus(true);
        setDisplay(true);
        setUpdateNameDisplay(!updateNameDisplay);
        setName("");
        setTimeout(() => {
            setDisplay(false);
        }, 3000)

    }

    const updatePassword = async () => {
        const response = await fetch("https://ai-based-quiz-builder-quizfy-backend.onrender.com/user/UpdatePassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ currentPassword: CurrentPassword, newPassword, confirmPassword })
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.Message);
            setDisplay(true);
            setStatus(false);
            setTimeout(() => {
                setDisplay(false);
            }, 2000)

            console.log(data);
            return;
        }
        setMessage(data.Message);
        setStatus(true);
        setDisplay(true);
        setUpdatePasswordDisplay(!updatePasswordDisplay);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
            setDisplay(false);
        }, 3000)
    }

    return (
        <div className='fixed inset-0 h-screen z-[100] flex items-center justify-center'>
            <div className='bg-white w-[95%] h-[600px] md:w-3/4 lg:w-2/3 rounded-2xl shadow-xl overflow-hidden font-Outfit'>
                {/* Header */}
                <div className='flex items-center justify-between px-6 py-4 border-b border-stone-100'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200'>
                            <img src={user} alt='avatar' className='w-6 h-6' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold text-stone-800'>Account settings</h2>
                            <p className='text-xs text-stone-400'>Manage your profile, password and security</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        
                        <button onClick={onClose} aria-label='Close settings' className='p-2 rounded-md hover:bg-stone-200 cursor-pointer'>
                            <ImCross className='text-stone-700' />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Left: profile summary */}
                    <div className='col-span-1 flex flex-col gap-4'>
                        <div className='bg-white border border-stone-100 rounded-lg p-4 shadow-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100'>
                                    <img src={user} alt='avatar' className='w-8 h-8' />
                                </div>
                                <div className='cursor-pointer'>
                                    <div className='text-sm font-medium text-stone-800'>{userName}</div>
                                    <div className='text-xs text-stone-400'>@{userName.split(' ')[0]?.toLowerCase()}</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white border border-stone-100 rounded-lg p-4 shadow-sm text-sm text-stone-600'>
                            <div className='mb-2 font-medium text-stone-800'>Account</div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center justify-between'>
                                    <span>Email</span>
                                    <span className='text-xs bg-stone-100 px-2 py-1 rounded-full text-stone-500'>Unverified</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span>Member since</span>
                                    <span className='text-xs text-stone-500'>—</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: editable fields */}
                    <div className='col-span-2 flex h-[500px] pb-8 overflow-auto flex-col gap-4'>
                        {/* Name */}
                        <div className='bg-white border border-stone-100 rounded-lg p-4 shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <div className='text-sm font-medium text-stone-800'>Display name</div>
                                    <div className='text-xs text-stone-400'>Your public display name</div>
                                </div>
                                <div className='text-xs text-stone-400'>Chars left: {noOfCharacter}</div>
                            </div>
                            <div className='mt-3 flex gap-3 items-center'>
                                <input
                                    value={name}
                                    onChange={checkingLen}
                                    placeholder='Enter display name'
                                    className='flex-1 px-3 py-2 border border-stone-200 rounded-md focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 text-sm bg-stone-100 focus:bg-white transition-colors duration-150 cursor-text'
                                    aria-label='Display name'
                                />
                                <button
                                    onClick={updateName}
                                    className={`cursor-pointer px-4 py-2 rounded-md text-sm transition-colors duration-150 ${name.trim().length ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-stone-200 text-stone-600 cursor-not-allowed'}`}
                                    aria-disabled={!name.trim().length}
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Password */}
                        <div className='bg-white border border-stone-100 rounded-lg p-4 shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <div className='text-sm font-medium text-stone-800'>Change password</div>
                                    <div className='text-xs text-stone-400'>Keep your account secure</div>
                                </div>
                            </div>
                            <div className='mt-3 grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <input value={CurrentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Current password' className='px-3 py-2 border border-stone-200 rounded-md bg-stone-100 text-sm focus:bg-white focus:border-indigo-400 transition-colors duration-150' aria-label='Current password' />
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' className='px-3 py-2 border border-stone-200 rounded-md bg-stone-100 text-sm focus:bg-white focus:border-indigo-400 transition-colors duration-150' aria-label='New password' />
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' className='px-3 py-2 border border-stone-200 rounded-md bg-stone-100 text-sm focus:bg-white focus:border-indigo-400 transition-colors duration-150' aria-label='Confirm password' />
                            </div>
                            <div className='mt-3'>
                                <button
                                    onClick={updatePassword}
                                    className={`cursor-pointer px-4 py-2 rounded-md text-sm transition-colors duration-150 ${newPassword && confirmPassword && CurrentPassword ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-stone-200 text-stone-600 cursor-not-allowed'}`}
                                    aria-disabled={!(newPassword && confirmPassword && CurrentPassword)}
                                >
                                    Update password
                                </button>
                            </div>
                        </div>
                        <div className='bg-white border border-stone-100 rounded-lg p-4 shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <div className='text-sm font-medium text-stone-800'>Verify Your Account</div>
                                    <div className='text-xs text-stone-400'>By Verifying, you can later recover your account.</div>
                                </div>
                            </div>
                            <div className='mt-3 grid grid-cols-1 pr-10'>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter you Email' className='px-3 py-2 border border-stone-200 rounded-md bg-stone-100 text-sm focus:bg-white focus:border-indigo-400 transition-colors duration-150' aria-label='Email' />
                            </div>
                            <div className='mt-3'>
                                <button
                                    className={`cursor-pointer px-4 py-2 rounded-md text-sm transition-colors duration-150 ${email.includes('@gmail.com' || '@email.com') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-stone-200 text-stone-600 cursor-not-allowed'}`}
                                    aria-disabled={!(email)}
                                >
                                    Send verification email
                                </button>
                            </div>
                        </div>

                        {/* Danger / actions */}
                        <div className='flex gap-3 items-center'>
                            <button onClick={() => setDisplayDeleteDailog(true)} className='px-4 py-2 bg-red-600 text-white rounded-md text-sm cursor-pointer'>Delete account</button>
                            <button onClick={handleLogout} className='px-4 py-2 bg-indigo-400 text-white rounded-md text-sm cursor-pointer'>Log out</button>
                        </div>
                    </div>
                </div>

                {/* Footer small message area for toasts */}
                <div className='p-4 border-t border-stone-100 text-sm text-stone-500'>
                    Manage your personal information and security settings here.
                </div>

                {/* Confirm delete overlay & toast */}
                <div className={`w-screen h-screen  fixed ${displayDeleteDailog ? "opacity-100 pointer-events-auto" : "opacity-0  pointer-events-none"} transition-all duration-300 ease-in-out w-screen z-[10000] top-0 left-0`}>
                <ConfirmDeletePopUp display={displayDeleteDailog} onClose={() => { setDisplayDeleteDailog(false) }} />
                    </div>
                <div className={`fixed ${display ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"} transition-all duration-300 ease-in-out w-screen z-[10000] top-[80%] left-[40%]`}>
                    <Slogan status={Status} details={message} />
                </div>
            </div>
        </div>
    )
}

export default AccountSettingPOPUP
