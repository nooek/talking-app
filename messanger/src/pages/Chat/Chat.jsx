import React, { useState } from "react";
import {
  Container,
} from "./Styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useFriend } from "../../store/friendProvider";
import DefaultChat from "../../components/DefaultChat/DefaultChat";
import FindMessage from "../../components/FindMessage/FindMessage";
import MessagesSide from "../../components/MessagesSide/MessagesSide";

const Chat = (props) => {
  const { friend } = useFriend();
  const [showFindMessage, setShowFindMessage] = useState(false);
  const { friendsOnline } = props;

  return (
    <Container>
      <Sidebar onlineFriend={friendsOnline} />
      {showFindMessage === true ? (
        <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
      ) : null}
      {friend.user_id !== undefined ? (
        <MessagesSide />
      ) : (
        <DefaultChat />
      )}
    </Container>
  );
};

export default Chat;
