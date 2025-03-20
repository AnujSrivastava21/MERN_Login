import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./Components/Auth";
import Home from "./Components/Home";  // Create this component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
