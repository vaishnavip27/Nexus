import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route path="/login" component={LoginPage} />
          <Route path="/">
            {user ? (
              <>
                <List />
                <Chat />
                <Detail />
              </>
            ) : (
              <SignUp />
            )}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
