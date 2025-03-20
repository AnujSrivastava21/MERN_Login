import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: You can also call backend logout API to clear cookie if needed
    alert("Logged out");
    navigate("/");  // Back to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Home Page</h2>
      <button onClick={handleLogout} style={{ padding: "10px 20px" , textAlign:"right" , border:"none" ,  backgroundColor: "#D52D28" , color:"#fff" , cursor:"pointer"}}>
        Logout
      </button>
    </div>
  );
};

export default Home;
