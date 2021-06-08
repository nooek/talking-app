import { useEffect, useCallback } from "react";
import { useMessages } from "../store/messagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useUserData } from "../store/userDataProvider";

const SortContacts = ({ children }) => {
  const { messages } = useMessages();
  const { contacts, setContacts } = useContacts();
  const { userData } = useUserData();

  const sortMessages = useCallback(() => {
    const sortedMessagesIds = [];
    const sortedMessages = messages.slice().reverse();
    sortedMessages.forEach((message) => {
      if (message.author !== userData[0].user_id) {
        sortedMessagesIds.push(message.author);
      }
      if (message.receiver !== userData[0].user_id) {
        sortedMessagesIds.push(message.receiver);
      }
    });
    return [...new Set(sortedMessagesIds)];
  }, [messages, userData]);

  const getContactsWithNoMessage = useCallback(() => {
    const contactsWithNoMessages = [];
    const sortedMessagesIds = sortMessages();

    contacts.map((each) => {
      if (!sortedMessagesIds.includes(each.user_id) && each.status !== "DENIED") {
        contactsWithNoMessages.push(each);
      }
      return 0;
    });

    return contactsWithNoMessages;
  }, [contacts, sortMessages]);

  const sortContacts = useCallback(() => {
    const sortedMessagesIds = sortMessages();
    const sortedContacts = [];

    if (sortedMessagesIds.length > 0) {
      sortedMessagesIds.forEach((id) => {
        contacts.map((contact) => {
          if (contact.user_id === id || contact.friend_with === id) {
            sortedContacts.push(contact);
          }
          return 0;
        });
        return 0;
      });

      return sortedContacts;
    }
    return null;
  }, [contacts, sortMessages]);

  const checkSorted = useCallback(() => {
    const sortedMessagesIds = sortMessages();
    const contactsWithNoMessages = getContactsWithNoMessage();
    const contactsInOrder = [];

    contacts.map((contact) => {
      if (!contactsWithNoMessages.includes(contact.user_id)) {
        return contactsInOrder.push(contact.user_id);
      }
      return null;
    });

    const contactsWithNoRep = [...new Set(contactsInOrder)];

    if (contactsWithNoRep.length === sortedMessagesIds.length) {
      if (contactsWithNoRep.every((v, i) => v === sortedMessagesIds[i])) {
        return true;
      }
    }
    return null;
  }, [sortMessages, contacts, getContactsWithNoMessage]);

  useEffect(() => {
    const isSorted = checkSorted();
    const sortedContacts = sortContacts();
    const contactsWithNoMessages = getContactsWithNoMessage();

    if (!isSorted && sortedContacts) {
      setContacts([...sortedContacts, ...contactsWithNoMessages]);
    }
  }, [
    messages,
    userData,
    contacts,
    setContacts,
    sortMessages,
    sortContacts,
    checkSorted,
    getContactsWithNoMessage,
  ]);

  return [children];
};

export default SortContacts;
