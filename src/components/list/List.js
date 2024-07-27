import React, { useState, useEffect } from "react";
import "./list.css";
import Userinfo from "./userInfo/Userinfo";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import pfImage from "../../pictures/profile-2.png";
import { useChatStore } from "../../lib/chatStore";

export default function List() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser]);

  const toggleAddMode = () => {
    setAddMode(!addMode);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;

    try {
      // Your search logic here
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list">
      <Userinfo addMode={addMode} toggleAddMode={toggleAddMode} />
      <div className="chatList">
        <h3>Messages</h3>
        {chats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
          >
            <div className="pf-border">
              <img src={pfImage} alt="profile" className="pfp" />
            </div>
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
