import React from "react";
import "./detail.css";
import profileImg from "../../pictures/profile-1.png";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import photoImg from "../../pictures/scenery.jpg";

export default function Detail() {
  return (
    <div className="detail">
      <div className="p-user">
        <img src={profileImg} alt="profile-img" />
        <h3>Vaishnavi Patil</h3>
        <p>@vai_shhh27</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Medis, Files and Links</span>
            <IoIosArrowDown className="arrow-down" />
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
              <div className="photo-detail">
                <img src={photoImg} alt="pic" />
              </div>
            </div>
          </div>
          <button className="logout bg-red-500 hover:bg-red-300 py-2 px-4 w-64 ml-2 mt-40">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
