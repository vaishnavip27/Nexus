// ParentComponent.js
import React, { useState } from "react";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";

function ParentComponent() {
  const [chatBackground, setChatBackground] = useState("");

  const handleBackgroundChange = (newBackground) => {
    setChatBackground(newBackground);
  };

  return (
    <div className="app">
      <Detail setChatBackground={handleBackgroundChange} />
      <Chat selectedTheme={chatBackground} />
    </div>
  );
}

export default ParentComponent;
