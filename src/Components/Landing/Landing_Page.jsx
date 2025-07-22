import React, { useEffect } from 'react'
import internet from "../../assests/Images/Landing_page_images/internet.png"
import quality from "../../assests/Images/Landing_page_images/quality.png"
import HomePage from "../../assests/Images/Landing_page_images/HomePage.png"
import AI from "../../assests/Images/Landing_page_images/AI.png"
import create from "../../assests/Images/Landing_page_images/create.jpg"
import analyze from "../../assests/Images/Landing_page_images/anaylze.jpg"
import Manage from "../../assests/Images/Landing_page_images/manage.jpg"
import toolkit from "../../assests/Images/Landing_page_images/toolkit.png"
import teaching from "../../assests/Images/Landing_page_images/teaching.png"
import open_book from "../../assests/Images/Landing_page_images/open-book.png"
import section_3 from "../../assests/Images/Landing_Page_images/section_3.png"
import Ending from "../../assests/Images/Landing_Page_images/Ending.png"
import { useAuth } from '../../Context/authContext'
import { NavLink } from 'react-router'

const Landing_Page = () => {
    
    const {isLogin} = useAuth();

  return (
    <main className='overflow-hidden pt-10 pb-10'>
        <div className='w-screen  flex flex-col md:flex-row'>

            {/* 1st section of page */}
            {/* left section */}
            <section className=' w-full md:w-1/2 font-poppins flex flex-col justify-center items-center' >
                <div className='w-3/4 md:w-3/5'>
                    <h1 className='flex flex-col  text-center md:text-left text-4xl'>
                        <p>Communicate.</p>
                        <p>Collaborate. Create.</p>
                    </h1>
                </div>
                <div className='w-3/4 md:w-3/5'>
                    <p className='pt-5 text-center md:text-left text-xs'>
                        Create your custom quiz, ask the friend, family and students and Be a Teacher.
                    </p>
                </div>
                <div className='w-3/4 md:w-3/5 pt-6 flex justify-center md:justify-start'>
                {
                    isLogin?(
                        <NavLink to="/Login" className='pl-6 text-sm pr-6 pt-1 pb-1 border rounded-sm bg-black cursor-pointer text-white'>Go To Home</NavLink>    
                    ):(
                        <NavLink to="/Login" className='pl-6  pr-6 pt-1 pb-1 border rounded-sm bg-black cursor-pointer text-white'>Login</NavLink>
                    )
                }
                </div>
                <div className='w-3/4 md:w-3/5  pt-10 flex justify-between'>
                    <div className='flex w-auto justify-center items-center gap-1 text-xs'>
                        <img src={internet} alt="" className='w-8' />
                        <p>Real <br /> Time</p>
                    </div>
                    <div className='flex w-auto justify-center items-center gap-1 text-xs'>
                        <img src={AI} alt="" className='w-8' />
                        <p>AI <br />Powered</p>
                    </div>
                    <div className='flex w-auto justify-center items-center gap-1 text-xs'>
                        <img src={quality} alt="" className='w-8' />
                        <p>Best <br />Results</p>
                    </div>
                </div>
            </section>
            
            {/* right section it will keep hidden when screen is less than 768px */}
            <section className='w-full mt-16 flex justify-center md:justify-start md:mt-0 md:w-1/2 '>
                <img src={HomePage} className='w-[82%]' alt="" />
            </section>

        </div>

        {/* Extra section of the page */}
        <section>
    <div className="relative bg-yellow-400 text-black overflow-hidden">
      {/* Wave SVG */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C360,100 1080,0 1440,50 L1440,0 L0,0 Z"
          fill="white"
        />
      </svg>
      {/* Content */}
      <div className="grid grid-rows-2 md:grid-cols-2 p-4 md:p-12 mt-20 mb-20">
            <div className=' flex justify-center items-center'>
                <h1 className='text-2xl text-center md:text-left w-[90%] md:w-[40%] font-Outfit' >With the Right Software, Great Things Can Happen</h1>
            </div>
            <div className='flex ml-0  md:ml-10 items-center'>
                <p className='text-xs font-Outfit w-[100%] mt-5 text-center md:text-left md:mt-0 md:w-[50%]'>Build your own choice of Quiz and ask to participants and check the result in real Time with advancment of AI, A next level innovation that will help you to gain more knowledge</p>
            </div>
      </div>
    </div>


        </section>


        {/* second section where the working is mentioned  */}
        <div className='w-screen'>

            <div className='w-full flex justify-center items-center pt-16'>
                <div className='w-auto'>
                    <p className='text-sm p-3 ' style={{"backgroundColor":"#f7f6f4"}}>How it works</p>
                </div>
            </div>

            <div className='w-full pb-10 font-Outfit pt-2'>
                <div className='w-full flex justify-center items-center'>
                    <h1 className='text-2xl md:text-4xl font-space'>Start a Quiz in 3 easy Steps</h1>
                </div>
            </div>

            <div className="w-screen flex  justify-center py-2">
                <div className="flex justify-center flex-col md:flex-row gap-6 place-items-center p-2 font-Outfit">

                    {/* Card 1 */}
                    <div className="w-[70%] md:w-[25%] border border-gray-400 rounded-xl p-4">
                    <p className="text-2xl mb-4">Create</p>
                    <img src={create} className="w-44 pb-4" alt="" />
                    <p className="text-xs">
                        Select the type of quiz you want to host. Choose AI-powered or your own quiz. In your own quiz, you add questions and options. In AI-powered, you provide a prompt.
                    </p>
                    </div>

                    {/* Card 2 */}
                    <div className="w-[70%] md:w-[25%] border border-gray-400 rounded-xl p-4">
                    <p className="text-2xl mb-4">Manage</p>
                    <img src={Manage} className="w-44 pb-4" alt="" />
                    <p className="text-xs">
                        Organize all your quizzes in one place. Edit questions, update options, and customize quiz settings with just a few clicks for a seamless experience. 
                    </p>
                    </div>

                    {/* Card 3 */}
                    <div className="w-[70%] md:w-[25%] border border-gray-400 rounded-xl p-4">
                    <p className="text-2xl mb-4">Analyze</p>
                    <img src={analyze} className="w-44 pb-4" alt="" />
                    <p className="text-xs">
                        Track participant performance effortlessly. View detailed reports, understand answer trends, and gain insights to improve future quizzes and learning outcomes.
                    </p>
                    </div>

                </div>
            </div>

            {/* 3rd section use cases  */}
            <section className='w-full mt-20'>
                {/* heading */}
                <div className='w-full flex justify-center items-center pb-5'>
                    <h1 className='text-3xl font-space font-bold  p-3' style={{"backgroundColor":"#f7f6f4"}}>A Legacy</h1>
                </div>

                {/* images */}
                <div className='flex  justify-center  items-center'>
                    <div className='w-full flex flex-col md:flex-row justify-center items-center'>
                        <div className='w-full md:w-1/2 flex justify-center md:justify-end items-center'>
                            <img src={section_3} className='w-[70%] md:mr-18' alt="" />
                        </div>

                        {/* texts */}
                        <div className='md:w-1/2 '>
                            <div className='md:pl-10'>
                                <div className='font-Outfit text-2xl text-center mt-5 md:mt-0 md:text-left md:text-3xl'>
                                    <h1>Builds for Creatives,</h1>
                                    <h1>By Creative.</h1>
                                </div>
                                <div className='w-full md:w-auto flex justify-center items-center md:justify-start md:items-start'>
                                    <p className='font-poppins text-xs pt-7 text-center md:text-left self-center w-[90%] md:w-[70%]'>Teachers, trainers, and content creators can quickly build engaging quizzes for classrooms, workshops, or online communities. Whether you’re testing knowledge, gathering feedback, or hosting live competitions, this platform empowers your creativity with AI-powered tools with Real Time Collabration.</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 md:grid-cols-4 mt-9 pl-4'>
                                <div className='flex gap-2 justify-center items-center'>
                                    <img src={toolkit} className='w-10' alt="" />
                                    <p className='text-xs font-Outfit'>All in one <br /> toolkit</p>
                                </div>
                                <div className='flex gap-2 justify-center items-center'>
                                    <img src={teaching} className='w-10' alt="" />
                                    <p className='text-xs font-Outfit'>Best Way to<br /> Teach</p>
                                </div>
                                <div className='flex gap-2 justify-center items-center'>
                                    <img src={open_book} className='w-10' alt="" />
                                    <p className='text-xs font-Outfit'>Gain <br /> Knowledge</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4 what user says */}
            <section className='w-screen mt-16'>
                <div className='w-full flex justify-center items-center'>
                    <h1 className='font-space text-4xl'>
                        What our User say
                    </h1>
                </div>

                {/* cards of users */}
                <div className='w-full flex flex-col md:flex-row gap-3 font-Outfit justify-center items-center'>
                    <div className='w-[75%] lg:w-[22%] md:w-[30%] mt-6 border border-gray-400 p-5 rounded-xl'>
                        <div>
                            <h3 className='pb-6'>"As a teacher, I love how fast I can generate quality quizzes. The AI suggestions save me so much time, and my students stay engaged!"</h3>
                        </div>
                        <div>
                            <p className='text-xs pb-3'>—Rakesh Sharma, CEO</p>
                        </div>
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s" className="w-8 rounded-full " alt="" />
                        </div>
                    </div>
                    <div className='w-[75%] lg:w-[22%] md:w-[30%] mt-6 border border-gray-400 p-5 rounded-xl'>
                        <div>
                            <h3 className='pb-6'>"This platform makes creating and managing quizzes effortless. I used it for my workshop, and the instant reports were a game-changer."</h3>
                        </div>
                        <div>
                            <p className='text-xs pb-3'>— Rahul Mehta, Corporate Trainer</p>
                        </div>
                        <div>
                            <img src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/ai_face_generator/ai_face_generator/webp/thumb_image/002.webp" className="w-8 rounded-full " alt="" />
                        </div>
                    </div>
                    <div className='w-[75%] lg:w-[22%] md:w-[30%] mt-6 border border-gray-400 p-5 rounded-xl'>
                        <div>
                            <h3 className='pb-6'>"I’ve never seen an easier way to build interactive quizzes. The AI-generated questions are spot-on and super helpful for my online community."
</h3>
                        </div>
                        <div>
                            <p className='text-xs pb-3'>— Ananya Patel, E-learning Creator</p>
                        </div>
                        <div>
                            <img src="https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg  " className="w-8 rounded-full " alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5th section */}
            <section className='w-screen'>
                <div className='w-full flex justify-center items-center flex-col mt-20'>
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <h1 className='text-center font-space text-3xl font-extralight' >Get Ready to Maximize Your Productivity With Our Workflow Solutions</h1>
                    </div>
                    <div className='mt-5'>
                        <button className='pl-4 pr-4 text-xs font-poppins hover:bg-amber-400 hover:border hover:border-black hover:text-black cursor- ` pt-2 pb-2 border rounded-sm bg-black text-white cursor-pointer transition-all font-medium'>Get Started</button>
                    </div>
                </div>

                <div className='w-full relative md:mt-0 mt-16 flex flex-col justify-center items-center'>
                    <div className=' flex justify-center items-center w-[70%] md:w-[54%]'>
                        <img src={Ending} className='w-full' alt="" />
                    </div>
                    <div className='w-full absolute -z-10 top-[96%] h-24 ' style={{"backgroundColor" : "#FFBF23"}}>

                    </div>
                </div>
            </section>

        </div>

    </main>
  )
}

export default Landing_Page
