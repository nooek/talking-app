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
import { useFriend } from "../../../store/friendProvider";
import Dropdown from "./Dropdown/Dropdown";
import { useSocket } from "../../../store/socketProvider";
import { useContacts } from "../../../store/contactsProvider";
import { useMessages } from "../../../store/messagesProvider";

const Sidebar = () => {
  const { userData } = useUserData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendSearchName, setFriendSearchName] = useState("");
  const [friendsOnline, setFriendsOnline] = useState([]);
  const [contactsId, setContactsIds] = useState([]);
  const { friend, setFriend } = useFriend();
  const { socket } = useSocket();
  const { contacts, setContacts } = useContacts();
  const { messages } = useMessages();

  const updateFriends = useCallback(async () => {
    axios
      .get(
        `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
      )
      .then((res) => {
        if (res.data.message) {
          setContacts([]);
        } else {
          setContacts(res.data);
        }
      });
  }, [userData, setContacts]);

  useEffect(() => {
    updateFriends();
  }, [updateFriends]);

  const updateOnlineFriends = useCallback(() => {
    socket.emit("get-users-online");
    socket.on("get-user-online", (data) => {
      let onlineList = [];
      data.map((each) => {
        return onlineList.push(each.userId);
      });
      setFriendsOnline(onlineList);
    });

    return () => {
      socket.off("get-user-online");
    };
  }, [socket]);

  useEffect(() => {
    updateOnlineFriends();
  }, [updateOnlineFriends]);

  useEffect(() => {
    if (friendSearchName.length > 0) {
      axios
        .get(
          `http://localhost:3001/api/find/friend/${userData[0].user_id}/${friendSearchName}`
        )
        .then((res) => {
          if (res.data && !res.data.error) {
            setContacts(res.data);
          }
        });
    } else {
      updateFriends();
    }
  }, [friendSearchName, userData, updateFriends, setContacts]);

  return (
    <SideBar>
      <SideTopbar>
        <Link to="/profile" style={{ width: "60px", height: "80%" }}>
          <UserPfp src={userData[0].user_pfp} alt="profile pic" />
        </Link>
        <h2 style={{ marginLeft: "20px" }}>{userData[0].user_name}</h2>
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
          placeholder="Find Friend"
          onChange={(e) => setFriendSearchName(e.target.value)}
        />
      </SearchBarContainer>
      <FriendsContainer>
        {contacts.map((each, index) => {
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
          } else {
            return null;
          }
        })}
      </FriendsContainer>
    </SideBar>
  );
};

export default Sidebar;
