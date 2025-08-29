// src/Home.jsx
import { motion } from "framer-motion";

export default function Home({ navigate }) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-end items-center p-6 space-x-6 text-lg font-semibold">
        <button onClick={() => navigate("home")} className="hover:text-cyan-400 transition">
          Home
        </button>
        <button onClick={() => navigate("dashboard")} className="hover:text-cyan-400 transition">
          Dashboard
        </button>
        <button onClick={() => navigate("contact")} className="hover:text-cyan-400 transition">
          Contact Us
        </button>
      </nav>

      {/* Center Content */}
      <motion.div
        className="flex flex-1 flex-col justify-center items-center text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to SecureText AI
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          SecureText AI is your smart spam and scam detection tool 🚀. 
          Using Machine Learning and NLP, it filters unwanted texts and keeps your 
          communication safe and secure 🔒.  
          <br />
          <br />
          Built with ❤️ by <span className="text-cyan-400">Team NEOBYTE</span>.
        </p>
      </motion.div>
    </div>
  );
}
