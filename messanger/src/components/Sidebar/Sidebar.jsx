import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
} from "./Styles";
import Dropdown from "./Dropdown/Dropdown";
import { useUserData } from "../../store/userDataProvider";
import { useContacts } from "../../store/contactsProvider";
import searchFriend from "../../services/API/tasks/FriendsTasks";
import Friends from "./SidebarFriends/Friends";

const Sidebar = (props) => {
  const { userData } = useUserData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendSearchName, setFriendSearchName] = useState("");
  const { contacts, setContacts } = useContacts();
  const { onlineFriend } = props;
  const [contactsList, setContactsList] = useState([]);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();
    if (friendSearchName.length > 0) {
      searchFriend(userData[0].user_id, friendSearchName, axiosCancelToken.token).then((res) => {
        if (res) {
          setContactsList(res.data);
        }
      });
    } else {
      setContactsList(contacts);
    }
    return () => {
      axiosCancelToken.cancel();
    };
  }, [friendSearchName, userData, setContacts]);

  useEffect(() => {
    if (friendSearchName.length <= 0) {
      setContactsList(contacts);
    }
  }, [contacts]);

  return (
    <SideBar>
      <SideTopbar>
        <Link to="/profile" style={{ width: "60px", height: "80%" }}>
          <UserPfp src={userData[0].user_pfp} alt="profile pic" />
        </Link>
        <div style={{ width: "190px", textAlign: "left", marginLeft: "20px" }}>
          <h2
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {userData[0].user_name}
          </h2>
        </div>
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
        <Friends onlineFriends={onlineFriend} contactList={contactsList} />
      </FriendsContainer>
    </SideBar>
  );
};

export default Sidebar;
