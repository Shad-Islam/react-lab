import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/loginPage/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/not found/NotFound";

function App() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
