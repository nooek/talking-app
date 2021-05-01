import React, { useState } from "react";
import { Buttons, ButtonsContainer, Container, Message, Parent } from "./Styles";
import axios from "axios";
import { useFriend } from "../../../store/friendProvider";

const NotFriendAlert = () => {
  const [choice, setChoice] = useState(false);
  const { friend } = useFriend();
  console.log(friend);

  const addFriend = () => {
    axios.post(`http://localhost:3001/api/friends/add`, {
      id: friend.user_id,
      name: friend.user_name,
      pfp: friend.user_pfp,
      description: friend.user_desc,
      friendWith: friend[0].user_id,
    });
  };

  return (
    <Container>
      {choice !== "" && choice === true ? (
        <Parent>
          <Message>Are you certain?</Message>
          <ButtonsContainer>
            <Buttons onClick={() => addFriend()} color="primary" variant="contained">
              Yes
            </Buttons>

            <Buttons onClick={() => setChoice(false)} color="secondary" variant="contained">
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      ) : (
        <Parent>
          <Message>THIS PERSON IS NOT IN YOUR CONTACTS</Message>
          <Message>DO YOU WANT TO ADD?</Message>
          <ButtonsContainer>
            <Buttons onClick={() => setChoice(true)} color="primary" variant="contained">
              Yes
            </Buttons>

            <Buttons onClick={() => setChoice(false)} color="secondary" variant="contained">
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      )}
    </Container>
  );
};

export default NotFriendAlert;
