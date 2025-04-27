import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/loginPage/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const isLoggedIn = localStorage.getItem("user") !== null;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}

        
      </Routes>
    </Router>
  );
}

export default App;
