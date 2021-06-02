/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { findMessage } from "../../services/API/tasks/MessagesTasks";
import { useUserData } from "../../store/userDataProvider";
import { useFriend } from "../../store/friendProvider";
import {
  Container,
  Parent,
  Title,
  SearchField,
  MessagesList,
  CloseButton,
  MessageContainer,
  MessageContent,
  MessageDate,
  PersonThatSend,
} from "./Styles";

const FindMessage = (props) => {
  const [messageSearchName, setMessageSearchName] = useState("");
  const [foundMessages, setFoundMessages] = useState([]);
  const { userData } = useUserData();
  const { friend } = useFriend();
  const { click } = props;

  useEffect(() => {
    if (messageSearchName.length > 0) {
      findMessage(userData[0].user_id, messageSearchName, friend.user_id).then((res) => {
        setFoundMessages(res.data);
      });
    } else {
      setFoundMessages([]);
    }
  }, [userData, messageSearchName, friend.user_id]);

  return (
    <Container>
      <Parent>
        <Title>Find a message</Title>
        <SearchField
          placeholder="Type here the message"
          onChange={(e) => setMessageSearchName(e.target.value)}
        />
        <MessagesList>
          {foundMessages.message ? (
            <h2 style={{ color: "white" }}>{foundMessages.message}</h2>
          ) : null}
          {foundMessages.length > 0
            ? foundMessages.map((each) => {
                const formatedMessageDate = each.message_date.split("T")[0];
                return (
                  <MessageContainer key={each.message_id}>
                    <PersonThatSend>
                      {each.author === userData[0].user_id ? "You" : friend.user_name}
                    </PersonThatSend>
                    <MessageContent>{each.message}</MessageContent>
                    <MessageDate>{formatedMessageDate - each.message_time}</MessageDate>
                  </MessageContainer>
                );
              })
            : null}
          {!foundMessages.message ? <h2 style={{ color: "white" }}>Start searching</h2> : null}
        </MessagesList>
        <CloseButton onClick={click}>close</CloseButton>
      </Parent>
    </Container>
  );
};

export default FindMessage;
