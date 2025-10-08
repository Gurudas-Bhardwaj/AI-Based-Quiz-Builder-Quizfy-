import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Slogan from '../Messages/Slogan.jsx';
import { useAuth } from '../../Context/authContext.jsx';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();


  //toaster data / messages data to show what's going on after try to login
  const [message, setMessage] = useState("");
  const [Status, setStatus] = useState(false);
  const [display, setDisplay] = useState(false);


  const loginUser = async (email, password) => {
    const { success, message } = await login(email, password);

    if (success) {
      setMessage("Successfully Logged in! Redirecting you to Application");
      setStatus(true);
      setDisplay(true);

      setTimeout(() => {
        setDisplay(false);
        navigate(location?.state?.redirectTo || "/App/Admin/Home", { replace: true });
      }, 2000)
    }
    else {
      setMessage(message);
      setDisplay(true);
      setStatus(false);

      setTimeout(() => {
        setDisplay(false);
      }, 2000)
    }

  }

  useEffect(() => {
    const message = location?.state?.message;

    if (message) {
      setMessage(message);
      setDisplay(true);
      setStatus(false);

      setTimeout(() => {
        setDisplay(false);
      }, [2000])
    }
  }, [])

  return (
    <main className='w-screen font-poppins bg-stone-100 flex pt-5  justify-center items-center pb-5'>
      <div className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[29%] shadow-sm bg-white rounded-lg  pt-10 pb-10 flex flex-col justify-center items-center gap-5'>
        <div className=' flex flex-col w-full justify-center items-center gap-1'>
          <h1 className='font-Outfit text-3xl font-extrabold text-blue-800' style={{ "color": "#344564" }}>Login</h1>
          <span className='text-[13px] font-light text-stone-950'>Logged in to your existing Account !</span>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-3'>


          <div className="relative w-64">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer h-8 w-full rounded-sm text-xs pl-2  border border-stone-400 focus:border-blue-900 focus:border-[1.5px] outline-none"
              autoComplete="off"
            />
            <label
              className={`absolute left-1 text-xs bg-white p-1 transition-all duration-200 pointer-events-none
                  ${email ? 'text-blue-900 text-[8px] -top-2.5' : 'top-1  text-gray-500'}
                `}
            >
              Email
            </label>
          </div>

          <div className="relative w-64">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-8 w-full rounded-sm text-xs pl-2 border border-stone-400 focus:border-blue-900 focus:border-[1.5px] outline-none"
              autoComplete="off"
            />
            {
              <div className='absolute right-3 top-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
              </div>
            }
            <label
              className={`absolute left-1 text-xs bg-white p-1 text-gray-500 transition-all duration-200 pointer-events-none
                  ${password ? 'text-blue-900 text-[8px] -top-2.5' : 'top-1 text-gray-500'}
                `}
            >
              Password
            </label>
          </div>
        </div>

        <div className='w-full font-Outfit'>
          <div className='w-full flex justify-center items-center'>
            <button onClick={() => loginUser(email, password)} type='button' className='h-8  text-sm cursor-pointer bg-blue-800 w-64 text-white rounded-lg' style={{ "backgroundColor": "#344564" }}>Login</button>
          </div>
        </div>

        <div className='w-full flex justify-center items-center text-xs font-Outfit'>
          <p className='text-gray-800'>New User? <NavLink to="/SignUp" className='text-blue-600 cursor-pointer'>Register Now</NavLink></p>
        </div>

        <div className='border-b border-b-gray-400 h-1 w-[80%]'>

        </div>

        <div className=' w-full flex justify-center items-center'>
          <div className='w-[70%]'>
            <p className='text-xs font-Outfit '>By Login up to your existing account, you will have access to your <span className='text-blue-500 cursor-pointer'> Dashboard</span> and <span className='text-blue-500 cursor-pointer'>Details</span>.</p>
          </div>
        </div>
      </div>
      <div className={`fixed transition-all duration-300 ease-in-out ${display ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-3"} top-[80%] transition-all left-0 flex justify-center items-center w-screen`}>
        <Slogan status={Status} details={message} />
      </div>
    </main>
  )
}

export default Login;
