import React, { useState, useEffect } from "react";
import "./detail.css";
import profileImg from "../../pictures/profile-1.png";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { db, auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import bgOne from "../../pictures/bg-1.png";
import bgTwo from "../../pictures/bg-2.jpg";

export default function Detail({ onBackgroundChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatImages, setChatImages] = useState([]);
  const { chatId, selectedUser } = useChatStore();

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
          const imageUrls = chatData.messages
            .filter((msg) => msg.imgUrl)
            .map((msg) => msg.imgUrl);

          const promises = imageUrls.map(async (url) => {
            const storage = getStorage();
            const storageRef = ref(storage, url);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
          });

          const imageDownloads = await Promise.all(promises);
          setChatImages(imageDownloads);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [chatId]);

  if (!selectedUser) {
    return <div className="detail">Select a user to see details</div>;
  }

  const handleBackgroundClick = (imgUrl) => {
    onBackgroundChange(imgUrl); // Call the prop function to update background
  };

  return (
    <div className="detail">
      <div className="p-user">
        <img src={selectedUser.photoURL || profileImg} alt="profile-img" />
        <div className="p-username">{selectedUser.username}</div>
      </div>

      <div className="theme-container">
        <div className="heading">Background</div>
        <div className="theme">
          <img
            src={bgOne}
            alt="bg-1"
            className="bg-img"
            onClick={() => handleBackgroundClick(bgOne)}
          />
          <img
            src={bgTwo}
            alt="bg-2"
            className="bg-img"
            onClick={() => handleBackgroundClick(bgTwo)}
          />
        </div>
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
