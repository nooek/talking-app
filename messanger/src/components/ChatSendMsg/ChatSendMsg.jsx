import React, { useState } from "react"
import axios from "axios"
import {
  MessageTypeContainer,
  SendMessageButton,
  MessageInput
} from "./Styles"
import { useFriend } from "../../store/friendProvider"
import { useMessages } from "../../store/messagesProvider"
import { useSocket } from "../../store/socketProvider"
import { useUserData } from "../../store/userDataProvider"
import getDate from "../../functions/formatDate"

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
      const today = getDate() 
      console.log(today)
      if (message.length > 0) {
        const messageData = {
          author: userData.length ? userData[0].user_id : "",
          receiver: friend.user_id,
          message: message,
          date: today.date,
          time: today.time,
          seen: false
        };
        socket.emit("send-message", messageData);
        await setMessages([...messages, messageData]);
        console.log(messages)
        sendMessageToDb(messageData)
        setMessage("")
      }
    }

    const sendMessageToDb = (messageData) => {
      axios.post(`http://localhost:3001/api/message`, messageData).then(res => {
        console.log(res)
      })
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