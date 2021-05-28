import React, { useEffect, useState, createRef, useCallback } from "react";
import {
  Container,
  ChatSide,
  MessagesContainer,
  MessageContainer,
  Message,
  GoToLastMessageButton,
} from "./Styles";
import { useUserData } from "../../store/userDataProvider";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useSocket } from "../../store/socketProvider";
import { useMessages } from "../../store/messagesProvider";
import { useFriend } from "../../store/friendProvider";
import ChatTopbar from "../../components/ChatTopbar/ChatTopbar.jsx";
import ChatSendMessage from "../../components/ChatSendMsg/ChatSendMsg.jsx";
import MobileTopbar from "../../components/MobileTopbar/MobileTopbar.jsx";
import DefaultChat from "../../components/DefaultChat/DefaultChat.jsx";
import NotFriendAlert from "../../components/NotFriendAlert/NotFriendAlert.jsx";
import { useContacts } from "../../store/contactsProvider";
import { getMessagesData } from "../../services/API/tasks/APItasks";
import FindMessage from "../../components/FindMessage/FindMessage.jsx";

const Chat = (props) => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  const { friend } = useFriend();
  const { contacts } = useContacts();
  const [showGoToLastMsg, setShowGoToLastMsg] = useState(false);
  const [showFindMessage, setShowFindMessage] = useState(false);
  const [contactsMessages, setContactsMessages] = useState([]);
  const maxMessagesToRender = 50;
  const [messageMaxToRender, setMessageMaxToRender] = useState(maxMessagesToRender);
  const chatScrollbarPos = createRef();

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
    if (
      chatScrollbarPos.current?.scrollTop ===
      chatScrollbarPos.current?.scrollHeight
    ) {
      goToLastMessage();
    }
  }, [messages, goToLastMessage, chatScrollbarPos]);

  useEffect(() => {
    const justFriendMessages = messages.filter((each) => {
      return each.receiver === friend.user_id || each.author === friend.user_id;
    });
    setContactsMessages([...justFriendMessages]);
    const restOfAnUnequalDivision =
      contactsMessages.length % maxMessagesToRender;
    setMessageMaxToRender(maxMessagesToRender + restOfAnUnequalDivision);
  }, [
    messages,
    setMessages,
    friend,
    setMessageMaxToRender,
    contactsMessages.length,
  ]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      const blockedContactsList = [];
      console.log(message);
      contacts.map((each) => {
        if (each.status === "BLOCKED") {
          return blockedContactsList.push(each.user_id);
        }
        return null;
      });

      if (message.author !== friend.user_id) {
        message.seen = true;
        contacts.map((each, index) => {
          if (each.user_id === message.author) {
            contacts[index].newMessage = true;
          }
          return 0;
        });
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
    if (
      messageMaxToRender > maxMessagesToRender &&
      messageMaxToRender !== contactsMessages.length
    ) {
      chatScrollbarPos.current?.scrollTo(
        0,
        chatScrollbarPos.current?.scrollHeight /
          (messageMaxToRender / maxMessagesToRender)
      );
    }
  }, [messageMaxToRender, chatScrollbarPos, contactsMessages]);

  const checkPosition = () => {
    if (
      chatScrollbarPos.current?.scrollTop === 0 &&
      messageMaxToRender < contactsMessages.length
    ) {
      setMessageMaxToRender(messageMaxToRender + 50 + (contactsMessages.length % maxMessagesToRender));
      chatScrollbarPos.current?.scrollTo(
        0,
        chatScrollbarPos.current?.scrollHeight /
        (messageMaxToRender % contactsMessages.length) + (contactsMessages.length / messageMaxToRender)
      );
    }
    
    // if (
    //   chatScrollbarPos.current?.scrollTop <=
    //   chatScrollbarPos.current?.scrollHeight - 2208
    // ) {
    //   setShowGoToLastMsg(true);
    // } else {
    //   setShowGoToLastMsg(false);
    // }
  };

  return (
    <Container>
      <Sidebar onlineFriend={props.friendsOnline} />
      {showFindMessage === true ? (
        <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
      ) : null}
      {friend.user_id !== undefined ? (
        <ChatSide id="chat-side">
          <MobileTopbar chat={true} onlineFriends={props.friendsOnline} />
          <ChatTopbar
            clickSearch={() => setShowFindMessage(!showFindMessage)}
          />
          {friend.status === "REQUESTED" &&
          friend.friend_with !== userData[0].user_id ? (
            <NotFriendAlert />
          ) : null}
          <MessagesContainer
            id="msg-container"
            ref={chatScrollbarPos}
            className="messages-container"
            onScroll={() => checkPosition()}
          >
            {showGoToLastMsg === true ? (
              <GoToLastMessageButton onClick={() => goToLastMessage()}>
                Go back
              </GoToLastMessageButton>
            ) : null}
            {contactsMessages.map((each, index) => {
              if (index >= contactsMessages.length - messageMaxToRender) {
                return (
                  <MessageContainer
                    key={index}
                    sender={each.author === userData[0].user_id ? true : false}
                  >
                    <Message>{each.message}</Message>
                    {each.message_time ? (
                      <p>
                        {each.message_time.split(":")[0] +
                          ":" +
                          each.message_time.split(":")[1]}
                      </p>
                    ) : null}
                  </MessageContainer>
                );
              } else {
                return null;
              }
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
