import React, { useState } from "react";
import { useFriend } from "../../../../store/friendProvider";
import {
  Container,
  Options,
} from "./Styles";
import axios from "axios";
import { useUserData } from "../../../../store/userDataProvider";
import { useContacts } from "../../../../store/contactsProvider";
import { Link } from "react-router-dom";
import { useMessages } from "../../../../store/messagesProvider";
import { useSocket } from "../../../../store/socketProvider"
import { getFriendsData } from "../../../../services/API/tasks/APItasks"
import Warning from "./Warning";

const Dropdown = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [action, setAction] = useState("");
  const { friend, setFriend } = useFriend();
  const { userData } = useUserData();
  const { setContacts } = useContacts();
  const { setMessages } = useMessages();
  const { socket } = useSocket()

  const openWarning = (message, func) => {
    if (!message) return;
    if (!func) return
    setShowWarning(true);
    setWarningMessage(message);
    setAction(func);
  };

  const updateFriends = async (status) => {
    const response = await getFriendsData(userData[0].user_id)
    setContacts(response.data)
    setFriend({...friend, status: status})
    socket.emit("update-friend-status", friend.user_id, userData[0].user_id, status)
    setShowWarning(false)
  };

  const blockFriend = async () => {
    await axios.put("http://localhost:3001/api/friends/updatestatus", {
      personId: friend.user_id,
      userId: userData[0].user_id,
      newStatus: "BLOCKED",
    });
    updateFriends("BLOCKED");
  };

  const unBlock = async () => {
    await axios.put("http://localhost:3001/api/friends/updatestatus", {
      personId: friend.user_id,
      userId: userData[0].user_id,
      newStatus: "REQUESTED",
    });
    updateFriends("REQUESTED");
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
      await axios.post("http://localhost:3001/api/message/clearchat", {
        user: userData[0].user_id,
        messages: chatMessages,
      });
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
    unBlock: () => unBlock(),
    clearChat: () => clearChat(),
  };

  return (
    <Container>
      {friend.status !== "BLOCKED" ? (
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
      {friend.status !== "BLOCKED" ? (
        <Options
          onClick={() =>
            openWarning("Do you want to block that contact?", "block")
          }
        >
          Block
        </Options>
      ) : (
        <Options
          onClick={() =>
            openWarning("Do you want to disblock that contact?", "unBlock")
          }
        >
          Disblock
        </Options>
      )}
      {showWarning === true ? <Warning msg={warningMessage} action={actions[action]} toggle={() => setShowWarning(!showWarning)} /> : null}
    </Container>
  );
};

export default Dropdown;
// await axios
    //   .get(
    //     `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setContacts(res.data);
    //     setFriend({ ...friend, status: status });
    //     socket.emit("update-friend-status", friend.user_id, userData[0].user_id, status)
    //   });