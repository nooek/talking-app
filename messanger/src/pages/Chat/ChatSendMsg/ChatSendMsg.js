import React, { useState } from "react"
import { useMessages } from "../../../store/messagesProvider"
import { useSocket } from "../../../store/socketProvider"
import { useUserData } from "../../../store/userDataProvider"

import {
    MessageTypeContainer,
    SendMessageButton,
    MessageInput
} from "./Styles"
import axios from "axios"
import { useFriend } from "../../../store/friendProvider"

const ChatSendMessage = () => {
    const { socket } = useSocket()
    const [message, setMessage] = useState("")
    const { messages, setMessages } = useMessages()
    const { userData } = useUserData()
    const { friend } = useFriend()

    const checkIfEnterPressed = (e, chat) => {
      const code = e.which
      if (code === 13){
        sendMessage(chat)
      }
    }
  
    const sendMessage = async () => {
      if (message.length > 0) {
        const messageObject = {
          author: userData.length ? userData[0].user_id : "",
          receiver: friend.user_id,
          message: message,
          date: Date.now(),
          blocked: friend.blocked
        };
        socket.emit("send-message", messageObject);
        await setMessages([...messages, messageObject]);
        sendMessageToDb(messageObject)
        setMessage("")
      }
    }

    const sendMessageToDb = (message) => {
      axios
      .post(`http://localhost:3001/api/message`, {
        message: message.message,
        date: message.date,
        receiver: message.receiver,
        author: message.author,
        blocked: message.blocked
      })
    }

    return (
        <MessageTypeContainer>
          <MessageInput
            placeholder={friend.blocked === 1 ? "You can't send messages to this chat" : "Type here your message"}
            value={message}
            onKeyPress={(e) => checkIfEnterPressed(e, friend.user_id)}
            onChange={(e) => setMessage(e.target.value)}
            disabled={friend.blocked === 1 ? true : false}
          />
          <SendMessageButton 
          onClick={() => sendMessage(friend.user_id)}>
            Send
          </SendMessageButton>
        </MessageTypeContainer>
    )
}

export default ChatSendMessage