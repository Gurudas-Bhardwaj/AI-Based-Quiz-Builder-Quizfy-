import React from 'react'
import { useAuth } from '../../../Context/authContext';
import { NavLink } from 'react-router';

const ProfileSection = (props) => {
  const {userName, email}=useAuth();
  
    const Logout = async()=>{
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

  return (
    <div className='absolute z-10 transition-all  top-9 -left-52 border pt-4 pb-4 pr-2 pl-2 border-white rounded-sm  bg-white ' style={{"display":props.display?"flex":"none","boxShadow":"0 2px 8px rgba(0, 0, 0, 0.4)"}}>
                  <div className='w-full'>
                    <div className='flex flex-col w-full pl-2'>
                        <p className='font-Outfit text-sm '>{userName}</p>
                        <p className='font-Outfit text-xs text-gray-500'>{email}</p>
                    </div>
                    <div className='pt-4 w-52 pb-4 flex flex-col mt-3 pl-4 rounded-xl' style={{"backgroundColor":"#e4f4e7"}}>
                      <div className='flex flex-col '>
                          <div className='text-gray-900 text-[12px] font-Outfit'>
                            Ready for unlimited participants, exporting results and much more?
                          </div>
                      </div>
                      <div className='w-full flex justify-end'>
                        <button className='pt-1 pb-1 pl-4 pr-4 mr-3 text-white text-xs mt-2 bg-green-800 hover:bg-green-900 cursor-pointer transition-all rounded-2xl font-Outfit'>Upgrade</button>
                      </div>
                    </div>
                    <div className='flex gap-2 cursor-pointer flex-col mt-5'>
                      <NavLink to="/App/setting" className='text-sm hover:bg-gray-100 rounded-sm cursor-pointer p-1 font-Outfit pl-2'>
                        <p>Account Settings</p>
                      </NavLink>
                      <div className='text-sm   hover:bg-gray-100 rounded-sm cursor-pointer p-1 font-Outfit pl-2'>
                        <p>Billing</p>
                      </div>
                      <div className='text-sm   hover:bg-gray-100 rounded-sm cursor-pointer p-1 font-Outfit pl-2'>
                        <p>Workspace setting</p>
                      </div>
                      <div onClick={Logout} className='text-sm  hover:bg-gray-100 rounded-sm cursor-pointer p-1  text-red-700 font-Outfit pl-2'>
                        <p>Log out</p>
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default ProfileSection
