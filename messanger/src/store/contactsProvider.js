import React, { useContext, createContext, useState } from "react";

const contactsContext = createContext();

export const useContacts = () => useContext(contactsContext);

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  return (
    <contactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </contactsContext.Provider>
  );
};

export default ContactsProvider;
