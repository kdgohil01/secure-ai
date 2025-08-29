export default function LimeExplanation({ explanation, message }) {
  // explanation = [["win", 0.45], ["prize", 0.33]]
  let highlightedMessage = message;

  explanation.forEach(([word, weight]) => {
    const colorIntensity = Math.min(Math.round(weight * 255), 200);
    const regex = new RegExp(`(${word})`, "gi");
    highlightedMessage = highlightedMessage.replace(
      regex,
      `<span style="background-color: rgba(255,0,0,${weight}); font-weight:bold;" title="Influence: ${Math.round(weight*100)}%">$1</span>`
    );
  });

  return (
    <div
      className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-lg shadow-md transition transform hover:scale-105"
      dangerouslySetInnerHTML={{ __html: highlightedMessage }}
    ></div>
  );
}
