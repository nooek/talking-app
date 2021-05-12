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
import { useUserData } from "../../../../store/userDataProvider";
import { useFriend } from "../../../../store/friendProvider";
import { Link } from "react-router-dom"
import Dropdown from "../Dropdown/Dropdown";
import { useSocket } from "../../../../store/socketProvider";
import { useContacts } from "../../../../store/contactsProvider";
import { getFriendsData } from "../../../../services/API/tasks/APItasks"
import { searchFriend } from "../../../../services/API/tasks/FriendsTasks";

const MobileTopbar = (props) => {
  const [hide, setHide] = useState(true);
  const [friendSearchName, setFriendSearchName] = useState("")
  const [friendsOnline, setFriendsOnline] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const { userData } = useUserData();
  const { friend, setFriend } = useFriend();
  const { socket } = useSocket()
  const { contacts, setContacts } = useContacts()

  const updateFriends = useCallback(async() => {
    const data = await getFriendsData(userData[0].user_id)
    setContacts(data.data)
  }, [userData, setContacts]);

  useEffect(() => {
    updateFriends()
  }, [updateFriends]);

  useEffect(() => {
    if (friendSearchName.length > 0) {
      searchFriend(userData[0].user_id, friendSearchName).then((res) => {
        setContacts(res.data);
      });
    } else {
      updateFriends();
    }
  }, [friendSearchName, updateFriends, userData, setContacts]);

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
        {contacts.map((each, index) => {
          return (
            <FriendContainer
              key={index}
              onClick={() => {
                setFriend(each);
                setHide(!hide)
              }}             
              selected={friend.user_id === each.user_id ? true : false}
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

    // if (friendSearchName.length > 1) {
    //   axios
    //     .get(`http://localhost:3001/api/find/friend/${userData[0].user_id}/${friendSearchName}`)
    //     .then((res) => {
    //       setContacts(res.data);
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