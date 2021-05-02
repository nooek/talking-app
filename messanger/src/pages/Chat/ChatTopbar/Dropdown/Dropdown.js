import React, { useState } from "react";
import { useFriend } from "../../../../store/friendProvider";
import {
  Container,
  Options,
  OptionsContainer,
  WarningContainer,
  WarningMessage,
} from "./Styles";
import axios from "axios"
import { useUserData } from "../../../../store/userDataProvider";

const Dropdown = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [action, setAction] = useState("");
  const { friend } = useFriend();
  const { userData } = useUserData()

  const blockFriend = () => {
    console.log("blocking friend");
    axios
      .put("http://localhost:3001/api/friend/block", {
        personId: friend.user_id,
        userId: userData[0].user_id,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const clearChat = () => {
    console.log("cleaning chat");
    axios.delete("http://localhost:3001/api/message/clearchat", {
      data: {
        author: friend.user_id,
        receiver: userData[0].user_id
      }
    }).then(res => {
      console.log(res)
    })
  };

  const actions = {
    block: () => blockFriend(),
    clearChat: () => clearChat(),
  };

  const openWarning = (message, func) => {
    if (!message) return;
    setShowWarning(true);
    setWarningMessage(message);
    setAction(func);
  };

  console.log(friend)

  return (
    <Container>
      <Options>Friend Info</Options>
      <Options
        onClick={() =>
          openWarning("Do you want to clear the chat?", "clearChat")
        }
      >
        Clear Chat
      </Options>
      <Options
        onClick={() =>
          openWarning("Do you want to block that contact?", "block")
        }
      >
        Block
      </Options>
      {showWarning === true ? (
        <WarningContainer>
          <WarningMessage>{warningMessage}</WarningMessage>
          <OptionsContainer>
            <Options onClick={actions[action]}>Yes</Options>
            <Options onClick={() => setShowWarning(!showWarning)}>No</Options>
          </OptionsContainer>
        </WarningContainer>
      ) : null}
    </Container>
  );
};

export default Dropdown;