import React, { useState, useEffect, useCallback } from "react";
import {
  SideBar,
  SideTopbar,
  SearchBarContainer,
  FriendsContainer,
  UserPfp,
  OtherThingsContainer,
  AddFriendIcon,
  MoreIcons,
  SearchFriends,
  FriendContainer,
  FriendName,
  FriendPfp,
  OnlineBubble,
  MessageDate,
  LastContactMessage,
} from "./Styles";
import { useUserData } from "../../../store/userDataProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMessages } from "../../../store/messagesProvider";
import { useFriend } from "../../../store/friendProvider";
import getMessagesFromStranger from "./functions/getMessagesFromStranger";
import Dropdown from "./Dropdown/Dropdown";
import { useSocket } from "../../../store/socketProvider";

const Sidebar = () => {
  const { userData } = useUserData();
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendSearchName, setFriendSearchName] = useState("");
  const [friendsOnline, setFriendsOnline] = useState([]);
  const { messages } = useMessages();
  const { friend, setFriend } = useFriend();
  const { socket } = useSocket();

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
    updateFriends();
  }, [updateFriends]);

  useEffect(() => {
    socket.on("get-user-online", (data) => {
      let onlineList = [];
      data.map((each) => {
        return onlineList.push(each.userId);
      });
      setFriendsOnline(onlineList);
    });
  }, [socket]);

  useEffect(() => {
    const newContact = getMessagesFromStranger(friends, messages, userData[0].user_id)
    if (newContact.length){
      setFriends([...friends, {user_id: newContact[0].user_id, user_name: newContact[0].user_name, user_add: false}])
    }else{
      return
    }
  }, [messages, setFriends, friends,userData])

  useEffect(() => {
    if (friendSearchName.length > 0) {
      axios
        .get(
          `http://localhost:3001/api/find/friend/${userData[0].user_id}/${friendSearchName}`
        )
        .then((res) => {
          if (res.data) {
            setFriends(res.data);
          }
        });
    } else {
      updateFriends();
    }
  }, [friendSearchName, userData, updateFriends]);

  console.log(friendsOnline)

  return (
    <SideBar>
      <SideTopbar>
        <Link to="/profile" style={{ width: "auto", height: "60%" }}>
          <UserPfp src={userData[0].user_pfp} alt="profile pic" />
        </Link>
        <h2>{userData[0].user_name}</h2>
        <OtherThingsContainer>
          <Link to="/friends/add" style={{ textDecoration: "none" }}>
            <AddFriendIcon />
          </Link>
          <MoreIcons onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown === true ? <Dropdown /> : null}
        </OtherThingsContainer>
      </SideTopbar>
      <SearchBarContainer>
        <SearchFriends
          placeholder="name"
          onChange={(e) => setFriendSearchName(e.target.value)}
        />
      </SearchBarContainer>
      <FriendsContainer>
        {message ? <h2>{message}</h2> : null}
        {friends.map((each, index) => {
          return (
            <FriendContainer
              key={index}
              onClick={() => {
                setFriend(each);
              }}
              selected={friend.user_id === each.user_id ? true : false}
            >
              {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
              <FriendName>{each.user_name}</FriendName>
              <LastContactMessage>sada</LastContactMessage>
              <MessageDate>sda</MessageDate>

              <OnlineBubble
                online={
                  friendsOnline.includes(each.user_id.toString())
                    ? true
                    : false
                }
              />
            </FriendContainer>
          );
        })}
      </FriendsContainer>
    </SideBar>
  );
};

export default Sidebar;
