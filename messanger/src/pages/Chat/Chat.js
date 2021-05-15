import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  ChatSide,
  MessagesContainer,
  MessageContainer,
  Message,
  GoToLastMessageButton,
} from "./Styles";
import { useUserData } from "../../store/userDataProvider";
import Sidebar from "./Sidebar/Sidebar";
import { useSocket } from "../../store/socketProvider";
import { useMessages } from "../../store/messagesProvider";
import { useFriend } from "../../store/friendProvider";
import ChatTopbar from "./ChatTopbar/ChatTopbar";
import ChatSendMessage from "../../components/ChatSendMsg/ChatSendMsg";
import MobileTopbar from "./Sidebar/MobileTopbar/MobileTopbar";
import DefaultChat from "../../components/DefaultChat/DefaultChat";
import NotFriendAlert from "../../components/NotFriendAlert/NotFriendAlert";
import { useContacts } from "../../store/contactsProvider";
import { getMessagesData } from "../../services/API/tasks/APItasks";
import FindMessage from "../../components/FindMessage/FindMessage";
import updateContactStatus from "./functions/updateContactStatus";

const Chat = (props) => {
  const { userData } = useUserData();
  const { messages, setMessages } = useMessages();
  const { socket } = useSocket();
  const { friend, setFriend } = useFriend();
  const { contacts, setContacts } = useContacts();
  const [showGoToLastMsg, setShowGoToLastMsg] = useState(false);
  const [showFindMessage, setShowFindMessage] = useState(false);
  const chatScrollbarPos = useRef(null);

  useEffect(() => {
    getMessagesData(userData[0].user_id).then((res) => {
      if (!res.data.message) {
        setMessages(res.data);
      }
    });
  }, [setMessages, userData, setContacts]);

  useEffect(() => {
    socket.on("update-contact", (data) => {
      const res = updateContactStatus(data, contacts, friend);
      console.log(res);
      if (res && res.length > 0) {
        if (res[0].status === "DENIED") {
          setFriend([]);
        }
        const newContacts = contacts.filter((each) => {
          return each.user_id !== res[0].id;
        });
        if (res[0].status !== "DENIED") {
          setContacts([...newContacts, res[0].newContact]);
          setFriend({ ...friend, status: res[0].status });
        }
      }
    });
    return () => {
      socket.off("update-contact");
    };
  }, [contacts, socket, friend, setContacts, setFriend]);

  useEffect(() => {
    chatScrollbarPos.current?.scrollTo(
      0,
      chatScrollbarPos.current?.scrollHeight
    );
  }, [friend]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      const blockedContactsList = [];
      contacts.map((each) => {
        if (each.status === "BLOCKED") {
          return blockedContactsList.push(each.user_id);
        }
        return null;
      });

      if (!blockedContactsList.includes(message.author)) {
        const newContacts = contacts.filter((each) => {
          return each.user_id !== message.author;
        });
        setMessages([...messages, message]);
        contacts.map((each) => {
          if (
            each.user_id === message.author ||
            each.user_id === message.receiver
          ) {
            each.lastMessage = message.message;
            setContacts([...newContacts, each]);
          }
          return 0;
        });
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, setMessages, userData, contacts, setContacts]);

  const checkPosition = () => {
    if (
      chatScrollbarPos.current?.scrollTop <=
      chatScrollbarPos.current?.scrollHeight - 2208
    ) {
      setShowGoToLastMsg(true);
    } else {
      setShowGoToLastMsg(false);
    }
  };

  const goToLastMessage = () => {
    chatScrollbarPos.current?.scrollTo({
      bottom: 0,
      top: chatScrollbarPos.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  console.log(props.friendsOnline)

  return (
    <Container>
      <Sidebar onlineFriend={props.friendsOnline} />
      {showFindMessage === true ? (
        <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
      ) : null}
      {friend.user_id !== undefined ? (
        <ChatSide id="chat-side">
          <MobileTopbar chat={true} onlineFriend={props.friendsOnline.length ? props.friendsOnline : []} />
          <ChatTopbar
            clickSearch={() => setShowFindMessage(!showFindMessage)}
          />
          {friend.status === "REQUESTED" &&
          friend.user_id !== userData[0].user_id ? (
            <NotFriendAlert />
          ) : null}
          <MessagesContainer
            id="msg-container"
            ref={chatScrollbarPos}
            onScroll={() => checkPosition()}
          >
            {showGoToLastMsg === true ? (
              <GoToLastMessageButton onClick={() => goToLastMessage()}>
                Go back
              </GoToLastMessageButton>
            ) : null}
            {messages.map((each, index) => {
              if (
                each.receiver === friend.user_id ||
                each.author === friend.user_id
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

// axios
//   .get(`http://localhost:3001/api/message/${userData[0].user_id}`)
//   .then((res) => {
//     if (res.data) {
//       setMessages(res.data);
//     }
//   });
