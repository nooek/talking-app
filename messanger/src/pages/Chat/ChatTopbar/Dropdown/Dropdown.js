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
import { useContacts } from "../../../../store/contactsProvider";
import { Link } from "react-router-dom"

const Dropdown = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [action, setAction] = useState("");
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData()
  const { setContacts } = useContacts()

  const openWarning = (message, func) => {
    if (!message) return;
    setShowWarning(true);
    setWarningMessage(message);
    setAction(func);
  };

  const updateFriends = () => {
    axios
      .get(
        `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
      )
      .then((res) => {
        setContacts(res.data)
        setFriend({ ...friend, blocked: 1})
      });
  };

  const blockFriend = async () => {
    await axios
      .put("http://localhost:3001/api/friend/block", {
        personId: friend.user_id,
        userId: userData[0].user_id,
      })
    updateFriends()
  };

  const clearChat = () => {
    axios.delete("http://localhost:3001/api/message/clearchat", {
      data: {
        author: friend.user_id,
        receiver: userData[0].user_id
      }
    })
  };

  const actions = {
    block: () => blockFriend(),
    clearChat: () => clearChat(),
  };
  console.log(friend)
  return (
    <Container>
      {
        friend.blocked === 0 ?
          <Link to={"/" + friend.user_name + "/" + friend.user_id + "/info"}>
            <Options>Friend Info</Options>
          </Link>
        : null
      }      
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