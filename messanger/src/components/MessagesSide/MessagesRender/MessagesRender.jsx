import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useFriend } from "../../../store/friendProvider";
import { useUserData } from "../../../store/userDataProvider";
import { MessageContainer, Message, MessageTime } from "./Styles";
import { useContactMessages } from "../../../store/contactMessagesProvider";

const MessagesRender = () => {
  const { userData } = useUserData();
  const { friend } = useFriend();
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
    axios
      .get(`http://localhost:3001/api/message/contactmessage/${friend.user_id}/${userData[0].user_id}/${page}`)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          if (res.data.maxResults !== contactMessages.length) {
            const newMessages = res.data.messages;
            setContactMessages([...contactMessages, ...newMessages]);
          }
        }
      });
  }, [tradeFriend, page]);

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
