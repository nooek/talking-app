import React, { useState } from "react";
import axios from "axios";
import { Picker } from "emoji-mart";
import { MessageTypeContainer, SendMessageButton, MessageInput, EmojiIcon } from "./Styles";
import { useFriend } from "../../store/friendProvider";
import { useMessages } from "../../store/messagesProvider";
import { useSocket } from "../../store/socketProvider";
import { useUserData } from "../../store/userDataProvider";
import getDate from "../../functions/formatDate";
import "emoji-mart/css/emoji-mart.css";
import validateMessage from "../../validators/MessageValidator";
import { useContactMessages } from "../../store/contactMessagesProvider";
import { useContacts } from "../../store/contactsProvider";

const ChatSendMessage = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useMessages();
  const { userData } = useUserData();
  const { friend } = useFriend();
  const [showEmoji, setShowEmoji] = useState(false);
  const { contactMessages, setContactMessages } = useContactMessages();
  const { contacts, setContacts } = useContacts();

  const sendMessageToDb = (messageData) => {
    axios.post("http://localhost:3001/api/message", messageData).then(() => {
      const contactsWithoutFriend = contacts.filter((each) => each.user_id !== friend.user_id);
      setContacts([friend, ...contactsWithoutFriend]);
    });
  };

  const sendMessage = () => {
    const today = getDate();
    const isValid = validateMessage(message);
    console.log(today);
    if (isValid) {
      console.log(userData);
      const messageData = {
        author: userData[0].user_id,
        receiver: friend.user_id,
        message: message,
        date: today.date,
        message_time: today.time,
      };

      console.log(messageData);
      socket.emit("send-message", messageData);
      setMessages([...messages, messageData]);
      setContactMessages([messageData, ...contactMessages]);
      sendMessageToDb(messageData);
      setMessage("");
    }
  };

  const checkIfEnterPressed = (e, chat) => {
    const code = e.which;
    if (code === 13) {
      sendMessage(chat);
    }
  };

  const handleEmojiChange = (emoji) => {
    setMessage(message + emoji.native);
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
          friend.status === "BLOCKED" ? "Desblock to send messages" : "Type here your message"
        }
        disabled={friend.status === "BLOCKED"}
        value={message}
        onKeyPress={(e) => checkIfEnterPressed(e, friend.user_id)}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendMessageButton onClick={() => sendMessage()}>Send</SendMessageButton>
    </MessageTypeContainer>
  );
};

export default ChatSendMessage;
