// src/components/SplashScreen.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // start fade-out
      setTimeout(() => onFinish(), 800); // wait fade duration before switching
    }, 4000); // splash visible for 4 sec
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Animation variant for typing effect
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
      },
    }),
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="h-screen w-screen flex items-center justify-center 
            bg-gradient-to-r from-purple-900 via-pink-800 to-cyan-700 animate-gradient-x"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Typing effect for title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent 
              bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 drop-shadow-lg flex justify-center">
              {"Welcome to SecureText AI".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Glitch text */}
            <motion.p
              className="mt-6 text-xl md:text-2xl text-cyan-300 font-semibold glitch-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Created by Team NEOBYTE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
