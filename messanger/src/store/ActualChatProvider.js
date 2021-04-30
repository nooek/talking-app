import React, { createContext, useContext, useState } from "react"

const ChatContext = createContext()

export function useActualChat(){
    return useContext(ChatContext)
}

const CurrentChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState()

    return (
        <ChatContext.Provider value={{currentChat, setCurrentChat}}>
            {children}
        </ChatContext.Provider>
    )
}

export default CurrentChatProvider