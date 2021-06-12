import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFriend } from "../../../store/friendProvider";
import { useMessages } from "../../../store/messagesProvider";
import {
  ContactImage,
  Container,
  InfoContainer,
  Parent,
  InformationName,
  Information,
  GoBack,
  SubInfo,
} from "./Styles";

const FriendInfo = () => {
  const { friend } = useFriend();
  const { messages } = useMessages();
  const [chatMessagesQuantity, setChatMessagesQuantity] = useState(0);

  useEffect(() => {
    const chatMessages = messages.filter(
      (each) => friend.user_id === each.receiver || friend.user_id === each.author,
    );
    setChatMessagesQuantity(chatMessages.length);
  }, [friend.user_id, messages]);

  return (
    <Container>
      <Link to="/">
        <GoBack />
      </Link>
      <Parent>
        <ContactImage src={friend.user_pfp} />
        <InfoContainer>
          <InformationName>Name</InformationName>
          <Information>{friend.user_name}</Information>
        </InfoContainer>
        <InfoContainer>
          <InformationName>Description</InformationName>
          <Information>{friend.user_desc}</Information>
        </InfoContainer>
        <SubInfo>
          This chat has
          {chatMessagesQuantity}
          messages
        </SubInfo>
      </Parent>
    </Container>
  );
};

export default FriendInfo;
