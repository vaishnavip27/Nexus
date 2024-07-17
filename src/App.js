import React from "react";
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

function App() {
  const user = false;

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              user ? (
                <>
                  <List />
                  <Chat />
                  <Detail />
                </>
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
