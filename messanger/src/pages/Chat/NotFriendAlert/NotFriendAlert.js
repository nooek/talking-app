import React, { useState } from "react";
import { Buttons, ButtonsContainer, Container, Message, Parent } from "./Styles";
import axios from "axios";
import { useFriend } from "../../../store/friendProvider";
import { useUserData } from "../../../store/userDataProvider";

const NotFriendAlert = () => {
  const [choice, setChoice] = useState(false);
  const { friend } = useFriend();
  const { userData } = useUserData()

  const addFriend = () => {
    axios.post(`http://localhost:3001/api/friends/add`, {
      id: friend.user_id,
      userId: userData[0].user_id
    });
  };

  console.log(friend)
  console.log(friend)

  const block = () => {
    axios.put("http://localhost:3001/api/friend/block", {
      personId: friend.user_id,
      userId: userData[0].user_id
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <Container>
      {choice === true ? (
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

            <Buttons onClick={() => block()} color="secondary" variant="contained">
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      )}
    </Container>
  );
};

export default NotFriendAlert;
