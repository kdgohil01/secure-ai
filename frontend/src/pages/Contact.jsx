import { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        service_ba7ld6t,   // Replace with your EmailJS service ID
        template_cnosl5d,  // Replace with your EmailJS template ID
        { 
          name: email,      // will show as sender
          email: email,     // reply-to email
          message: message  // actual message
        },
        template_cnosl5d    // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setEmail("");
          setMessage("");
        },
        () => {
          setStatus("❌ Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={sendEmail}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Contact Me
        </h2>

        <label className="block mb-2 text-gray-700">Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 text-gray-700">Your Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          required
          className="w-full p-3 border rounded-lg mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {status && (
          <p className="mt-4 text-center text-gray-700">{status}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
