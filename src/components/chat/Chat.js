import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "./chat.css";
import userImg from "../../pictures/profile-2.png";
import { LuPhone } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import ZegoUIKit from "zego-uikit";
import EmojiPicker from "emoji-picker-react";
import ZegoExoressEngine from "zego-express-engine-webrtc";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

export default function Chat({ selectedTheme }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { chatId, selectedUser } = useChatStore();
  const { currentUser } = useUserStore();
  const endRef = useRef(null);
  const fileInputRef = useRef(null);
  const attachmentsRef = useRef(null);

  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const [isInCall, setIsInCall] = useState(false);
  const [videoCallComponent, setVideoCallComponent] = useState(null);

  const formatTime = (date) => {
    return date.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    const zg = new ZegoExpressEngine(YOUR_APP_ID, YOUR_APP_SIGN);
    const zgRef = useRef(zg);

    return () => {
      zgRef.current.destroyEngine();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        attachmentsRef.current &&
        !attachmentsRef.current.contains(event.target)
      ) {
        setAttachmentsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const startVideoCall = async () => {
    const videoCallConfig = {
      appID : 587145527,
      appSign : f2ddb6356cb368cc76dfc2d7ad9cdda457b3cee20a59822c8e3ac1f7a6bb4d5d,
      userID : currentUser.id,
      userName: currentUser.username,
      token:,
      scenario:{
        mode : "OneONOneCall",
      }
    };
      await ZegoExpressEngine.instance().loginRoom(
        ROOM_ID,
        { userID: currentUser.id, userName: currentUser.username },
        { token: YOUR_TOKEN }
      );

      // Start publishing local stream
      const localStream =
        await ZegoExpressEngine.instance().startPublishingStream(
          currentUser.id
        );
      localVideoRef.current.srcObject = localStream;

      // Start playing remote stream
      const remoteStream =
        await ZegoExpressEngine.instance().startPlayingStream(selectedUser.id);
      remoteVideoRef.current.srcObject = remoteStream;

      setIsInCall(true);
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };
  const endVideoCall = async () => {
    try {
      await ZegoExpressEngine.instance().stopPublishingStream();
      await ZegoExpressEngine.instance().stopPlayingStream(selectedUser.id);
      await ZegoExpressEngine.instance().logoutRoom(ROOM_ID);
      setIsInCall(false);
    } catch (error) {
      console.error("Error ending video call:", error);
    }
  };

  <div className="border" onClick={startVideoCall}>
    <IoVideocamOutline className="icon" />
  </div>;

  {
    isInCall && (
      <div className="video-call-container">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="local-video"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video"
        />
        <button onClick={endVideoCall} className="end-call-button">
          End Call
        </button>
      </div>
    );
  }

  const handleIncomingCall = async (roomId, callerId) => {
    // Show UI to accept/reject call
    if (userAcceptsCall) {
      await ZegoExpressEngine.instance().loginRoom(
        roomId,
        { userID: currentUser.id, userName: currentUser.username },
        { token: YOUR_TOKEN }
      );

      const remoteStream =
        await ZegoExpressEngine.instance().startPlayingStream(callerId);
      remoteVideoRef.current.srcObject = remoteStream;

      const localStream =
        await ZegoExpressEngine.instance().startPublishingStream(
          currentUser.id
        );
      localVideoRef.current.srcObject = localStream;

      setIsInCall(true);
    }
  };

  useEffect(() => {
    zgRef.current.on("IMRecvBroadcastMessage", (roomID, messageList) => {
      messageList.forEach((message) => {
        if (message.message === "incoming_call") {
          // Show UI to accept/reject call
          if (userAcceptsCall) {
            startVideoCall();
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const zg = new ZegoExpressEngine(YOUR_APP_ID, YOUR_APP_SIGN);

    // Store the zg instance in a ref so you can access it later
    const zgRef = useRef(zg);

    return () => {
      // Clean up when the component unmounts
      zgRef.current.destroyEngine();
    };
  }, []);

  const startVideoCall = async () => {
    try {
      const { token } = await fetchToken(); // Implement this function to get a token from your server

      // Log into the room
      await zgRef.current.loginRoom(ROOM_ID, token, {
        userID: currentUser.id,
        userName: currentUser.username,
      });

      // Start local preview
      const localStream = await zgRef.current.createStream({
        camera: { video: true, audio: true },
      });
      zgRef.current.startPublishingStream(currentUser.id, localStream);
      localVideoRef.current.srcObject = localStream;

      // Start playing remote stream
      zgRef.current.on("streamUpdated", async ({ type, streams }) => {
        if (type === "ADD") {
          const remoteStream = await zgRef.current.startPlayingStream(
            streams[0].streamID
          );
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      setIsInCall(true);
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };

  const endVideoCall = async () => {
    try {
      zgRef.current.stopPublishingStream();
      zgRef.current.stopPlayingStream(selectedUser.id);
      await zgRef.current.logoutRoom(ROOM_ID);
      setIsInCall(false);
    } catch (error) {
      console.error("Error ending video call:", error);
    }
  };

  <div className="border" onClick={startVideoCall}>
    <IoVideocamOutline className="icon" />
  </div>;

  {
    isInCall && (
      <div className="video-call-container">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="local-video"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video"
        />
        <button onClick={endVideoCall} className="end-call-button">
          End Call
        </button>
      </div>
    );
  }

  useEffect(() => {
    zgRef.current.on("IMRecvBroadcastMessage", (roomID, messageList) => {
      messageList.forEach((message) => {
        if (message.message === "incoming_call") {
          // Show UI to accept/reject call
          if (userAcceptsCall) {
            startVideoCall();
          }
        }
      });
    });
  }, []);

  const handleSend = async (imgUrl = null) => {
    if (text.trim() === "" && !imgUrl) return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: Date.now().toString(),
          text: imgUrl ? "" : text,
          imgUrl,
          createdAt: new Date(),
          senderId: currentUser.id,
        }),
      });

      const userIDs = [currentUser.id, selectedUser.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMessage = imgUrl
              ? "Image"
              : text;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });

      setText("");

      if (imgUrl) {
        const event = new CustomEvent("newChatImage", {
          detail: { chatId: imgUrl },
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `chat_images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      await handleSend(downloadURL);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageOptionClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    setIsCameraOpen(true);
    setAttachmentsOpen(false);
  };

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const res = await fetch(imageSrc);
      const blob = await res.blob();

      const file = new File([blob], "webcam-capture.jpg", {
        type: "image/jpeg",
      });

      try {
        const storageRef = ref(
          storage,
          `chat_images/${Date.now()}_webcam-capture.jpg`
        );
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        await handleSend(downloadURL);

        setIsCameraOpen(false);
      } catch (error) {
        console.error("Error uploading webcam image:", error);
      }
    }
  }, [webcamRef, handleSend]);

  if (!chatId) {
    return (
      <div className="no-chat-selected">Select a chat to start messaging</div>
    );
  }

  return (
    <div
      className="chat"
      style={{
        backgroundImage: `url(${selectedTheme})`,
        backgroundSize: "cover",
      }}
    >

      {isInCall && videoCallComponent && (
        <div className="video-call-container">
          {videoCallComponent.render()}
        </div>
      )}
      <div className="top">
        <div className="user">
          <img src={selectedUser?.photoURL || userImg} alt="user-img" />
          <div className="profile">
            <span>{selectedUser?.username}</span>
            <p>Online</p>
          </div>
        </div>
        <div className="icons">
          <div className="border">
            <LuPhone className="icon" />
          </div>
          <div className="border" onClick={startVideoCall}>
            <IoVideocamOutline className="icon" />
          </div>

          {isInCall && (
            <div className="video-call-container">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="local-video"
              />
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="remote-video"
              />
              <button onClick={endVideoCall} className="end-call-button">
                End Call
              </button>
            </div>
          )}

          <div className="border">
            <BsInfoCircle className="icon" />
          </div>
        </div>
      </div>

      <div className="center">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message ${
              msg.senderId === currentUser.id ? "own" : "them"
            }`}
          >
            {msg.senderId !== currentUser.id && (
              <img src={userImg} alt="user" className="user-avatar" />
            )}
            <div className="texts">
              {msg.text && <p>{msg.text}</p>}
              {msg.imgUrl && (
                <img src={msg.imgUrl} alt="chat" className="chat-image" />
              )}
              <span className="message-timestamp">
                {msg.createdAt ? formatTime(msg.createdAt) : "Sending..."}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {isCameraOpen && (
        <div className="camera-modal">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 480,
              height: 360,
              facingMode: "user",
            }}
          />
          <button onClick={handleCapture}>Capture</button>
          <button onClick={() => setIsCameraOpen(false)}>Close</button>
        </div>
      )}

      <div className="bottom">
        <div className="input-wrapper">
          <MdEmojiEmotions
            className="em"
            onClick={() => setOpen((prev) => !prev)}
          />
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <GrAttachment
            className="pin"
            onClick={() => setAttachmentsOpen((prev) => !prev)}
          />
          <RiSendPlaneFill className="send" onClick={() => handleSend()} />

          <div className="emoji">
            {open && (
              <div className="picker">
                <EmojiPicker onEmojiClick={handleEmoji} className="em-icon" />
              </div>
            )}
          </div>

          {attachmentsOpen && (
            <div ref={attachmentsRef} className="attachments">
              <div
                className="attachment-option"
                onClick={handleImageOptionClick}
              >
                <IoMdImages className="image-icon" /> Image
              </div>
              <div className="attachment-option" onClick={handleCameraClick}>
                <FaCamera className="camera-icon" /> Camera
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
