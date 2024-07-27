import React from "react";
import "./detail.css";
import imgOne from "../../pictures/photo-1.jpg";
import imgTwo from "../../pictures/photo-2.jpg";
import { IoDocumentText } from "react-icons/io5";

export default function Detail({ onBackgroundChange }) {
  return (
    <div className="detail">
      <div className="user-deets">
        <div className="cd" style={{ paddingTop: "10px" }}>
          Chat details
        </div>

        <div className="photo-detail">
          <div className="see-flex">
            <div className="pnv">Photos and Videos</div>
            <div className="see-more">See more</div>
          </div>

          <div className="photo-container">
            <img src={imgOne} alt="img-one" className="image" />
            <img src={imgTwo} alt="img-two" className="image" />
            <img src={imgTwo} alt="img-two" className="image" />
            <img src={imgOne} alt="img-one" className="image" />
          </div>
        </div>

        <div className="share-details">
          <div className="see-flex">
            <div className="sf">Shared Files</div>
            <div className="see-more">See more</div>
          </div>

          <div className="content-group">
            <div className="content">
              <div className="s-doc">
                <IoDocumentText className="s-icon" />
              </div>
              <div className="content-des">
                Changes for the provision of the department
              </div>
            </div>

            <div className="content">
              <div className="s-doc">
                <IoDocumentText className="s-icon" />
              </div>
              <div className="content-des">
                Changes for the provision of the department
              </div>
            </div>
          </div>
        </div>

        <button
          className="logout bg-red-500 hover:bg-red-300 py-2 px-4 w-64 ml-2 border-none outline-none"
          onClick={() => auth.signOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
