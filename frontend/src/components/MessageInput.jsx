import { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";

export default function MessageInput({ setResult }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        message,
      });

      // ✅ Ensure backend result is passed properly
      setResult(res.data.result || res.data);

      setMessage("");
    } catch (err) {
      console.error("Error:", err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 relative w-full max-w-xl">
      {/* Textarea */}
      <textarea
        className="border rounded-lg p-3 w-full resize-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="5"
        placeholder="Paste or type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50`}
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        ) : (
          <FiSend size={20} />
        )}
        {loading ? "Analyzing..." : "Analyze Message"}
      </button>
    </div>
  );
}
