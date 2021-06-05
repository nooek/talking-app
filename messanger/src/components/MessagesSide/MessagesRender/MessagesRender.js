import React, { useState, useEffect } from "react";
import { getMessagesData } from "../../../services/API/tasks/APItasks";
import { useContacts } from "../../../store/contactsProvider";
import { useFriend } from "../../../store/friendProvider";
import { useMessages } from "../../../store/messagesProvider";
import { useSocket } from "../../../store/socketProvider";
import { useUserData } from "../../../store/userDataProvider";
import {
  MessageContainer,
  Message,
//   MessageTime
} from "./Styles";

const MessagesRender = () => {
  const [contactsMessages, setContactsMessages] = useState([]);
  const { messages, setMessages } = useMessages();
  const { userData } = useUserData();
  const { friend } = useFriend();
  const { socket } = useSocket();
  const { contacts } = useContacts();

  useEffect(() => {
    getMessagesData(userData[0].user_id).then((res) => {
      if (!res.data.message) {
        setMessages(res.data);
      }
    });
  }, [setMessages, userData]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      const blockedContactsList = [];

      contacts.map((each) => {
        if (each.status === "BLOCKED") {
          return blockedContactsList.push(each.user_id);
        }
        return null;
      });

      if (message.author !== friend.user_id) {
        message.seen = false;
      }

      if (!blockedContactsList.includes(message.author)) {
        setMessages([...messages, message]);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, setMessages, userData, contacts, friend]);

  useEffect(() => {
    const justFriendMessages = messages.filter(
      (each) => each.receiver === friend.user_id || each.author === friend.user_id,
    );
    setContactsMessages([...justFriendMessages]);
  }, [
    messages,
    setMessages,
    friend,
    contactsMessages.length,
  ]);

  return (
    contactsMessages.map((each) => {
      each.seen = true;
      return (
        <MessageContainer
          key={each.message_id}
          className="message-container"
          sender={each.author === userData[0].user_id}
        >
          <Message className="message">{each.message}</Message>
        </MessageContainer>
      );
    })
  );
};

export default MessagesRender;
