import React from "react";
import { useState } from "react";
import api from "../api.js"
import { useNavigate } from "react-router-dom";
import "../style.css";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      if (isLogin) {
        const res = await api.post("/login", { email, password });
        alert(res.data.msg); // Show success message
        console.log("Login success:", res.data);
        navigate("/home");
      } else {
        const res = await api.post("/signup", { email, password });
        alert(res.data.msg); // Show success message
        console.log("Signup success:", res.data);
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="divider">OR</div>
        <button className="google-button">Continue with Google</button>
        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="switch-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
