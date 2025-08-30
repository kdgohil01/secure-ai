// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import ResultBox from "./components/ResultBox";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen logic
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Server error. Check backend.");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult({ error: "Failed to connect to backend" });
    } finally {
      setLoading(false);
    }
  };

  if (showSplash) return <SplashScreen />;

  return (
    <BrowserRouter>
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 text-gray-900 min-h-screen"
        }
      >
        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <h1 className="text-2xl font-bold">🔒 SecureText AI</h1>
          <div className="flex gap-6">
            <Link to="/home" className="hover:underline">
              Home
            </Link>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-6 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Pages */}
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <div className="container mx-auto px-6 py-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6"> System armed, Enter your request below!!</h1>

                {/* Input Form */}
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                >
                  <label className="block text-lg font-semibold mb-2">
                    Enter a Message:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows="4"
                    className="w-full p-3 border rounded-lg mb-4 text-gray-900 dark:text-white dark:bg-gray-700"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? "Analyzing..." : "Check Message"}
                  </button>
                </form>

                {/* Result */}
                <div className="p-6 w-full max-w-xl">
                  {result && <ResultBox result={result} />}
                </div>
              </div>
            }
          />

          <Route
            path="/contact"
            element={
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg text-gray-400">
                  📧 Coming soon with EmailJS
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
