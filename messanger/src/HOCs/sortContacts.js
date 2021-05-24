import { useEffect, useCallback } from "react";
import { useMessages } from "../store/messagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useUserData } from "../store/userDataProvider";

const SortContacts = ({ children }) => {
    const { messages } = useMessages()
    const { contacts, setContacts } = useContacts() 
    const { userData } = useUserData()
    const sortMessages = useCallback(() => {
        const reversedMessages = messages.slice().reverse();
        let sortedMessagesIds = [];
        reversedMessages.forEach((message) => {
          if (
            !sortedMessagesIds.includes(message.author) &&
            !sortedMessagesIds.includes(message.receiver)
          ) {
            if (message.author !== userData[0].user_id) {
              sortedMessagesIds.push(message.author);
            }
            if (message.receiver !== userData[0].user_id) {
              sortedMessagesIds.push(message.receiver);
            }
          }
        });
        return sortedMessagesIds;
      }, [messages, userData]);
    
      const sortContacts = useCallback(() => {
        let sortedContacts = []
        const sortedMessagesIds = sortMessages()
        sortedMessagesIds.forEach((id) => {
          contacts.map((contact) => {
            if (contact.user_id === id || contact.friend_with === id) {
              sortedContacts.push(contact);
            }
            return 0;
          });
          return 0;
        });
        return sortedContacts
      }, [contacts, sortMessages])
    
      useEffect(() => {
        const sortedMessagesIds = sortMessages();
        const sortedContacts = sortContacts();
        let contactsWithNoMessages = [];
        let match = 0;
    
        contacts.map((each) => {
          if (
            !sortedMessagesIds.includes(each.user_id) &&
            each.status !== "DENIED"
          ) {
            contactsWithNoMessages.push(each);
          }
          return 0;
        });
    
        for (let i = 0; i < sortedContacts.length; i++) {
          if (contacts[i].user_id === sortedMessagesIds[i]) {
            match++;
          }
    
          if (contacts[i].friend_with === sortedMessagesIds[i]) {
            match++;
          }
        }
    
        if (match !== sortedMessagesIds.length) {
          setContacts([...sortedContacts, ...contactsWithNoMessages]);
        }
      }, [messages, userData, contacts, setContacts, sortMessages, sortContacts]);

      return (
          [ children ]
      )
}

export default SortContacts