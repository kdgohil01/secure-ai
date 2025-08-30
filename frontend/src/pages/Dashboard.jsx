// src/pages/Dashboard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLES = [
  "Congratulations! You have won ₹100000. Claim your prize now at http://freecash-prize.com",
  "URGENT: Your bank account has been blocked. Verify details immediately at http://secure-banklogin.com",
  "Update your Aadhaar KYC now or your number will be deactivated. Visit http://fake-kyc-update.com",
  "Hey, are we still meeting tomorrow at 6 pm?",
  "Please send me the project report by evening."
];

export default function Dashboard() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const message = text.trim();
    if (!message) {
      setError("Please enter a message to analyze.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Server error.");
      }

      const data = await res.json();
      const outcome = {
        prediction: data.prediction,
        confidence: typeof data.confidence === "number" ? data.confidence : undefined,
      };
      setResult(outcome);
      setHistory((h) => [
        { msg: message, ...outcome, time: new Date().toLocaleTimeString() },
        ...h.slice(0, 7),
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fillExample = (ex) => {
    setText(ex);
    setResult(null);
    setError("");
  };

  const badge = (pred) =>
    pred === "spam"
      ? "bg-red-500/20 text-red-300 border border-red-500/40"
      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";

  const progressWidth = (c) =>
    `${Math.min(100, Math.max(0, Math.round((c || 0) * 100)))}%`;

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">📊 Spam Detection Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a message to analyze..."
          className="w-full h-28 p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {result && (
        <div className={`p-4 rounded-lg mb-6 ${badge(result.prediction)}`}>
          <p className="text-lg font-semibold">
            Result: {result.prediction.toUpperCase()}
          </p>
          {result.confidence !== undefined && (
            <div className="mt-2 w-full bg-gray-800 h-3 rounded">
              <div
                className="h-3 rounded bg-cyan-500"
                style={{ width: progressWidth(result.confidence) }}
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">💡 Try Examples</h2>
        <div className="space-y-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => fillExample(ex)}
              className="block w-full text-left p-3 rounded bg-gray-800 hover:bg-gray-700"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">📜 Recent History</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">No history yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li
                key={i}
                className={`p-3 rounded-lg ${badge(h.prediction)} flex justify-between`}
              >
                <span>{h.msg}</span>
                <span className="ml-3 text-sm opacity-70">
                  {h.prediction.toUpperCase()} ({h.time})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

