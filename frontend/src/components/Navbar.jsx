// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { AuthContext } from "../store/AuthContext";


const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get("Auth_Token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true } 
      );
      setIsLoggedIn(false);
      console.log(response.data.message); 
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">CarRental</Link>
        </div>
        {/* Links */}
        <div className="flex space-x-4">
          {!isLoggedIn ? <Link to="/login" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
            Login
          </Link> : <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
            Logout
          </button> }
          <Link to="/register" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
