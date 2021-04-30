import React, { useEffect } from "react";
import {
  Container,
  ChatSide,
  MessagesContainer,
  MessageContainer,
  Message,
} from "./Styles";
import { useUserData } from "../../store/userDataProvider";
import Sidebar from "./Sidebar/Sidebar";
import { useActualChat } from "../../store/ActualChatProvider";
import { useSocket } from "../../store/socketProvider";
import { useMessages } from "../../store/messagesProvider";
import ChatTopbar from "./ChatTopbar/ChatTopbar";
import ChatSendMessage from "./ChatSendMsg/ChatSendMsg";
import MobileTopbar from "./Sidebar/MobileTopbar/MobileTopbar";
import DefaultChat from "./DefaultChat/DefaultChat";
import axios from "axios"

const Chat = () => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { currentChat } = useActualChat();
  const { socket } = useSocket();

  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/message/${userData[0].user_id}`)
    .then(res => {
      if (res.data){
        setMessages(res.data)
      }
    })
  }, [setMessages, userData])

  console.log(messages)

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, setMessages]);

  return (
    <Container>
      <Sidebar />
      {currentChat !== undefined ? (
        <ChatSide background="rgb(53, 53, 53)" >
          <MobileTopbar chat={true} />
          <ChatTopbar />
          <MessagesContainer>
            {messages.map((each, index) => {
              if (
                (each.author === userData[0].user_id ||
                  each.author === currentChat) &&
                (each.receiver === userData[0].user_id ||
                  each.receiver === currentChat)
              ) {
                return (
                  <MessageContainer
                    key={index}
                    sender={each.author === userData[0].user_id ? true : false}
                  >
                    <Message>{each.message}</Message>
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