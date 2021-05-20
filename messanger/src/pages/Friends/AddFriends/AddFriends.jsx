import React, { useState, useEffect } from "react";
import {
  Container,
  FindFriend,
  SearchBar,
  PeopleList,
  PersonContainer,
  PersonName,
  PersonPfp,
  AddFriendContainer,
  AddFriendButton,
} from "./Styles";
import axios from "axios";
import { useUserData } from "../../../store/userDataProvider";
import { useContacts } from "../../../store/contactsProvider";

const AddFriends = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [people, setPeople] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const { userData } = useUserData();
  const { contacts } = useContacts();

  useEffect(() => {
    if (!contacts.message) {
      let contactId = [];
      contacts.map((each) => {
        if (contactId !== "DENIED") {
          return contactId.push(each.user_id);
        }
        return null;
      });
      setContactsList(contactId);
    }
  }, [contacts]);

  useEffect(() => {
    if (name.length > 0) {
      axios
        .get(`http://localhost:3001/api/search/friends/${name}`)
        .then((res) => {
          if (res.data.message) {
            setMessage(res.data.message);
            setPeople([]);
          } else {
            setPeople(res.data);
            setMessage("");
          }
        });
    } else {
      setPeople([]);
      setMessage("");
    }
  }, [name]);

  const addFriend = (people) => {
    axios.post(`http://localhost:3001/api/friends/sendrequest`, {
      id: people.user_id,
      userId: userData[0].user_id,
    });
  };

  return (
    <Container>
      <FindFriend>Find friend</FindFriend>
      <div style={{height: "70px", width: "100%"}}>
        <SearchBar
          placeholder="Friend Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <PeopleList>
        {message ? <h2 style={{ color: "white" }}>{message}</h2> : null}
        {people.length > 0
          ? people.map((each) => {
              if (
                each.user_id !== userData[0].user_id &&
                !contactsList.includes(each.user_id)
              ) {
                return (
                  <PersonContainer key={each.user_id}>
                    <PersonPfp src={each.user_pfp} alt="profile pic" />
                    <PersonName>{each.user_name}</PersonName>
                    <AddFriendContainer>
                      <AddFriendButton onClick={() => addFriend(each)}>
                        Send request
                      </AddFriendButton>
                    </AddFriendContainer>
                  </PersonContainer>
                );
              } else {
                return null;
              }
            })
          : <h2 style={{ color: "white" }}>Start Typing</h2>}
      </PeopleList>
    </Container>
  );
};

export default AddFriends;
