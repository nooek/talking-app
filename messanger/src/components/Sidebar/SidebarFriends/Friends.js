import React from "react"
import { useContacts } from "../../../store/contactsProvider"
import { useFriend } from "../../../store/friendProvider"
import {
    FriendContainer,
    FriendName,
    FriendPfp,
    OnlineBubble,
    MessageDate,
    LastContactMessage
} from "./Styles"

const SidebarFriends = (props) => {
    const { contacts } = useContacts()
    const { friend, setFriend } = useFriend()
    
    const getFriend = (friend) => {
      contacts.filter(each => {
        return each.friend_with === friend.user_id
      })
    }

    return(
        !props.contactList.message && props.contactList.length > 0 ? (
            props.contactList.map((each, index) => {
              if (each.status !== "DENIED") {
                return (
                  <FriendContainer
                    key={index}
                    onClick={() => {
                      setFriend(each);
                      getFriend(each)
                    }}
                    selected={friend.user_id === each.user_id ? true : false}
                  >
                    {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
                    <FriendName>{each.user_name}</FriendName>
                    <LastContactMessage>{each.lastMessage}</LastContactMessage>
                    <MessageDate>sda</MessageDate>
  
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