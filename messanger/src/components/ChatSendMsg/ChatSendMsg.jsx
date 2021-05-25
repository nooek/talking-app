import React, { useState } from "react";
import axios from "axios";
import {
  MessageTypeContainer,
  SendMessageButton,
  MessageInput,
  EmojiIcon,
} from "./Styles";
import { useFriend } from "../../store/friendProvider";
import { useMessages } from "../../store/messagesProvider";
import { useSocket } from "../../store/socketProvider";
import { useUserData } from "../../store/userDataProvider";
import getDate from "../../functions/formatDate";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import validateMessage from "../../validators/MessageValidator";

const ChatSendMessage = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useMessages();
  const { userData } = useUserData();
  const { friend } = useFriend();
  const [showEmoji, setShowEmoji] = useState(false);

  const checkIfEnterPressed = (e, chat) => {
    const code = e.which;
    if (code === 13) {
      sendMessage(chat);
    }
  };

  const handleEmojiChange = (emoji) => {
    setMessage(message + emoji.native);
  };

  const sendMessage = async () => {
    const today = getDate();
    const isValid = validateMessage(message);
    if (isValid) {
      const messageData = {
        author: userData.length ? userData[0].user_id : "",
        receiver: friend.user_id,
        message: message,
        date: today.date,
        time: today.time,
        seen: false,
      };
      socket.emit("send-message", messageData);
      await setMessages([...messages, messageData]);
      console.log(messages);
      sendMessageToDb(messageData);
      setMessage("");
    } else {
      console.log("not valid");
    }
  };

  const sendMessageToDb = (messageData) => {
    axios.post(`http://localhost:3001/api/message`, messageData).then((res) => {
      console.log(res);
    });
  };

  return (
    <MessageTypeContainer>
      {showEmoji ? (
        <Picker
          title="select"
          emoji="point_up"
          onSelect={handleEmojiChange}
          style={{
            position: "absolute",
            bottom: "80px",
            width: "300px",
            left: "20px",
          }}
          theme="dark"
          set="twitter"
        />
      ) : null}

      <EmojiIcon onClick={() => setShowEmoji(!showEmoji)} />
      <MessageInput
        minLength={1}
        maxLength={1000}
        placeholder={
          friend.status === "BLOCKED"
            ? "Desblock to send messages"
            : "Type here your message"
        }
        disabled={friend.status === "BLOCKED" ? true : false}
        value={message}
        onKeyPress={(e) => checkIfEnterPressed(e, friend.user_id)}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendMessageButton onClick={() => sendMessage(friend.user_id)}>
        Send
      </SendMessageButton>
    </MessageTypeContainer>
  );
};

export default ChatSendMessage;
