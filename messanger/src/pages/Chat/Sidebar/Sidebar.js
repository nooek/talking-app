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
import Dropdown from "./Dropdown/Dropdown";
import { useUserData } from "../../../store/userDataProvider";
import { useSocket } from "../../../store/socketProvider";
import { useContacts } from "../../../store/contactsProvider";
import { useFriend } from "../../../store/friendProvider";
import { Link } from "react-router-dom";
import { getFriendsData } from "../../../services/API/tasks/APItasks";
import { searchFriend } from "../../../services/API/tasks/FriendsTasks";

const Sidebar = () => {
  const { userData } = useUserData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendSearchName, setFriendSearchName] = useState("");
  const [friendsOnline, setFriendsOnline] = useState([]);
  const { friend, setFriend } = useFriend();
  const { socket } = useSocket();
  const { contacts, setContacts } = useContacts();

  const updateFriends = useCallback(async () => {
    const data = await getFriendsData(userData[0].user_id);
    console.log(data);
    setContacts(data.data);
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
      searchFriend(userData[0].user_id, friendSearchName).then((res) => {
        setContacts(res.data);
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
                <LastContactMessage>{each.lastMessage}</LastContactMessage>
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

// if (friendSearchName.length > 0) {
    //   axios
    //     .get(
    //       `http://localhost:3001/api/find/friend/${userData[0].user_id}/${friendSearchName}`
    //     )
    //     .then((res) => {
    //       if (res.data && !res.data.error) {
    //         setContacts(res.data);
    //       }
    //     });
    // } else {
    //   updateFriends();
    // }

// axios
//   .get(
//     `http://localhost:3001/api/friends/getfriendsbyuser/${userData[0].user_id}`
//   )
//   .then((res) => {
//     if (res.data.message) {
//       setContacts([]);
//     } else {
//       setContacts(res.data);
//     }
//   });
