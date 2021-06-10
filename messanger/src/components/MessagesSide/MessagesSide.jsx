import React, { useState, useRef } from "react";
import { useFriend } from "../../store/friendProvider";
import { useUserData } from "../../store/userDataProvider";
// import { useContactMessages } from "../../store/contactMessagesProvider";
import ChatSendMessage from "../ChatSendMsg/ChatSendMsg";
import ChatTopbar from "../ChatTopbar/ChatTopbar";
import MobileTopbar from "../MobileTopbar/MobileTopbar";
import NotFriendAlert from "../NotFriendAlert/NotFriendAlert";
import MessagesRender from "./MessagesRender/MessagesRender";
import {
  ChatSide,
  MessagesContainer,
  GoToLastMessageButton,
} from "./Styles";

const MessagesSide = (props) => {
  const { userData } = useUserData();
  const { friend } = useFriend();
  const [showFindMessage, setShowFindMessage] = useState(false);
  const [goLastMessage, setGoLastMessage] = useState(false);
  // const { contactMessages } = useContactMessages();
  const { onlineFriends } = props;
  const messagesContainerRef = useRef();

  console.log(props);

  const goToLastSendedMessage = () => {
    messagesContainerRef?.current?.scrollTo({
      bottom: "0",
      top: "0",
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (messagesContainerRef?.current?.scrollTop > 300) {
      setGoLastMessage(true);
    } else {
      setGoLastMessage(false);
    }
  };

  // useEffect(() => {
  //   if (contactMessages && contactMessages.length > 0) {
  //     if (contactMessages[0].author === userData[0].user_id) {
  //       goToLastSendedMessage();
  //     }
  //   }
  // }, [contactMessages]);

  return (
    <ChatSide id="chat-side">
      <MobileTopbar onlineFriends={onlineFriends} />
      <ChatTopbar clickSearch={() => setShowFindMessage(!showFindMessage)} />
      {friend.status === "REQUESTED" && friend.friend_with !== userData[0].user_id ? (
        <NotFriendAlert />
      ) : null}
      <MessagesContainer
        onScroll={handleScroll}
        id="msg-container"
        className="messages-container"
        ref={(el) => { messagesContainerRef.current = el; }}
      >
        {goLastMessage === true ? (
          <GoToLastMessageButton
            onClick={() => goToLastSendedMessage()}
          >
            Go back
          </GoToLastMessageButton>
        ) : null}
        <MessagesRender />
      </MessagesContainer>
      <ChatSendMessage userdata={userData} />
    </ChatSide>
  );
};

export default MessagesSide;
