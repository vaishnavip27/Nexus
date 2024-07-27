import React from "react";
import "./detail.css";
import { auth } from "../../lib/firebase";
import { IoDocumentText } from "react-icons/io5";
import PropTypes from "prop-types";

export default function Detail({ images = [] }) {
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
            {images.map((img, index) => (
              <img
                src={img}
                alt={`img-${index}`}
                className="image"
                key={index}
              />
            ))}
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

Detail.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure images prop is an array of strings
};
