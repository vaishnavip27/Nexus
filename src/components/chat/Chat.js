import React from "react";
import "./chat.css";
import userImg from "../../pictures/profile-2.png";
import { LuPhone } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";

export default function Chat() {
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={userImg} alt="user-img" />
          <div className="texts">
            <span>Vaishnavi Patil</span>
            <p>Lorem ipsum dolor, sit amef</p>
          </div>
        </div>
        <div className="icons">
          <LuPhone />
          <IoVideocamOutline />
          <BsInfoCircle />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  );
}
