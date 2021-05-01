import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  FindFriendsContainer,
  FindFriendsInput,
  FriendsList,
  MoreActionsContainer,
  ShowButton,
  UserPropertiesContainer,
  FriendContainer,
  FriendPfp,
  FriendName,
  AddFriendIcon,
  MoreIcons,
  OnlineBubble,
  LastContactMessage,
  MessageDate
} from "./Styles";
import axios from "axios";
import { useUserData } from "../../../../store/userDataProvider";
import { useFriend } from "../../../../store/friendProvider";
import { useActualChat } from "../../../../store/ActualChatProvider";
import { Link } from "react-router-dom"
import { useMessages } from "../../../../store/messagesProvider";
import getMessagesFromStranger from "../functions/getMessagesFromStranger";
import Dropdown from "../Dropdown/Dropdown";
import { useSocket } from "../../../../store/socketProvider";

const MobileTopbar = (props) => {
  const [hide, setHide] = useState(true);
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [friendSearchName, setFriendSearchName] = useState("")
  const [friendsOnline, setFriendsOnline] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const { userData } = useUserData();
  const { setFriend } = useFriend();
  const { currentChat, setCurrentChat } = useActualChat();
  const { messages } = useMessages()
  const { socket } = useSocket()

  const updateFriends = useCallback(() => {
    axios
      .get(
        `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
      )
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          setFriends([]);
        } else {
          setFriends(res.data);
          setMessage("");
        }
      });
  }, [userData]);

  useEffect(() => {
    updateFriends()
  }, [updateFriends]);

  useEffect(() => {
    const newContact = getMessagesFromStranger(friends, messages, userData[0].user_id)
    if (newContact.length){
      setFriends([...friends, {friend_id: newContact[0].friend_id, friend_name: newContact[0].friend_name}])
    }
  }, [messages, userData, friends])

  useEffect(() => {
    if (friendSearchName.length > 1) {
      axios
        .get(`http://localhost:3001/api/find/friend/${userData[0].user_id}/${friendSearchName}`)
        .then((res) => {
          console.log(res.data);
          setFriends(res.data);
        });
    } else {
      updateFriends();
    }
  }, [friendSearchName, updateFriends, userData]);

  useEffect(() => {
    socket.on("get-user-online", data => {
      let onlineList = []
      data.map(each => {
        return onlineList.push(each.userId)
      })
      setFriendsOnline(onlineList)
    })
  }, [socket])

  return (
    <Container hide={hide} chat={props.chat}>
      <ShowButton onClick={() => setHide(!hide)}>Show Contacts</ShowButton>
      <UserPropertiesContainer hide={hide}>
        <FriendPfp src={userData[0].user_pfp} />
        <FriendName>{userData[0].user_name}</FriendName>
        <MoreActionsContainer hide={hide}>
        <Link to="/friends/add" style={{ textDecoration: "none" }}>
            <AddFriendIcon />
        </Link>
        <MoreIcons onClick={() => setShowDropdown(!showDropdown)} />
          {
            showDropdown === true ?
              <Dropdown />
            : null
          }
        </MoreActionsContainer>
      </UserPropertiesContainer>
      <FindFriendsContainer hide={hide}>
        <FindFriendsInput 
        onChange={(e) => setFriendSearchName(e.target.value)}
        placeholder="Search for friends" />
      </FindFriendsContainer>
      <FriendsList hide={hide}>
        {message ? <h2>{message}</h2> : null}
        {friends.map((each, index) => {
          return (
            <FriendContainer
              key={index}
              onClick={() => {
                setCurrentChat(each.user_id);
                setFriend(each);
              }}             
              selected={currentChat === each.user_id ? true : false}
            >
              {
                each.user_pfp ?
                <FriendPfp src={each.user_pfp} />
                : null
              }
              <FriendName>{each.user_name}</FriendName>
              <LastContactMessage>dsada</LastContactMessage>
              <MessageDate>sad</MessageDate>
              <OnlineBubble online={
                friendsOnline.includes(each.user_id) ? 
                true : false
              } />
            </FriendContainer>
          );
        })}
      </FriendsList>
    </Container>
  );
};

export default MobileTopbar;