import React, { useState, useContext, createContext } from "react";

const messagesContext = createContext();

export const useMessages = () => useContext(messagesContext);

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <messagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </messagesContext.Provider>
  );
};

export default MessagesProvider;
