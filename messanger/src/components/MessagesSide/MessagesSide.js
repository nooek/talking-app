import React, { useState } from "react";
import { useFriend } from "../../store/friendProvider";
import { useUserData } from "../../store/userDataProvider";
import ChatSendMessage from "../ChatSendMsg/ChatSendMsg";
import ChatTopbar from "../ChatTopbar/ChatTopbar";
import MobileTopbar from "../MobileTopbar/MobileTopbar";
import NotFriendAlert from "../NotFriendAlert/NotFriendAlert";
import MessagesRender from "./MessagesRender/MessagesRender";
import {
  ChatSide,
  MessagesContainer,
} from "./Styles";

const MessagesSide = () => {
  const { userData } = useUserData();
  const { friend } = useFriend();
  // const [showGoToLastMsg] = useState(false);
  const [showFindMessage, setShowFindMessage] = useState(false);

  return (
    <ChatSide id="chat-side">
      <MobileTopbar />
      <ChatTopbar clickSearch={() => setShowFindMessage(!showFindMessage)} />
      {friend.status === "REQUESTED" && friend.friend_with !== userData[0].user_id ? (
        <NotFriendAlert />
      ) : null}
      <MessagesContainer id="msg-container" className="messages-container">
        {/* {showGoToLastMsg === true ? (
          <GoToLastMessageButton onClick={() => goToLastMessage()}>Go back</GoToLastMessageButton>
        ) : null} */}
        <MessagesRender />
      </MessagesContainer>
      <ChatSendMessage userdata={userData} />
    </ChatSide>
  );
};

export default MessagesSide;
