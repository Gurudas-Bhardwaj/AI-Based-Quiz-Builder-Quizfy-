import React from "react";
import { FaRobot, FaUsers, FaBolt, FaLayerGroup, FaChartBar, FaImage } from "react-icons/fa";
import { MdLiveTv, MdOutlineSecurity } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { motion } from "framer-motion";
import logo from "../../assets/Images/Logo/LOGO.png"

const features = [
  {
    icon: <MdLiveTv className="text-indigo-500 text-3xl" />,
    title: "Real-Time Interactions",
    desc: "Engage participants with instant updates, live results, and synchronized quiz sessions.",
  },
  {
    icon: <FaRobot className="text-indigo-500 text-3xl" />,
    title: "AI-Powered Assistance",
    desc: "Generate smart questions, analyze answers, and get insights using AI-driven logic.",
  },
  {
    icon: <FaLayerGroup className="text-indigo-500 text-3xl" />,
    title: "Dynamic Presentations",
    desc: "Create interactive slides for quizzes, polls, and open-ended questions seamlessly.",
  },
  {
    icon: <HiTemplate className="text-indigo-500 text-3xl" />,
    title: "Multiple Templates",
    desc: "Choose from a variety of pre-built templates to customize your presentation style.",
  },
  {
    icon: <FaImage className="text-indigo-500 text-3xl" />,
    title: "Add Media to Questions",
    desc: "Include images or visual hints to make every question engaging and interactive.",
  },
  {
    icon: <FaBolt className="text-indigo-500 text-3xl" />,
    title: "Smooth Performance",
    desc: "Optimized real-time engine ensures fast responses and smooth transitions.",
  },
  {
    icon: <FaUsers className="text-indigo-500 text-3xl" />,
    title: "Collaborative Access",
    desc: "Admins and team members can co-manage presentations and monitor participants live.",
  },
  {
    icon: <FaChartBar className="text-indigo-500 text-3xl" />,
    title: "Analytics & Insights",
    desc: "Get deep quiz analytics, performance metrics, and downloadable reports.",
  },
  {
    icon: <MdOutlineSecurity className="text-indigo-500 text-3xl" />,
    title: "Secure & Reliable",
    desc: "Session-based authorization ensures only verified users can access your live quizzes.",
  },
];

const AboutUs = () => {
  return (
    <div className="font-Outfit bg-white text-gray-800">
      {/* Hero Section */}
      <section className=" mx-auto px-6 py-20 text-center">
        <motion.div
          className="w-screen flex justify-center md:text-5xl font-semibold text-indigo-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={logo} className="w-52" alt="" />
        </motion.div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Quizify is a next-generation platform for creating, hosting, and managing quizzes and presentations — powered by real-time technology and AI intelligence. 
          It redefines how knowledge and interaction come together.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            className="p-6 bg-stone-50 hover:bg-stone-100 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {feat.icon}
              <h3 className="text-lg font-semibold text-indigo-600">{feat.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-50 py-14 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-4">
          Empower your quizzes with Quizify today!
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Experience interactive learning, real-time updates, and powerful AI-driven features — all in one platform.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition font-medium">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
