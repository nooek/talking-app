import React, { useState } from "react";
import { useFriend } from "../../store/friendProvider";
import Dropdown from "./Dropdown/Dropdown";
import FindMessage from "../FindMessage/FindMessage";
import {
  ChatTopBar,
  TopbarUserInfoContainer,
  FriendPfp,
  FriendName,
  TopbarMoreActionsContainer,
  DropdownOpen,
  SearchIcon,
} from "./Styles";

const ChatTopbar = () => {
  const { friend } = useFriend();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  return (
    <ChatTopBar>
      <TopbarUserInfoContainer>
        <FriendPfp src={friend.user_pfp} />
        <FriendName>{friend.user_name}</FriendName>
      </TopbarUserInfoContainer>
      <TopbarMoreActionsContainer>
        <SearchIcon
          onClick={() => setShowMessageSearch(!showMessageSearch)}
        />
        <DropdownOpen onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown === true ? <Dropdown /> : null}
        {showMessageSearch === true
          ? <FindMessage click={() => setShowMessageSearch(!showMessageSearch)} />
          : null}
      </TopbarMoreActionsContainer>
    </ChatTopBar>
  );
};

export default ChatTopbar;
