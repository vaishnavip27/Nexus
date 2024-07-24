import React from "react";
import "./chatList.css";
import pfImage from "../../../pictures/profile-2.png";

export default function ChatList({ chats }) {
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const username = formData.get("username");

    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ChatList">
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={pfImage} alt="profile" className="pfp" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
