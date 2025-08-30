import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo or App Name on left */}
        <h1 className="text-xl font-bold text-cyan-400">Secure Text AI</h1>

        {/* Navigation Buttons on right */}
        <div className="space-x-6">
          <Link
            to="/home"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/contact"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
