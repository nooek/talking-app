import React, { useState, createContext, useContext } from "react"

const friendContext = createContext()

export const useFriend = () => {
    return useContext(friendContext)
}

const FriendProvider = ({ children }) => {
    const [friend, setFriend] = useState([])
    return(
        <friendContext.Provider
        value={{friend, setFriend}}>
            {children}
        </friendContext.Provider>
    )
}

export default FriendProvider