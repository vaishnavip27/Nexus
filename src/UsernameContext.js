import React, { createContext, useState } from "react";

const UsernameContext = createContext(null);

export const UsernameProvider = ({ children, username }) => {
  const [currentUsername, setUsername] = useState(username || "");

  return (
    <UsernameContext.Provider value={{ currentUsername, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContext;
