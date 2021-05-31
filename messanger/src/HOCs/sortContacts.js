import { useEffect, useCallback } from "react";
import { useMessages } from "../store/messagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useUserData } from "../store/userDataProvider";

const SortContacts = ({ children }) => {
  const { messages } = useMessages();
  const { contacts, setContacts } = useContacts();
  const { userData } = useUserData();

  const sortMessages = useCallback(() => {
    let sortedMessagesIds = [];
    const sortedMessages = messages.slice().reverse();
    sortedMessages.forEach((message) => {
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
    const sortedMessagesIds = sortMessages();
    let sortedContacts = [];

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
  }, [contacts, sortMessages]);

  const checkSorted = useCallback(() => {
    const sortedMessagesIds = sortMessages();
      let contactsInOrder = [];
      let contactsWithNoMessages = []

      contacts.map((each) => {
        if (
          !sortedMessagesIds.includes(each.user_id) &&
          each.status !== "DENIED"
        ) {
          contactsWithNoMessages.push(each.user_id);
        }
        return 0;
      });

      contacts.map((contact) => {
        if (!contactsWithNoMessages.includes(contact.user_id)){
          return contactsInOrder.push(contact.user_id);
        }
      });

      const contactsWithNoRep = [...new Set(contactsInOrder)];
      
      console.log(sortedMessagesIds)
      console.log(contacts)
      console.log(contactsWithNoRep)

      if (
        contactsWithNoRep.length === sortedMessagesIds.length &&
        contactsWithNoRep.every((v, i) => v === sortedMessagesIds[i])
      ) {
        return true;
      } else {
        return false;
      }
    
  }, [sortMessages, contacts]);

  useEffect(() => {
    let isSorted = checkSorted();
    const sortedMessagesIds = sortMessages();
    const sortedContacts = sortContacts();

    let contactsWithNoMessages = [];
    // let match = 0;

    contacts.map((each) => {
      if (
        !sortedMessagesIds.includes(each.user_id) &&
        each.status !== "DENIED"
      ) {
        contactsWithNoMessages.push(each);
      }
      return 0;
    });

    console.log(contactsWithNoMessages);

    if (!isSorted && sortedContacts) {
      setContacts([...sortedContacts, ...contactsWithNoMessages]);
      console.log("Is Not Sorted!!!");
    } else {
      console.log("Is Sorted!!!");
    }

    console.log("a")

    // for (let i = 0; i < sortedMessagesIds.length; i++) {
    //   if (sortedContacts[i].user_id === sortedMessagesIds[i]) {
    //     match++;
    //   }

    //   if (sortedContacts[i].friend_with === sortedMessagesIds[i]) {
    //     match++;
    //   }
    // }

    // console.log(contacts)
    // console.log(match)
    // console.log(sortedContacts)
    // console.log(sortedMessagesIds)
    // console.log(contactsWithNoMessages)

    // if (match !== sortedMessagesIds.length) {
    // }
  }, [
    messages,
    userData,
    contacts,
    setContacts,
    sortMessages,
    sortContacts,
    checkSorted,
  ]);

  return [children];
};

export default SortContacts;
