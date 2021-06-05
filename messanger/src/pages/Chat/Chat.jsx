import React, { useEffect, useState, createRef, useCallback } from "react";
import {
  Container,
} from "./Styles";
import { useUserData } from "../../store/userDataProvider";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useMessages } from "../../store/messagesProvider";
import { useFriend } from "../../store/friendProvider";
import DefaultChat from "../../components/DefaultChat/DefaultChat";
import { getMessagesData } from "../../services/API/tasks/APItasks";
import FindMessage from "../../components/FindMessage/FindMessage";
import MessagesSide from "../../components/MessagesSide/MessagesSide";

const Chat = (props) => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { friend } = useFriend();
  const [showFindMessage, setShowFindMessage] = useState(false);
  const chatScrollbarPos = createRef();
  const { friendsOnline } = props;

  useEffect(() => {
    getMessagesData(userData[0].user_id).then((res) => {
      if (!res.data.message) {
        setMessages(res.data);
      }
    });
  }, [setMessages, userData]);

  const goToLastMessage = useCallback(() => {
    chatScrollbarPos.current?.scrollTo({
      bottom: 0,
      top: chatScrollbarPos.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatScrollbarPos]);

  useEffect(() => {
    if (chatScrollbarPos.current?.scrollTop === chatScrollbarPos.current?.scrollHeight) {
      goToLastMessage();
    }
  }, [messages, goToLastMessage, chatScrollbarPos]);

  useEffect(() => {
    chatScrollbarPos.current?.scrollTo(0, chatScrollbarPos.current?.scrollHeight);
  }, [chatScrollbarPos]);

  return (
    <Container>
      <Sidebar onlineFriend={friendsOnline} />
      {showFindMessage === true ? (
        <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
      ) : null}
      {friend.user_id !== undefined ? (
        <MessagesSide />
      ) : (
        <DefaultChat />
      )}
    </Container>
  );
};

export default Chat;
