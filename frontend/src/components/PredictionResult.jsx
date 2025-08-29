export default function PredictionResult({ result }) {
  const isSpam = result.prediction === "spam" || result.prediction === "scam";

  return (
    <div className={`p-5 w-full max-w-xl rounded-lg shadow-lg transition transform hover:scale-105
        ${isSpam ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
      <h2 className="text-xl font-bold mb-2">Prediction: {result.prediction.toUpperCase()}</h2>
      <p>Confidence: {result.confidence}%</p>
      <div className="h-3 w-full bg-gray-200 rounded mt-2">
        <div
          className={`h-3 rounded transition-all ${isSpam ? "bg-red-700" : "bg-green-700"}`}
          style={{ width: `${result.confidence}%` }}
        ></div>
      </div>
    </div>
  );
}
