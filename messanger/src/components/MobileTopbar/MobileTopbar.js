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
import { useUserData } from "../../store/userDataProvider";
import { Link } from "react-router-dom"
import Dropdown from "../Sidebar/Dropdown/Dropdown";
import { useContacts } from "../../store/contactsProvider";
import { getFriendsData } from "../../services/API/tasks/APItasks"
import { searchFriend } from "../../services/API/tasks/FriendsTasks";
import Friends from "./MobiletopbarFriends/MobileTopbarFriends";

const MobileTopbar = (props) => {
  const [hide, setHide] = useState(true);
  const [friendSearchName, setFriendSearchName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [contactsList, setContactsList] = useState([])
  const { userData } = useUserData();
  const { contacts, setContacts } = useContacts()

  const updateFriends = useCallback(async() => {
    const res = await getFriendsData(userData[0].user_id)
    setContacts(res.data)
  }, [userData, setContacts]);

  useEffect(() => {
    updateFriends()
  }, [updateFriends]);

  useEffect(() => {
    setContactsList(contacts)
  }, [contacts])

  useEffect(() => {
    if (friendSearchName.length > 0) {
      searchFriend(userData[0].user_id, friendSearchName).then((res) => {
        setContactsList(res.data);
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
        <div style={{width: "190px", textAlign: "left"}}>
          <UserName>{userData[0].user_name}</UserName>
        </div>
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
      
        <Friends hide={hide} onlineFriends={props.onlineFriends} contactList={contactsList}/>
    </Container>
  );
};

export default MobileTopbar;