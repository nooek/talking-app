import React, { useState } from "react"
import { useActualChat } from "../../../store/ActualChatProvider"
import { useMessages } from "../../../store/messagesProvider"
import { useSocket } from "../../../store/socketProvider"
import { useUserData } from "../../../store/userDataProvider"

import {
    MessageTypeContainer,
    SendMessageButton,
    MessageInput
} from "./Styles"
import axios from "axios"

const ChatSendMessage = () => {
    const { socket } = useSocket()
    const [message, setMessage] = useState("")
    const { currentChat } = useActualChat()
    const { messages, setMessages } = useMessages()
    const { userData } = useUserData()

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
          receiver: currentChat,
          message: message,
          date: Date.now()
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
        author: message.author
      })
    }

    return (
        <MessageTypeContainer>
          <MessageInput
            placeholder="message"
            value={message}
            onKeyPress={(e) => checkIfEnterPressed(e, currentChat)}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendMessageButton 
          onClick={() => sendMessage(currentChat)}>
            Send
          </SendMessageButton>
        </MessageTypeContainer>
    )
}

export default ChatSendMessage