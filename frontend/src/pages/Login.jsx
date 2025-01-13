// src/pages/Login.jsx
import axios from "axios";
import { useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const data = {
        email,
        password,
     }
    // Call login API
    try {
      const response = await axios.post(
      'http://localhost:5000/api/auth/login', 
      data, 
      {withCredentials: true,
      }); 
      console.log("Login successful:", response.data);
      setIsLoggedIn(true);
      navigate("/");
  } catch (error) {
      console.error(error);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
