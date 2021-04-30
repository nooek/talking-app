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
        <FriendPfp src={friend.friend_pfp} />
        <FriendName>{friend.friend_name}</FriendName>
      </TopbarUserInfoContainer>
      <TopbarMoreActionsContainer>
        <MoreActions />
      </TopbarMoreActionsContainer>
    </ChatTopBar>
  );
};

export default ChatTopbar;
