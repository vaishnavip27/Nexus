import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import SignUp from "./components/signup/SignUp";
import LoginPage from "./components/login/LoginPage";
import Notification from "./components/notification/Notification";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(false);

  return (
    <Router>
      <div className="container">
        {user ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={() => setUser(true)} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
