import { useState, useCallback, useEffect, cloneElement } from "react";
import { useSocket } from "../store/socketProvider";
import { useContacts } from "../store/contactsProvider";
import { useFriend } from "../store/friendProvider";
import { useMessages } from "../store/messagesProvider";
import { useUserData } from "../store/userDataProvider";
import defaultPfp from "../assets/images/default_pfp.png";

const GetFriendRealTimeInfo = ({ children }) => {
  const { socket } = useSocket();
  const { contacts, setContacts } = useContacts();
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { messages } = useMessages();
  const [friendsOnline, setFriendsOnline] = useState([]);

  const updateOnlineFriends = useCallback(() => {
    socket.emit("get-users-online");
    socket.on("get-user-online", (data) => {
      let onlineList = [];
      data.map((each) => {
        return onlineList.push(each.userId);
      });
      setFriendsOnline(onlineList);
    });

    return () => {
      socket.off("get-user-online");
    };
  }, [socket]);

  useEffect(() => {
    updateOnlineFriends();
  }, [updateOnlineFriends]);

  useEffect(() => {
    socket.on("update-contact", (data) => {
      if (data[1] !== "BLOCKED") {
        const friends = contacts.filter((each) => {
          return each.user_id !== data[0];
        });

        const friend = contacts.filter((each) => {
          return each.user_id === data[0];
        });
        console.log(data);

        console.log(friend[0]);
        if (data[1] === "ACCEPTED" && friend[0].status !== "BLOCKED") {
          friend[0].status = data[1];
          if (friend.user_id === friend[0].user_id) {
            setFriend(...friend);
            setContacts(...friends, friend);
          }
        }

        if (data[1] !== "ACCEPTED") {
          friend[0].status = data[1];
          setFriend(...friend);
          setContacts(...friends, ...friend);
        }
      }
    });
    return () => {
      socket.off("update-contact");
    };
  }, [contacts, socket, friend, setContacts, setFriend]);

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

  useEffect(() => {
    let inContacts = [];
    contacts.map((each) => {
      return inContacts.push(each.user_id);
    });
    let strangersMessageToSee = [];
    messages.map((each) => {
      if (
        each.author !== userData[0].user_id &&
        !inContacts.includes(each.author)
      ) {
        inContacts.push(each.author);
        return strangersMessageToSee.push({
          user_pfp: defaultPfp,
          user_name: "Not added",
          friend_with: "",
          user_id: each.author,
          status: "REQUESTED",
        });
      }
      return null;
    });

    if (strangersMessageToSee.length > 0) {
      setContacts([...contacts, ...strangersMessageToSee]);
    }
  }, [messages, userData, setContacts, contacts]);

  return cloneElement(children, { friendsOnline: friendsOnline });
};

export default GetFriendRealTimeInfo;
