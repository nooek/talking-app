import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useContacts } from "../../../store/contactsProvider";
import { useFriend } from "../../../store/friendProvider";
import { useMessages } from "../../../store/messagesProvider";
import { useSocket } from "../../../store/socketProvider";
import { useUserData } from "../../../store/userDataProvider";
import { MessageContainer, Message, MessageTime } from "./Styles";
import { useContactMessages } from "../../../store/contactMessagesProvider";
import messageNotificationSound from "../../../assets/sounds/message-notification.ogg";

const MessagesRender = () => {
  const { messages, setMessages } = useMessages();
  const { userData } = useUserData();
  const { friend } = useFriend();
  const { socket } = useSocket();
  const { contacts, setContacts } = useContacts();
  const { contactMessages, setContactMessages } = useContactMessages();
  const [page, setPage] = useState(0);
  const [tradeFriend, setTradeFriend] = useState(false);
  const observer = useRef();
  const lastMessagePos = useRef();

  const lastMessageRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        lastMessagePos.current = entries[0].boundingClientRect.y;
        console.log("seing");
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    setContactMessages([]);
    setPage(1);
    setTradeFriend(!tradeFriend);
  }, [friend]);

  useEffect(() => {
    console.log("das");
    axios
      .get(`http://localhost:3001/api/message/contactmessage/${friend.user_id}/${userData[0].user_id}/${page}`)
      .then((res) => {
        if (res.data) {
          if (res.data.maxResults !== contactMessages.length) {
            const newMessages = res.data.messages;
            setContactMessages([...contactMessages, ...newMessages]);
          }
        }
      });
  }, [tradeFriend, page]);

  const playAudio = (audio) => {
    audio.play();
  };

  console.log(contactMessages);

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
        console.log(contactMessages);
        setContactMessages((prevContactMessages) => [message, ...prevContactMessages.reverse()]);
        setMessages([message, ...messages]);
        const contactsWithoutFriend = contacts.filter((each) => each.user_id !== message.author);
        const messageAuthor = contacts.filter((each) => each.user_id === message.author);
        setContacts([...messageAuthor, ...contactsWithoutFriend]);
        playAudio(new Audio(messageNotificationSound));
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, setMessages, userData, contacts, friend]);

  return contactMessages.map((each, index) => {
    each.seen = true;
    return (
      <MessageContainer
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className="message-container"
        sender={each.author === userData[0].user_id}
        ref={index === contactMessages.length - 1 ? lastMessageRef : null}
      >
        <Message className="message">{each.message}</Message>
        {
          each.message_time !== undefined && each.message_time !== null
            ? <MessageTime>{`${each.message_time.split(":")[0]}:${each.message_time.split(":")[1]}`}</MessageTime>
            : null
        }
      </MessageContainer>
    );
  });
};

export default MessagesRender;
