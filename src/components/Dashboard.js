import React from "react";
import List from "./list/List";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import "./Dashboard.css";
import { useChatStore } from "../lib/chatStore";

export default function Dashboard() {
  const { chatId } = useChatStore();

  return (
    <div className="dashboard">
      <List />
      {chatId && <Chat />}
      {chatId && <Detail />}
    </div>
  );
}
