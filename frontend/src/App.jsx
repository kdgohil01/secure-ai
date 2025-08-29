// src/App.jsx
import { useState, useEffect } from "react";
import ResultBox from "./components/ResultBox";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingSplash, setLoadingSplash] = useState(true);
  const [page, setPage] = useState("splash");

  useEffect(() => {
    if (page === "splash") {
      const timer = setTimeout(() => setPage("home"), 3500); // 3.5 sec splash
      return () => clearTimeout(timer);
    }
  }, [page]);

  const navigate = (nextPage) => setPage(nextPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
"Content-Type": "application/json",
},
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Server error. Check your backend.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult({ error: "Failed to connect to backend" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {page === "splash" && <SplashScreen />}
      {page === "home" && (
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
          <div className="container mx-auto px-6 py-10 flex flex-col items-center">
            
            {/* Header */}
            <div className="flex justify-between w-full max-w-xl mb-6">
              <h1 className="text-3xl font-bold">🔒 Secure AI</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 rounded-lg shadow-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            {/* Dashboard Title */}
            <h1 className="text-3xl font-bold text-center mt-6">
              SecureText AI Dashboard
            </h1>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
            >
              <label className="block text-lg font-semibold mb-2">Enter a Message:</label>
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

            {/* Result Section */}
            <div className="p-6 w-full max-w-xl">
              {result && <ResultBox result={result} />}
              {/* add other components like InputBox, StatsPanel, etc. */}
            </div>
          </div>
        </div>
      )}
      {page === "dashboard" && (
        <div className="h-screen flex items-center justify-center text-white">
          Dashboard Page
        </div>
      )}
      {page === "contact" && (
        <div className="h-screen flex items-center justify-center text-white">
          Contact Us Page
        </div>
      )}
    </>
  );
}

export default App;