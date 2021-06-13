/* eslint-disable import/no-named-as-default */
import React, { useState } from "react";
import Container from "./Styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useFriend } from "../../store/friendProvider";
import DefaultChat from "../../components/DefaultChat/DefaultChat";
import FindMessage from "../../components/FindMessage/FindMessage";
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import MessagesSide from "../../components/MessagesSide/MessagesSide.jsx";
import ReceiveMessage from "../../HOCs/receiveMessage";

const Chat = (props) => {
  const { friend } = useFriend();
  const [showFindMessage, setShowFindMessage] = useState(false);
  const { friendsOnline } = props;

  return (
    <ReceiveMessage>
      <Container>
        <Sidebar onlineFriend={friendsOnline} />
        {showFindMessage === true ? (
          <FindMessage click={() => setShowFindMessage(!showFindMessage)} />
        ) : null}
        {friend.user_id !== undefined ? (
          <MessagesSide onlineFriends={friendsOnline} />
        ) : (
          <DefaultChat onlineFriends={friendsOnline} />
        )}
      </Container>
    </ReceiveMessage>
  );
};

export default Chat;
