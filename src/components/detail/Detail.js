import React from "react";
import "./detail.css";
import profileImg from "../../pictures/profile-1.png";

export default function Detail() {
  return (
    <div className="detail">
      <div className="p-user">
        <img src={profileImg} alt="profile-img" />
        <h2>Vaishnavi Patil</h2>
        <p>@vai_shhh27</p>
      </div>
      <div className="info">
        <div className="title"></div>
      </div>
    </div>
  );
}
