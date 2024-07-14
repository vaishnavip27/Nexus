import React, { useState } from "react";
import "./chat.css";
import userImg from "../../pictures/profile-2.png";
import { LuPhone } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={userImg} alt="user-img" />
          <div className="profile">
            <span>Vaishnavi Patil</span>
            <p>Lorem ipsum dolor, sit amef</p>
          </div>
        </div>
        <div className="icons">
          <div className="border">
            <LuPhone className="icon" />
          </div>
          <div className="border">
            <IoVideocamOutline className="icon" />
          </div>
          <div className="border">
            <BsInfoCircle className="icon" />
          </div>
        </div>
      </div>
      <div className="center"></div>

      <div className="bottom">
        <div className="input-wrapper">
          <MdEmojiEmotions
            className="em"
            onClick={() => setOpen((prev) => !prev)}
          />
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <GrAttachment className="pin" />
          <FaMicrophone className="micro" />
          <RiSendPlaneFill className="send" />

          <div className="emoji">
            {open && (
              <div className="picker">
                <EmojiPicker onEmojiClick={handleEmoji} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
