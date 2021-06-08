import React, { useEffect, useState } from "react";
import { useContacts } from "../../../store/contactsProvider";
import { useFriend } from "../../../store/friendProvider";
import { useSocket } from "../../../store/socketProvider";
import { useMessages } from "../../../store/messagesProvider";
import { FriendContainer, FriendName, FriendPfp, OnlineBubble, LastContactMessage } from "./Styles";

const SidebarFriends = (props) => {
  const { contacts } = useContacts();
  const { friend, setFriend } = useFriend();
  const { socket } = useSocket();
  const { messages } = useMessages();
  const { contactList, onlineFriends } = props;
  const [friendsWithNewMessages, setFriendsWithNewMessages] = useState([]);

  useEffect(() => {
    socket.emit("join-friend", friend.user_id);
  }, [friend, socket]);

  useEffect(() => {
    const idsWithNewMsg = [];
    messages.map((message) => {
      if (message.seen === false) {
        return idsWithNewMsg.push(message.author);
      }
      return null;
    });
    setFriendsWithNewMessages(idsWithNewMsg);
  }, [messages]);

  return !contactList.message && contactList.length > 0 ? (
    contactList.map((each) => {
      if (each.status !== "DENIED") {
        return (
          <FriendContainer
            key={each.friend_id}
            onClick={() => setFriend(each)}
            selected={friend.user_id === each.user_id}
          >
            {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
            <div style={{ width: "225px" }}>
              <FriendName>{each.user_name}</FriendName>
            </div>
            <LastContactMessage>{each.lastMessage}</LastContactMessage>
            {friendsWithNewMessages.includes(each.user_id) ? (
              <p style={{ position: "absolute", top: "0px", right: "10px" }}>mensagem!</p>
            ) : null}
            {each.user_id ? (
              <OnlineBubble online={!!onlineFriends.includes(each.user_id.toString())} />
            ) : null}
          </FriendContainer>
        );
      }
      return null;
    })
  ) : (
    <h2>{contacts.message}</h2>
  );
};

export default SidebarFriends;
