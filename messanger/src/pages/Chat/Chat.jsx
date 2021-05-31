import React, {
  useEffect,
  useState,
  createRef,
  useRef,
  useCallback,
} from "react";
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
  const [messageMaxToRender, setMessageMaxToRender] =
    useState(maxMessagesToRender);
  const chatScrollbarPos = createRef();
  const observer = useRef();
  const lastMessagePos = useRef()
  const lastMessageRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          console.log("Is being visible");
          lastMessagePos.current = entries[0].boundingClientRect.y
          setMessageMaxToRender(messageMaxToRender + 50);
        }
      });
      if (node) observer.current.observe(node);
    },
    [messageMaxToRender]
  );

  console.log(lastMessagePos)

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
    if (
      chatScrollbarPos.current?.scrollTop ===
      chatScrollbarPos.current?.scrollHeight
    ) {
      goToLastMessage();
    }
  }, [messages, goToLastMessage, chatScrollbarPos]);

  useEffect(() => {
    
    const justFriendMessages = messages.filter((each, index) => {
      return each.receiver === friend.user_id || each.author === friend.user_id;
    });
    if (messageMaxToRender <= 50) {
      setMessageMaxToRender(
        maxMessagesToRender + (justFriendMessages.length % 50)
      );
    }
    const messagesToRender = justFriendMessages.filter((each, index) => {
      return index >= justFriendMessages.length - messageMaxToRender
    })
    setContactsMessages([...messagesToRender])
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
    chatScrollbarPos.current?.scrollTo(
      0,
      chatScrollbarPos.current?.scrollHeight
    );
  }, [chatScrollbarPos]);

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
          >
            {showGoToLastMsg === true ? (
              <GoToLastMessageButton onClick={() => goToLastMessage()}>
                Go back
              </GoToLastMessageButton>
            ) : null}
            {contactsMessages.map((each, index) => {
                return (
                  <MessageContainer
                    key={index}
                    className="message-container"
                    sender={each.author === userData[0].user_id ? true : false}
                    ref={
                      index === contactsMessages.length - messageMaxToRender
                        ? lastMessageRef
                        : null
                    }
                  >
                    <Message className="message">{each.message}</Message>
                    {each.message_time ? (
                      <p className="ddd">
                        {each.message_time.split(":")[0] +
                          ":" +
                          each.message_time.split(":")[1]}
                      </p>
                    ) : null}
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
