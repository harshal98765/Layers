// src/components/Signup.jsx
import React from "react";
import "../styles/LoginSignup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Signup</h2>
        <form action="#">
          <div className="input-box">
            <input type="text" required />
            <label>Username</label>
          </div>
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">
            Signup
          </button>
          <div className="signup-link">
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>

      {[...Array(50)].map((_, i) => (
        <span key={i} style={{ "--i": i }}></span>
      ))}
    </div>
  );
};

export default Signup;
