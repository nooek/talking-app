import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useUserData } from "../../../store/userDataProvider";
import { useContacts } from "../../../store/contactsProvider";

const AddFriends = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [people, setPeople] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const { userData } = useUserData();
  const { contacts } = useContacts();
  const TEXT_STYLE = {
    color: "white",
  };

  useEffect(() => {
    if (!contacts.message) {
      const contactId = [];
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
      const cancelTokenSource = axios.CancelToken.source();
      axios.get(`http://localhost:3001/api/search/friends/${name}`, {
        cancelToken: cancelTokenSource.token,
      }).then((res) => {
        console.log(res.data);
        if (res.data.message) {
          setMessage(res.data.message);
          setPeople([]);
        } else {
          setPeople(res.data);
          setMessage("");
        }
      }).catch((err) => {
        if (!axios.isCancel(err)) console.log(err);
      });
      return () => {
        cancelTokenSource.cancel();
      };
    }
    setPeople([]);
    setMessage("");
    return () => {};
  }, [name]);

  const addFriend = (person) => {
    axios.post("http://localhost:3001/api/friends/sendrequest", {
      id: person.user_id,
      userId: userData[0].user_id,
    });
  };

  return (
    <Container>
      <FindFriend>Find friend</FindFriend>
      <div style={{ height: "70px", width: "100%" }}>
        <SearchBar placeholder="Friend Name" onChange={(e) => setName(e.target.value)} />
      </div>
      <PeopleList>

        {
          people.map((each) => {
            if (each.user_id !== userData[0].user_id && !contactsList.includes(each.user_id)) {
              return (
                <PersonContainer key={each.user_id}>
                  <PersonPfp src={each.user_pfp} alt="profile pic" />
                  <PersonName>{each.user_name}</PersonName>
                  <AddFriendContainer>
                    <AddFriendButton onClick={() => addFriend(each)}>Send request</AddFriendButton>
                  </AddFriendContainer>
                </PersonContainer>
              );
            }
            return null;
          })
        }
        {message ? <h2 style={TEXT_STYLE}>{message}</h2> : null}
        {!message && people.length <= 0 ? <h2 style={TEXT_STYLE}>Start Typing</h2> : null}
      </PeopleList>
    </Container>
  );
};

export default AddFriends;
