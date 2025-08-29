import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- Add this import

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

# Load model and vectorizer
with open("spam_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "No message provided"}), 400
    
    message_vectorized = vectorizer.transform([message])
    prediction = model.predict(message_vectorized)[0]
    
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True)
