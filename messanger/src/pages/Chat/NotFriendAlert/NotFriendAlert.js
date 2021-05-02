import React, { useState } from "react";
import {
  Buttons,
  ButtonsContainer,
  Container,
  Message,
  Parent,
} from "./Styles";
import axios from "axios";
import { useFriend } from "../../../store/friendProvider";
import { useUserData } from "../../../store/userDataProvider";
import { useContacts } from "../../../store/contactsProvider";

const NotFriendAlert = () => {
  const [choice, setChoice] = useState(false);
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { setContacts } = useContacts();

  const updateFriends = () => {
    axios
      .get(
        `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
      )
      .then((res) => {
        if (!res.data.message) {
          setContacts(res.data);
        }
      });
  };

  const addFriend = async () => {
    await axios.post(`http://localhost:3001/api/friends/add`, {
      id: friend.user_id,
      userId: userData[0].user_id,
    });
    setFriend({...friend, user_add: true})
    updateFriends();
  };

  const block = async () => {
    await axios
      .put("http://localhost:3001/api/friend/block", {
        personId: friend.user_id,
        userId: userData[0].user_id,
      })
      .then(res => {
        setFriend({...friend, blocked: 1, user_add: 1})
      })
    updateFriends();
  };

  return (
    <Container>
      {choice === true ? (
        <Parent>
          <Message>Are you certain?</Message>
          <ButtonsContainer>
            <Buttons
              onClick={() => addFriend()}
              color="primary"
              variant="contained"
            >
              Yes
            </Buttons>

            <Buttons
              onClick={() => setChoice(false)}
              color="secondary"
              variant="contained"
            >
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      ) : (
        <Parent>
          <Message>THIS PERSON IS NOT IN YOUR CONTACTS</Message>
          <Message>DO YOU WANT TO ADD?</Message>
          <ButtonsContainer>
            <Buttons
              onClick={() => setChoice(true)}
              color="primary"
              variant="contained"
            >
              Yes
            </Buttons>

            <Buttons
              onClick={() => block()}
              color="secondary"
              variant="contained"
            >
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      )}
    </Container>
  );
};

export default NotFriendAlert;
