import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  FindFriendsContainer,
  FindFriendsInput,
  MoreActionsContainer,
  ShowButton,
  UserPropertiesContainer,
  UserPfp,
  UserName,
  AddFriendIcon,
  MoreIcons,
} from "./Styles";
import { useUserData } from "../../../../store/userDataProvider";
import { Link } from "react-router-dom"
import Dropdown from "../Dropdown/Dropdown";
// import { useSocket } from "../../../../store/socketProvider";
import { useContacts } from "../../../../store/contactsProvider";
import { getFriendsData } from "../../../../services/API/tasks/APItasks"
import { searchFriend } from "../../../../services/API/tasks/FriendsTasks";
import Friends from "../../../../components/MobiletopbarFriends/MobileTopbarFriends";

const MobileTopbar = (props) => {
  const [hide, setHide] = useState(true);
  const [friendSearchName, setFriendSearchName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const { userData } = useUserData();
  // const { socket } = useSocket()
  const { setContacts } = useContacts()

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

  return (
    <Container hide={hide} chat={props.chat}>
      <ShowButton onClick={() => setHide(!hide)}>Show Contacts</ShowButton>
      <UserPropertiesContainer hide={hide}>
        <UserPfp src={userData[0].user_pfp} />
        <UserName>{userData[0].user_name}</UserName>
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
      
        <Friends hide={hide} onlineFriends={props.onlineFriends} />
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

  /* {!contacts.message ? contacts.map((each, index) => {
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
              
            </FriendContainer>
          );
        }) : null} */