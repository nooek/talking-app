import React, { useState } from "react";
import axios from "axios";
import { Buttons, ButtonsContainer, Container, Message, Parent } from "./Styles";
import { useFriend } from "../../store/friendProvider";
import { useUserData } from "../../store/userDataProvider";
import { useContacts } from "../../store/contactsProvider";
import { useSocket } from "../../store/socketProvider";
import { getFriendsData } from "../../services/API/tasks/APItasks";

const NotFriendAlert = () => {
  const [choice, setChoice] = useState(false);
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { setContacts } = useContacts();
  const { socket } = useSocket();

  const updateFriends = async (status) => {
    const response = await getFriendsData(userData[0].user_id);
    setContacts(response.data);
    setFriend([]);
    socket.emit("update-friend-status", friend.user_id, userData[0].user_id, status);
  };

  const acceptRequest = () => {
    axios
      .put("http://localhost:3001/api/friends/updatestatus", {
        personId: userData[0].user_id,
        userId: friend.user_id,
        newStatus: "ACCEPTED",
      })
      .then(() => {
        updateFriends("ACCEPTED");
      });
  };

  const denyRequest = () => {
    axios
      .put("http://localhost:3001/api/friends/updatestatus", {
        personId: userData[0].user_id,
        userId: friend.user_id,
        newStatus: "DENIED",
      })
      .then(() => {
        updateFriends("DENIED");
      });
  };

  return (
    <Container>
      {choice === true ? (
        <Parent>
          <Message>Are you certain?</Message>
          <ButtonsContainer>
            <Buttons onClick={() => acceptRequest()} color="primary" variant="contained">
              Yes
            </Buttons>

            <Buttons onClick={() => setChoice(false)} color="secondary" variant="contained">
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      ) : (
        <Parent>
          <Message>This person is not your contact</Message>
          <Message>Do you want to add?</Message>
          <ButtonsContainer>
            <Buttons onClick={() => setChoice(true)} color="primary" variant="contained">
              Yes
            </Buttons>

            <Buttons onClick={() => denyRequest()} color="secondary" variant="contained">
              No
            </Buttons>
          </ButtonsContainer>
        </Parent>
      )}
    </Container>
  );
};

export default NotFriendAlert;
