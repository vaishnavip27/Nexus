import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <List />
      <Chat />
      <Detail />
    </div>
  );
}

export default Dashboard;
