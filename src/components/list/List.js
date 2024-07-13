import React from "react";
import "./list.css";
import ChatList from "./chatList/chatList";
import Userinfo from "./userInfo/Userinfo";

export default function List() {
  return (
    <div className="list">
      <Userinfo />
      <ChatList />
    </div>
  );
}
