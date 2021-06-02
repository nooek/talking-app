import React, { useState } from "react";
import { useFriend } from "../../store/friendProvider";
import Dropdown from "./Dropdown/Dropdown";
import {
  ChatTopBar,
  TopbarUserInfoContainer,
  FriendPfp,
  FriendName,
  TopbarMoreActionsContainer,
  DropdownOpen,
  SearchIcon,
} from "./Styles";

const ChatTopbar = (props) => {
  const { friend } = useFriend();
  const { clickSearch } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <ChatTopBar>
      <TopbarUserInfoContainer>
        <FriendPfp src={friend.user_pfp} />
        <FriendName>{friend.user_name}</FriendName>
      </TopbarUserInfoContainer>
      <TopbarMoreActionsContainer>
        <SearchIcon onClick={clickSearch} />
        <DropdownOpen onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown === true ? <Dropdown /> : null}
      </TopbarMoreActionsContainer>
    </ChatTopBar>
  );
};

export default ChatTopbar;
