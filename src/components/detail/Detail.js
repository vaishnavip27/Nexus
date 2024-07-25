// Detail.js
import React, { useState, useEffect } from "react";
import "./detail.css";
import profileImg from "../../pictures/profile-1.png";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { db, auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

export default function Detail() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatImages, setChatImages] = useState([]);
  const { chatId } = useChatStore();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (!chatId) return;

    const fetchImages = async () => {
      try {
        const chatDoc = await db.collection("chats").doc(chatId).get();
        if (chatDoc.exists) {
          const chatData = chatDoc.data();
          const images = chatData.messages
            .filter((msg) => msg.imgUrl)
            .map((msg) => msg.imgUrl);
          setChatImages(images);
        }
      } catch (error) {
        console.error("Error fetching chat images:", error);
      }
    };

    fetchImages();
  }, [chatId]);

  return (
    <div className="detail">
      <div className="p-user">
        <img src={profileImg} alt="profile-img" />
        <div className="p-username">Vaishnavi Patil</div>
      </div>

      <div className="info">
        <div className="option">
          <div className="title" onClick={toggleExpand}>
            <span>Medias, Files and Links</span>
            {isExpanded ? (
              <IoIosArrowUp className="arrow-icon" />
            ) : (
              <IoIosArrowDown className="arrow-icon" />
            )}
          </div>

          {isExpanded && (
            <div className="photos">
              <div className="photoItem">
                {chatImages.map((imgUrl, index) => (
                  <div key={index} className="photo-detail">
                    <img src={imgUrl} alt={`pic-${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className="logout bg-red-500 hover:bg-red-300 py-2 px-4 w-64 ml-2 border-none outline-none"
            onClick={() => auth.signOut()}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
