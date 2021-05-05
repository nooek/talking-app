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

  const updateFriends = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
    );
    if (data) {
      setContacts(data);
      setFriend([]);
    }
  };

  const addFriend = async () => {
    console.log("foo1");
    await axios
      .post(`http://localhost:3001/api/friends/add`, {
        id: friend.user_id,
        userId: userData[0].user_id,
      })
      .then((res) => {
        updateFriends();
      });
  };

  const block = () => {
    axios.put("http://localhost:3001/api/friend/block", {
      personId: userData[0].user_id,
      userId: friend.user_id,
    }).then(res => {
      console.log(friend)
      updateFriends()
    })
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
          <Message>This person is not your contact</Message>
          <Message>Do you want to add?</Message>
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
