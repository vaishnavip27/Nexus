import React from "react";
import "./userInfo.css";
import { LuSearch } from "react-icons/lu";
import { HiPlus, HiMinus } from "react-icons/hi";
import AddUser from "./addUser/addUser";

export default function Userinfo({ addMode, toggleAddMode }) {
  return (
    <div className="userInfo">
      <div className="search">
        <div className="searchBar">
          <LuSearch />
          <input type="text" placeholder="Search..." />
        </div>
        {addMode ? (
          <HiMinus
            className="plus"
            onClick={toggleAddMode}
            style={{ color: "black" }}
          />
        ) : (
          <HiPlus
            className="plus"
            onClick={toggleAddMode}
            style={{ color: "black" }}
          />
        )}
      </div>
      {addMode && <AddUser />}
    </div>
  );
}
