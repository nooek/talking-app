import React, { useState } from "react";
import { useFriend } from "../../../store/friendProvider";
import Dropdown from "./Dropdown/Dropdown";
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
  const [showDropdown, setShowDropdown] = useState()

  return (
    <ChatTopBar>
      <TopbarUserInfoContainer>
        <FriendPfp src={friend.user_pfp} />
        <FriendName>{friend.user_name}</FriendName>
      </TopbarUserInfoContainer>
      <TopbarMoreActionsContainer>
        <MoreActions 
        onClick={() => setShowDropdown(!showDropdown)}
        />
        {
          showDropdown === true ?
            <Dropdown />
          : null
        }
      </TopbarMoreActionsContainer>
    </ChatTopBar>
  );
};

export default ChatTopbar;
