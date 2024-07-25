import React, { useState, useEffect, useRef } from "react";
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
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc, // Added getDoc import
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: Date.now().toString(),
          text,
          createdAt: new Date(),
          senderId: currentUser.id,
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          // Fixed typo from exits() to exists()
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          if (chatIndex !== -1) {
            // Added check for valid index
            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!chatId) {
    return (
      <div className="no-chat-selected">Select a chat to start messaging</div>
    );
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.photoURL || userImg} alt="user-img" />
          <div className="profile">
            <span>{user?.username}</span>
            <p>Online</p>
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

      <div className="center">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message ${
              msg.senderId === currentUser.id ? "own" : "them"
            }`}
          >
            {msg.senderId !== currentUser.id && (
              <img src={userImg} alt="image" />
            )}
            <div className="texts">
              <p>{msg.text}</p>
              <span>
                {msg.date
                  ? new Date(msg.date.toDate()).toLocaleString()
                  : "Sending..."}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

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
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <GrAttachment className="pin" />
          <FaMicrophone className="micro" />
          <RiSendPlaneFill className="send" onClick={handleSend} />

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
