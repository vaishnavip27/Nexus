import React, { useState, useEffect } from "react";
import "./userInfo.css";
import { LuSearch } from "react-icons/lu";
import { HiPlus, HiMinus } from "react-icons/hi";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Userinfo() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const toggleMode = () => {
    setAddMode(!addMode);
  };
  return (
    <div className="userInfo">
      <div className="search">
        <div className="searchBar">
          <LuSearch />
          <input type="text" placeholder="Search..." />
        </div>
        {addMode ? (
          <HiMinus className="plus" onClick={toggleMode} />
        ) : (
          <HiPlus className="plus" onClick={toggleMode} />
        )}
      </div>
      {addMode && <AddUser />}
    </div>
  );
}
