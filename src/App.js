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

function App() {
  const [user, setUser] = useState(false);

  return (
    <Router>
      <div className="container">
        {user ? (
          <>
            {/* These components are always rendered if the user is logged in */}
            <List />
            <Chat />
            <Detail />
            <Routes>
              <Route path="/notification" element={<Notification />} />
              <Route path="*" element={<Navigate to="/list" replace />} />
            </Routes>
          </>
        ) : (
          <Routes>
            {/* If user is not logged in, redirect to SignUp page */}
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={() => setUser(true)} />}
            />
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
