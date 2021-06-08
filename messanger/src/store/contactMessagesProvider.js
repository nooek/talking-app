import React, { useState, useContext, createContext } from "react";

const contactMessagesContext = createContext();

export const useContactMessages = () => useContext(contactMessagesContext);

const ContactMessagesProvider = ({ children }) => {
  const [contactMessages, setContactMessages] = useState([]);
  return (
    <contactMessagesContext.Provider value={{ contactMessages, setContactMessages }}>
      {children}
    </contactMessagesContext.Provider>
  );
};

export default ContactMessagesProvider;
