import React from 'react'
import { motion } from "framer-motion"
import internet from "../../assets/Images/Landing_page_images/internet.png"
import quality from "../../assets/Images/Landing_page_images/quality.png"
import HomePage from "../../assets/Images/Landing_page_images/HomePage.png"
import AI from "../../assets/Images/Landing_page_images/AI.png"
import create from "../../assets/Images/Landing_page_images/create.jpg"
import analyze from "../../assets/Images/Landing_page_images/anaylze.jpg"
import Manage from "../../assets/Images/Landing_page_images/manage.jpg"
import toolkit from "../../assets/Images/Landing_page_images/toolkit.png"
import teaching from "../../assets/Images/Landing_page_images/teaching.png"
import open_book from "../../assets/Images/Landing_page_images/open-book.png"
import section_3 from "../../assets/Images/Landing_Page_images/section_3.png"
import Ending from "../../assets/Images/Landing_Page_images/Ending.png"
import { useAuth } from '../../Context/authContext'
import { NavLink } from 'react-router'

const Landing_Page = () => {

  const { isLogin } = useAuth();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  }

  return (
    <main className='overflow-hidden pt-10 pb-10'>
      {/* ========== Hero Section ========== */}
      <motion.div
        className='w-screen flex flex-col md:flex-row'
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Left */}
        <motion.section
          className='w-full md:w-1/2 font-poppins flex flex-col justify-center items-center'
          variants={staggerContainer}
        >
          <motion.div className='w-3/4 md:w-3/5' variants={fadeUp}>
            <h1 className='flex flex-col text-center md:text-left text-5xl'>
              <p>Communicate.</p>
              <p>Collaborate. Create.</p>
            </h1>
          </motion.div>

          <motion.div className='w-3/4 md:w-3/5' variants={fadeUp}>
            <p className='pt-5 text-center md:text-left text-base'>
              Create your custom quiz, ask friends, family, and students — Be a Teacher.
            </p>
          </motion.div>

          <motion.div className='w-3/4 md:w-3/5 pt-6 flex justify-center md:justify-start' variants={fadeUp}>
            {isLogin ? (
              <NavLink to="/Login" className='pl-6 text-sm pr-6 pt-1 pb-1 border rounded-sm bg-black cursor-pointer text-white'>Go To Home</NavLink>
            ) : (
              <NavLink to="/Login" className='pl-8 text-lg pr-8 pt-1 pb-1 border rounded-2xl bg-black cursor-pointer text-white'>Login</NavLink>
            )}
          </motion.div>

          <motion.div className='w-3/4 md:w-3/5 pt-10 flex justify-between' variants={fadeUp}>
            <div className='flex w-auto justify-center items-center gap-1 text-sm'>
              <img src={internet} alt="" className='w-10' />
              <p>Real <br /> Time</p>
            </div>
            <div className='flex w-auto justify-center items-center gap-1 text-sm'>
              <img src={AI} alt="" className='w-10' />
              <p>AI <br />Powered</p>
            </div>
            <div className='flex w-auto justify-center items-center gap-1 text-sm'>
              <img src={quality} alt="" className='w-10' />
              <p>Best <br />Results</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Right */}
        <motion.section
          className='w-full mt-16 flex justify-center md:justify-start md:mt-0 md:w-1/2'
          variants={fadeIn}
        >
          <img src={HomePage} className='w-[82%]' alt="" />
        </motion.section>
      </motion.div>

      {/* ========== Yellow Section ========== */}
      <motion.section
        className="relative bg-yellow-400 text-black overflow-hidden mt-16"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,20 C360,100 1080,0 1440,50 L1440,0 L0,0 Z" fill="white" />
        </svg>
        <div className="grid grid-rows-2 md:grid-cols-2 p-4 md:p-12 mt-20 mb-20">
          <motion.div className='flex justify-center items-center' variants={fadeUp}>
            <h1 className='text-3xl text-center md:text-left w-[90%] md:w-[40%] font-Outfit'>
              With the Right Software, Great Things Can Happen
            </h1>
          </motion.div>
          <motion.div className='flex ml-0 md:ml-10 items-center' variants={fadeUp}>
            <p className='font-Outfit w-[100%] mt-5 text-center md:text-left md:mt-0 md:w-[50%]'>
              Build your quiz, invite participants, and check results in real-time with AI-powered insights — next-level innovation for smarter learning.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== How It Works Section ========== */}
      <motion.div
        className='w-screen'
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className='w-full flex justify-center items-center pt-16' variants={fadeUp}>
          <p className='font-Sora font-extrabold p-3 bg-[#f7f6f4]'>How it works</p>
        </motion.div>

        <motion.div className='w-full pb-10 font-Outfit pt-2' variants={fadeUp}>
          <div className='w-full flex justify-center items-center'>
            <h1 className='text-2xl md:text-4xl font-Sora'>Start a Quiz in 3 Easy Steps</h1>
          </div>
        </motion.div>

        <motion.div className="w-screen flex justify-center py-2" variants={staggerContainer}>
          <div className="flex justify-center flex-col md:flex-row gap-6 place-items-center p-2 font-Outfit">
            {[{
              title: "Create",
              img: create,
              desc: "Select the type of quiz you want to host. Choose AI-powered or your own quiz."
            }, {
              title: "Manage",
              img: Manage,
              desc: "Organize all your quizzes in one place. Edit questions and settings seamlessly."
            }, {
              title: "Analyze",
              img: analyze,
              desc: "Track participant performance and get AI-driven insights for future improvement."
            }].map((step, i) => (
              <motion.div
                key={i}
                className="w-[70%] md:w-[25%] border border-gray-400 rounded-xl p-4 bg-white"
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-3xl mb-4">{step.title}</p>
                <img src={step.img} className="w-44 pb-4" alt={step.title} />
                <p className="text-sm text-gray-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ========== Legacy Section ========== */}
      <motion.section
        className='w-full mt-20'
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className='w-full flex justify-center items-center pb-5' variants={fadeUp}>
          <h1 className='text-4xl font-Sora font-bold p-3 bg-[#f7f6f4]'>A Legacy</h1>
        </motion.div>

        <div className='flex justify-center items-center'>
          <div className='w-full flex flex-col md:flex-row justify-center items-center'>
            <motion.div className='w-full md:w-1/2 flex justify-center md:justify-end items-center' variants={fadeIn}>
              <img src={section_3} className='w-[70%] md:mr-18' alt="Legacy" />
            </motion.div>

            <motion.div className='md:w-1/2' variants={fadeUp}>
              <div className='md:pl-10'>
                <div className='font-Outfit text-2xl text-center mt-5 md:mt-0 md:text-left md:text-3xl'>
                  <h1>Built for Creatives,</h1>
                  <h1>By Creatives.</h1>
                </div>
                <p className='font-poppins text-sm pt-7 text-center md:text-left w-[90%] md:w-[70%] mx-auto md:mx-0'>
                  Teachers, trainers, and creators can build engaging quizzes for classrooms, workshops, or communities with AI-powered tools and real-time collaboration.
                </p>
              </div>

              <div className='grid grid-cols-3 md:grid-cols-4 mt-9 pl-4'>
                {[{ img: toolkit, text: "All in one\nToolkit" },
                { img: teaching, text: "Best Way\nto Teach" },
                { img: open_book, text: "Gain\nKnowledge" }].map((item, i) => (
                  <motion.div key={i} className='flex gap-2 justify-center items-center' variants={fadeUp}>
                    <img src={item.img} className='w-14' alt={item.text} />
                    <p className='text-sm font-Outfit whitespace-pre'>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========== Testimonials Section ========== */}
      <motion.section
        className='w-screen mt-16'
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className='w-full flex justify-center items-center' variants={fadeUp}>
          <h1 className='font-Montserrat font-bold text-4xl'>What our Users Say</h1>
        </motion.div>

        <motion.div className='w-full flex flex-col md:flex-row gap-3 font-Outfit justify-center items-center' variants={staggerContainer}>
          {[{
            quote: "As a teacher, I love how fast I can generate quality quizzes. The AI suggestions save me so much time.",
            name: "— Rakesh Sharma, CEO",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-94a8iYRLGmupzBb35bcteQuENtqVhfV1Fg&s"
          }, {
            quote: "This platform makes creating and managing quizzes effortless. The instant reports were a game-changer.",
            name: "— Rahul Mehta, Corporate Trainer",
            img: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/ai_face_generator/ai_face_generator/webp/thumb_image/002.webp"
          }, {
            quote: "I’ve never seen an easier way to build interactive quizzes. AI-generated questions are spot-on!",
            name: "— Ananya Patel, E-learning Creator",
            img: "https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg"
          }].map((u, i) => (
            <motion.div key={i} className='w-[75%] lg:w-[22%] md:w-[30%] mt-6 border border-gray-400 p-5 rounded-xl bg-white' variants={fadeUp}>
              <h3 className='pb-6 text-sm leading-relaxed'>" {u.quote} "</h3>
              <p className='text-xs pb-3'>{u.name}</p>
              <img src={u.img} className="w-8 rounded-full" alt={u.name} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ========== Ending Section ========== */}
      <motion.section
        className='w-screen mt-20'
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className='w-full flex justify-center items-center flex-col' variants={fadeUp}>
          <h1 className='text-center font-Sora text-3xl font-extralight w-[90%] md:w-1/2'>
            Get Ready to Maximize Your Productivity With Our Workflow Solutions
          </h1>
          <button className='mt-5 pl-4 pr-4 text-sm font-poppins hover:bg-amber-400 hover:border hover:border-black hover:text-black pt-2 pb-2 border rounded-sm bg-black text-white cursor-pointer transition-all font-medium'>
            Get Started
          </button>
        </motion.div>

        <motion.div className='w-full relative mt-16 flex flex-col justify-center items-center' variants={fadeIn}>
          <img src={Ending} className='w-[70%] md:w-[54%]' alt="Ending" />
          <div className='w-full absolute -z-10 top-[96%] h-24' style={{ backgroundColor: "#FFBF23" }} />
        </motion.div>
      </motion.section>
    </main>
  )
}

export default Landing_Page
