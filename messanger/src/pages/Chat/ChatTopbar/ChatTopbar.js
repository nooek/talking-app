import React from "react";
import { useFriend } from "../../../store/friendProvider";
import {
  ChatTopBar,
  TopbarUserInfoContainer,
  FriendPfp,
  FriendName,
  TopbarMoreActionsContainer,
  MoreActions,
} from "./Styles";

const ChatTopbar = () => {
  const { friend } = useFriend();
  return (
    <ChatTopBar>
      <TopbarUserInfoContainer>
        <FriendPfp src={friend.user_pfp} />
        <FriendName>{friend.user_name}</FriendName>
      </TopbarUserInfoContainer>
      <TopbarMoreActionsContainer>
        <MoreActions />
      </TopbarMoreActionsContainer>
    </ChatTopBar>
  );
};

export default ChatTopbar;
