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
import { useSocket } from "../../../store/socketProvider"

const NotFriendAlert = () => {
  const [choice, setChoice] = useState(false);
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { setContacts } = useContacts();
  const { socket } = useSocket()

  const updateFriends = async (status) => {
    const { data } = await axios.get(
      `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
    );
    if (data) {
      setContacts(data);
      setFriend([]);
      socket.emit("update-friend-status", friend.user_id, userData[0].user_id, status)
    }
  };

  const acceptRequest = () => {
    console.log("foo1");
    axios
      .put(`http://localhost:3001/api/friends/updatestatus`, {
        personId: userData[0].user_id,
        userId: friend.user_id,
        newStatus: "ACCEPTED"
      })
      .then((res) => {
        updateFriends("ACCEPTED");
      });
  };

  const denyRequest = () => {
    axios.put("http://localhost:3001/api/friends/updatestatus", {
      personId: userData[0].user_id,
      userId: friend.user_id,
      newStatus: "DENIED"
    }).then(res => {
      console.log(friend)
      updateFriends("DENIED")
    })
  };

  return (
    <Container>
      {choice === true ? (
        <Parent>
          <Message>Are you certain?</Message>
          <ButtonsContainer>
            <Buttons
              onClick={() => acceptRequest()}
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
              onClick={() => denyRequest()}
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
