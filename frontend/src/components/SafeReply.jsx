import { FiCopy } from "react-icons/fi";

export default function SafeReply({ suggestions }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold mb-2">Suggested Safe Replies:</h3>
      {suggestions.map((s, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <span>{s}</span>
          <button onClick={() => handleCopy(s)}>
            <FiCopy />
          </button>
        </div>
      ))}
    </div>
  );
}
