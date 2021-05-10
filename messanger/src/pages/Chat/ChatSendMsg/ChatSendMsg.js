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

    const formatDate = () => {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = String(today.getFullYear())
      return yyyy + '-' + mm + "-" + dd
    }
  
    const sendMessage = async () => {
      if (message.length > 0) {
        const dateFormated = formatDate()
        const messageData = {
          author: userData.length ? userData[0].user_id : "",
          receiver: friend.user_id,
          message: message,
          date: dateFormated,
        };
        socket.emit("send-message", messageData);
        await setMessages([...messages, messageData]);
        sendMessageToDb(messageData)
        setMessage("")
      }
    }

    const sendMessageToDb = (message) => {
      const messageData = {
        message: message.message,
        date: message.date,
        receiver: message.receiver,
        author: message.author,
      }
      axios.post(`http://localhost:3001/api/message`, messageData)
    }

    return (
        <MessageTypeContainer>
          <MessageInput
            placeholder={friend.status === "BLOCKED" ? "Desblock to send messages" : "Type here your message"}
            disabled={friend.status === "BLOCKED" ? true : false}
            value={message}
            onKeyPress={(e) => checkIfEnterPressed(e, friend.user_id)}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendMessageButton 
          onClick={() => sendMessage(friend.user_id)}>
            Send
          </SendMessageButton>
        </MessageTypeContainer>
    )
}

export default ChatSendMessage