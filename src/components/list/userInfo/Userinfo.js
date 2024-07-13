import React, { useState } from "react";
import "./userInfo.css";
import { LuSearch } from "react-icons/lu";
import { HiPlus, HiMinus } from "react-icons/hi";

export default function Userinfo() {
  const [addMode, setAddMode] = useState(false);

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
    </div>
  );
}
