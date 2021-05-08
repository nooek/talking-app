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
import { useSocket } from "../../store/socketProvider";
import { useMessages } from "../../store/messagesProvider";
import { useFriend } from "../../store/friendProvider";
import ChatTopbar from "./ChatTopbar/ChatTopbar";
import ChatSendMessage from "./ChatSendMsg/ChatSendMsg";
import MobileTopbar from "./Sidebar/MobileTopbar/MobileTopbar";
import DefaultChat from "./DefaultChat/DefaultChat";
import axios from "axios";
import NotFriendAlert from "./NotFriendAlert/NotFriendAlert";
import { useContacts } from "../../store/contactsProvider";

const Chat = () => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  const { friend } = useFriend();
  const { contacts } = useContacts()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/message/${userData[0].user_id}`)
      .then((res) => {
        if (res.data) {
          setMessages(res.data);
        }
      });
  }, [setMessages, userData]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      const blockedContactsList = []
      contacts.map(each => {
        if (each.status === "BLOCKED"){
          return blockedContactsList.push(each.user_id)
        }
        return null
      })

      if (!blockedContactsList.includes(message.author)){
        setMessages([...messages, message]);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, setMessages, userData, contacts]);

  return (
    <Container>
      <Sidebar />
      {friend.user_id !== undefined ? (
        <ChatSide>
          <MobileTopbar chat={true} />
          <ChatTopbar />
          {friend.status === "REQUESTED" && friend.friend_with !== userData[0].user_id ? 
          <NotFriendAlert /> 
          : null}
          <MessagesContainer>
            {messages.map((each, index) => {
              if (
                (each.receiver === friend.user_id ||
                each.author === friend.user_id)
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