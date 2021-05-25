import React, { useEffect } from "react"
import { useContacts } from "../../../store/contactsProvider"
import { useFriend } from "../../../store/friendProvider"
import { useSocket } from "../../../store/socketProvider"
import {
    FriendContainer,
    FriendName,
    FriendPfp,
    OnlineBubble,
    LastContactMessage
} from "./Styles"

const SidebarFriends = (props) => {
    const { contacts } = useContacts()
    const { friend, setFriend } = useFriend()
    const { socket } = useSocket()

    useEffect(() => {
      socket.emit('join-friend', friend.user_id)
    }, [friend, socket])

    return(
        !props.contactList.message && props.contactList.length > 0 ? (
            props.contactList.map((each, index) => {
              if (each.status !== "DENIED") {
                return (
                  <FriendContainer
                    key={index}
                    onClick={() => {
                      setFriend(each);
                    }}
                    selected={friend.user_id === each.user_id ? true : false}
                  >
                    {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
                    <div style={{width: "225px"}}>
                      <FriendName>{each.user_name}</FriendName>
                    </div>
                    <LastContactMessage>{each.lastMessage}</LastContactMessage>
                    {
                      each.newMessage && friend.user_id !== each.user_id ?
                      <p style={{position: "absolute", top: "0px", right: "10px"}}>mensagem!</p>
                     : null}
                    {each.user_id ? (
                      <OnlineBubble
                        online={
                          props.onlineFriends.includes(each.user_id.toString())
                            ? true
                            : false
                        }
                      />
                    ) : null}
                  </FriendContainer>
                );
              } else {
                return null;
              }
            })
          ) : (
            <h2>{contacts.message}</h2>
          )
    )
}

export default SidebarFriends
