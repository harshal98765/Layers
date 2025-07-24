// src/components/LoginSignup.jsx
import React, { useState,useEffect } from "react";
import "../styles/LoginSignup.css";
import Navbar from "./navbar"

const LoginSignup = () => {
  useEffect(() => {
  document.body.classList.add("Login-page-body");

  return () => {
    document.body.classList.remove("Login-page-body");
  };
}, []);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    <Navbar />
    <div className="container1">
      <div className="login-box">
        <h2 className="he">{isLogin ? "Login" : "Signup"}</h2>
        <form action="#">
          {!isLogin && (
            <div className="input-box">
              <input type="text" required />
              <label>Username</label>
            </div>
          )}
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          {isLogin ? (
            <div className="forgot-pass">
              <a href="#">Forgot your password?</a>
            </div>
          ) : null}
          <button type="submit" className="btn">
            {isLogin ? "Login" : "Signup"}
          </button>
          <div className="signup-link">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}>
              {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
            </a>
          </div>
        </form>
      </div>

      {/* Background animation */}
      {[...Array(50)].map((_, i) => (
        <span key={i} style={{ "--i": i }}></span>
      ))}
    </div>
    </>
  );
};

export default LoginSignup;
