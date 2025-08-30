import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { IoIosArrowDown } from 'react-icons/io'
import user from "../../../assests/Images/HomePageImages/user_one.png"
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

    const handleLogout = async () => {

        try {
            // Call backend to clear refresh token
            await fetch('http://localhost:9000/user/Logout', {
                method: 'POST',
                credentials: 'include', // important: sends the cookie
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

        const response = await fetch("http://localhost:9000/user/UpdateName", {
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

            console.log(response);
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
        const response = await fetch("http://localhost:9000/user/UpdatePassword", {
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

            console.log(response);
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
        <div className='absolute  w-screen flex flex-col justify-center items-center z-[100] inset-0 bg-black/70   transition-transform duration-500 ease-in-out top-0 left-0 '>
            <div className='bg-white transition-opacity  shadow-xl rounded-2xl pb-8 w-[90%] lg:w-2/3   flex flex-col pl-10 '>
                <div className='w-full flex justify-end pr-6 pt-4 '>
                    <div className='cursor-pointer' onClick={onClose}>
                        <ImCross className='text-xl cursor-pointer text-black' />
                    </div>
                </div>
                <div className='h-[400px] flex flex-col gap-2 w-[99%] overflow-auto'>
                    <div className='mt-5'>
                        <h1 className='font-Sora text-2xl'>Account Settings</h1>
                    </div>
                    <div className='mt-8 flex flex-col justify-start items-start'>
                        <h3 onClick={() => setUpdateNameDisplay(!updateNameDisplay)} className='text-lg cursor-pointer font-Sora flex gap-1 justify-center items-center'>Name & Image<IoIosArrowDown className={`mt-1 transition-all ${updateNameDisplay ? "rotate-180" : "rotate-0"}`} /></h3>
                        <div className='flex gap-4 w-auto items-center'>
                            <p className='text-sm pt-1 text-gray-500 font-Outfit'>Logged in as {userName.split(" ")[0]}!</p>
                            <div className='p-2 bg-indigo-300 border border-transparent rounded-full'>
                                <img src={user} className='w-4' alt="" />
                            </div>
                        </div>
                    </div>

                    <div className={`w-full ${updateNameDisplay ? "max-h-40 scale-y-100 mt-8 mb-5 opacity-100" : "max-h-0 scale-y-0 mt-0 mb-0 opacity-0"} transition-all  `}>
                        <div className={`w-full flex flex-col `}>
                            <div>
                                <h1 className='text-sm font-Outfit font-2xl'>Name</h1>
                            </div>
                            <form action="" className='flex flex-col md:flex-row relative  gap-3'>
                                <input value={name} type="text" onChange={checkingLen} name='newName' className='h-7 w-[90%] md:w-[60%] font-Outfit border-2 border-transparent hover:border-indigo-400 focus:border-indigo-400 pl-2 text-xs bg-stone-300 rounded-lg' />
                                <label htmlFor="newName" className='text-xs font-Outfit absolute top-[10%] left-[81%] md:top-[24%] md:left-[57%]'>{noOfCharacter}</label>
                                <button onClick={updateName} type='button' className='w-[100px] md:w-auto text-xs font-Outfit pt-2 pb-2 pl-4 pr-4 border border-black rounded-2xl bg-black text-white'>Save Name</button>
                            </form>
                        </div>
                    </div>

                    <div className='mt-8 flex flex-col transition justify-start items-start'>
                        <h3 className='text-lg  font-Sora flex gap-2 justify-center items-center'>Email <p className='font-Montserrat mt-1 text-[11px] font-semibold pl-2 pr-2 pt-1 pb-1 bg-gray-300 rounded-2xl'>UnVerified</p></h3>
                        <div className='flex gap-4  items-center'>
                            <p className='text-sm pt-1 text-gray-500 font-Outfit '>Your Email is unverified</p>
                            <p className='font-Montserrat mt-0 text-[11px] font-semibold pl-2 pr-2 pt-1 pb-1 bg-indigo-300 rounded-2xl'>Verify now</p>
                        </div>
                    </div>
                    <div onClick={() => setUpdatePasswordDisplay(!updatePasswordDisplay)} className='mt-8 flex flex-col justify-start items-start'>
                        <h3 className='text-lg cursor-pointer font-Sora flex gap-2 justify-center items-center'>Password <p className={`font-Montserrat cursor-pointer mt-1 text-[11px] font-semibold pl-2 pr-2 pt-1 pb-1 ${updatePasswordDisplay ? "bg-indigo-300" : "bg-gray-300"} rounded-2xl`}>Change Now</p></h3>
                    </div>

                    <form className={`w-full ${updatePasswordDisplay ? "max-h-40 scale-y-100 mt-8 mb-8 opacity-100" : "max-h-0 scale-y-0 mt-0 mb-0 opacity-0"} transition-all flex flex-col gap-2 `}>
                        <div className={`w-full flex flex-col `}>
                            <div>
                                <h1 className='text-sm font-Outfit font-2xl'>Current Password</h1>
                            </div>
                            <div className='flex relative items-center gap-3'>
                                <input onChange={(e) => setCurrentPassword(e.target.value)} value={CurrentPassword} type="text" name='currentPassword' className='h-7 w-[90%] md:w-[60%] font-Outfit border-2 border-transparent hover:border-indigo-400 focus:border-indigo-400 pl-2 text-xs bg-stone-300 rounded-lg' />
                            </div>
                        </div>
                        <div className={`w-full flex flex-col `}>
                            <div>
                                <h1 className='text-sm font-Outfit font-2xl'>New Password</h1>
                            </div>
                            <div className='flex relative items-center gap-3'>
                                <input value={newPassword} type="text" onChange={(e) => setNewPassword(e.target.value)} name='newPassword' className='h-7 w-[90%] md:w-[60%] font-Outfit border-2 border-transparent hover:border-indigo-400 focus:border-indigo-400 pl-2 text-xs bg-stone-300 rounded-lg' />
                            </div>
                        </div>
                        <div className={`w-full flex flex-col `}>
                            <div>
                                <h1 className='text-sm font-Outfit font-2xl'>Confirm Password</h1>
                            </div>
                            <div className='flex relative items-center gap-3'>
                                <input value={confirmPassword} type="text" onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' className='h-7 w-[90%] md:w-[60%] font-Outfit border-2 border-transparent hover:border-indigo-400 focus:border-indigo-400 pl-2 text-xs bg-stone-300 rounded-lg' />
                            </div>
                        </div>
                        <div className='w-full '>
                            <button type='button' onClick={updatePassword} className='font-Outfit pt-2 pb-2 pl-4 pr-4 border text-xs border-black rounded-2xl bg-black text-white'>Change Password</button>
                        </div>
                    </form>


                    <div className='mt-8 flex flex-col gap-1 justify-start items-start'>
                        <h3 className='text-lg  font-Sora flex gap-2 justify-center items-center'>Logout you Account :</h3>
                        <button className='font-Montserrat mt-1 text-[11px] font-semibold pl-4 pr-4 pt-2 pb-2 text-white bg-red-400 cursor-pointer rounded-2xl' onClick={handleLogout}>Logout!</button>
                    </div>
                    <div className='mt-8 flex flex-col gap-1 justify-start items-start'>
                        <h3 className='text-lg  font-Sora flex gap-2 justify-center items-center'>Delete Your Account! </h3>
                        <button onClick={() => setDisplayDeleteDailog(!displayDeleteDailog)} className='font-Montserrat mt-1 text-[11px] font-semibold pl-4 pr-4 pt-2 pb-2 text-white bg-red-600 cursor-pointer rounded-2xl'>Delete Now!</button>
                    </div>
                </div>
            </div>
            <div className='fixed top-0 left-0'>
                <ConfirmDeletePopUp display={displayDeleteDailog} onClose={() => { setDisplayDeleteDailog(false) }} />
            </div>
            <div className={`fixed ${display ? "flex" : "hidden"} w-screen z-[10000] top-[80%] left-[40%]`}>
                <Slogan status={Status} details={message} />
            </div>
        </div>
    )
}

export default AccountSettingPOPUP
