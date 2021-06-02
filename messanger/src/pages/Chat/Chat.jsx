import React, { useEffect, useState, createRef, useRef, useCallback } from "react";
import {
  Container,
  ChatSide,
  MessagesContainer,
  MessageContainer,
  Message,
  GoToLastMessageButton,
} from "./Styles";
import { useUserData } from "../../store/userDataProvider";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSocket } from "../../store/socketProvider";
import { useMessages } from "../../store/messagesProvider";
import { useFriend } from "../../store/friendProvider";
import ChatTopbar from "../../components/ChatTopbar/ChatTopbar";
import ChatSendMessage from "../../components/ChatSendMsg/ChatSendMsg";
import MobileTopbar from "../../components/MobileTopbar/MobileTopbar";
import DefaultChat from "../../components/DefaultChat/DefaultChat";
import NotFriendAlert from "../../components/NotFriendAlert/NotFriendAlert";
import { useContacts } from "../../store/contactsProvider";
import { getMessagesData } from "../../services/API/tasks/APItasks";
import FindMessage from "../../components/FindMessage/FindMessage";

const Chat = (props) => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  const { friend } = useFriend();
  const { contacts } = useContacts();
  const { friendsOnline } = props;
  const [showGoToLastMsg] = useState(false);
  const [showFindMessage, setShowFindMessage] = useState(false);
  const [contactsMessages, setContactsMessages] = useState([]);
  const maxMessagesToRender = 50;
  const [messageMaxToRender, setMessageMaxToRender] = useState(maxMessagesToRender);
  const chatScrollbarPos = createRef();
  const observer = useRef();
  const lastMessagePos = useRef();
  const lastMessageRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          lastMessagePos.current = entries[0].boundingClientRect.y;
          setMessageMaxToRender(messageMaxToRender + 50);
        }
      });
      if (node) observer.current.observe(node);
    },
    [messageMaxToRender],
  );

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
    setMessageMaxToRender(50);
  }, [friend]);

  useEffect(() => {
    if (chatScrollbarPos.current?.scrollTop === chatScrollbarPos.current?.scrollHeight) {
      goToLastMessage();
    }
  }, [messages, goToLastMessage, chatScrollbarPos]);

  useEffect(() => {
    const justFriendMessages = messages.filter(
      (each) => each.receiver === friend.user_id || each.author === friend.user_id,
    );
    if (messageMaxToRender <= 50) {
      setMessageMaxToRender(maxMessagesToRender + (justFriendMessages.length % 50));
    }
    const messagesToRender = justFriendMessages.filter(
      (each, index) => index >= justFriendMessages.length - messageMaxToRender,
    );
    setContactsMessages([...messagesToRender]);
  }, [
    messages,
    setMessages,
    friend,
    setMessageMaxToRender,
    contactsMessages.length,
    messageMaxToRender,
  ]);

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
    chatScrollbarPos.current?.scrollTo(0, chatScrollbarPos.current?.scrollHeight);
  }, [chatScrollbarPos]);

  return (
    <Container>
      <Sidebar onlineFriend={friendsOnline} />
      {showFindMessage === true ? (
        <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
      ) : null}
      {friend.user_id !== undefined ? (
        <ChatSide id="chat-side">
          <MobileTopbar onlineFriends={friendsOnline} />
          <ChatTopbar clickSearch={() => setShowFindMessage(!showFindMessage)} />
          {friend.status === "REQUESTED" && friend.friend_with !== userData[0].user_id ? (
            <NotFriendAlert />
          ) : null}
          <MessagesContainer
            id="msg-container"
            ref={chatScrollbarPos}
            className="messages-container"
          >
            {showGoToLastMsg === true ? (
              <GoToLastMessageButton onClick={() => goToLastMessage()}>
                Go back
              </GoToLastMessageButton>
            ) : null}
            {contactsMessages.map((each, index) => {
              each.seen = true;
              return (
                <MessageContainer
                  key={each.message_id}
                  className="message-container"
                  sender={each.author === userData[0].user_id}
                  ref={
                    index === contactsMessages.length - messageMaxToRender ? lastMessageRef : null
                  }
                >
                  <Message className="message">{each.message}</Message>
                </MessageContainer>
              );
            })}
          </MessagesContainer>
          <ChatSendMessage userdata={userData} />
        </ChatSide>
      ) : (
        <DefaultChat />
      )}
    </Container>
  );
};

export default Chat;
