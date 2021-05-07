import React, { useState } from "react";
import { useFriend } from "../../../../store/friendProvider";
import {
  Container,
  Options,
  OptionsContainer,
  WarningContainer,
  WarningMessage,
} from "./Styles";
import axios from "axios";
import { useUserData } from "../../../../store/userDataProvider";
import { useContacts } from "../../../../store/contactsProvider";
import { Link } from "react-router-dom";
import { useMessages } from "../../../../store/messagesProvider";

const Dropdown = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [action, setAction] = useState("");
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { setContacts } = useContacts();
  const { messages, setMessages } = useMessages();

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
        setContacts(res.data);
        setFriend({ ...friend, blocked: 1 });
      });
  };

  const blockFriend = async () => {
    await axios.put("http://localhost:3001/api/friend/block", {
      personId: friend.user_id,
      userId: userData[0].user_id,
    });
    updateFriends();
  };

  const clearChat = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/message/${userData[0].user_id}`
    );

    if (data) {
      console.log(data);
      const chatMessages = data.filter((each) => {
        return each.receiver || each.author === friend.user_id;
      });
      console.log(chatMessages);
      await axios
        .post("http://localhost:3001/api/message/clearchat", {
          user: userData[0].user_id,
          messages: chatMessages,
        })
      updateMessages();
    }
  };

  const updateMessages = () => {
    axios
      .get(`http://localhost:3001/api/message/${userData[0].user_id}`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setMessages(res.data);
        }
      });
  };

  const actions = {
    block: () => blockFriend(),
    clearChat: () => clearChat(),
  };

  return (
    <Container>
      {friend.blocked === 0 ? (
        <Link to={"/" + friend.user_name + "/" + friend.user_id + "/info"}>
          <Options>Friend Info</Options>
        </Link>
      ) : null}
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
