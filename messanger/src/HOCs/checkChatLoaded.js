import React from "react"
import { useUserData } from "../store/userDataProvider"
import { useContacts } from "../store/contactsProvider"

const CheckChatLoaded = ({ children }) => {
    const { userData } = useUserData()
    const { contacts } = useContacts()

    console.log(userData)

    if (userData.length > 0){
        return children
    }

    if (!contacts || !userData){
        return <h2>Some error hapenned, please try again later</h2>
    } 

    return <h2>Hmmmm... That's strange</h2>
}

export default CheckChatLoaded