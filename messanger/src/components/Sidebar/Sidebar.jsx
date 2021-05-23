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
} from "./Styles";
import Dropdown from "./Dropdown/Dropdown.jsx";
import { useUserData } from "../../store/userDataProvider";
import { useContacts } from "../../store/contactsProvider";
import { Link } from "react-router-dom";
import { getFriendsData } from "../../services/API/tasks/APItasks";
import { searchFriend } from "../../services/API/tasks/FriendsTasks";
import Friends from "./SidebarFriends/Friends.jsx";
import { useMessages } from "../../store/messagesProvider";

const Sidebar = (props) => {
  const { userData } = useUserData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendSearchName, setFriendSearchName] = useState("");
  const { contacts, setContacts } = useContacts();
  const [contactsList, setContactsList] = useState([]);
  const { messages } = useMessages();

  const updateFriends = useCallback(async () => {
    const res = await getFriendsData(userData[0].user_id);
    if (!res.data[0].message) {
      setContacts(res.data);
    }
  }, [userData, setContacts]);

  useEffect(() => {
    updateFriends();
  }, [updateFriends]);

  useEffect(() => {
    if (friendSearchName.length > 0) {
      searchFriend(userData[0].user_id, friendSearchName).then((res) => {
        setContactsList(res.data);
      });
    } else {
      updateFriends();
    }
  }, [friendSearchName, userData, updateFriends, setContacts]);

  // useEffect(() => {
  //   let sortedContacts = [];
  //   const reversedMessages = messages.slice().reverse();
  //   let reversedMessagesIds = [];
  //   let contactsWithNoMessages = [];
  //   reversedMessages.forEach((message) => {
  //     if (
  //       !reversedMessagesIds.includes(message.author) &&
  //       !reversedMessagesIds.includes(message.receiver)
  //     ) {
  //       if (message.author !== userData[0].user_id) {
  //         reversedMessagesIds.push(message.author);
  //       }
  //       if (message.receiver !== userData[0].user_id) {
  //         reversedMessagesIds.push(message.receiver);
  //       }
  //     }
  //   });
  //   let match = 0;

  //   reversedMessagesIds.forEach((id) => {
  //     contacts.map((contact) => {
  //       if (contact.user_id === id || contact.friend_with === id) {
  //         sortedContacts.push(contact);
  //       }
  //       return 0;
  //     });
  //     return 0;
  //   });

  //   for (let i = 0; i < sortedContacts.length; i++) {
  //     if (contacts[i].user_id === reversedMessagesIds[i]) {
  //       match++;
  //     }

  //     if (contacts[i].friend_with === reversedMessagesIds[i]) {
  //       match++;
  //     }
  //   }

  //   contacts.map((each) => {
  //     if (!reversedMessagesIds.includes(parseInt(each.user_id))) {
  //       contactsWithNoMessages.push(each);
  //     }
  //   });
  //   if (match !== reversedMessagesIds.length) {
  //     setContacts([...sortedContacts, ...contactsWithNoMessages]);
  //   }
  // }, [messages, userData, contacts, setContacts]);

  useEffect(() => {
    setContactsList(contacts);
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
        <Friends
          onlineFriends={props.onlineFriend}
          contactList={contactsList}
        />
      </FriendsContainer>
    </SideBar>
  );
};

export default Sidebar;
