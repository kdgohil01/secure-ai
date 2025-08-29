import React from "react";

const ResultBox = ({ result }) => {
  if (!result) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: result.prediction === "spam" ? "#ffcccc" : "#ccffcc"
      }}
    >
      <strong>Result:</strong>{" "}
      {result.prediction === "spam" ? "🚨 Scam/Spam Message" : "✅ Safe Message"}
    </div>
  );
};


export default ResultBox;
