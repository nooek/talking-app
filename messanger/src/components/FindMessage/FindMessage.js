import React, { useState, useEffect } from "react";
import { findMessage } from "../../services/API/tasks/MessagesTasks";
import { useUserData } from "../../store/userDataProvider";
import { Container, Parent, Title, SearchField, MessagesList } from "./Styles";

const FindMessage = (props) => {
  const [messageSearchName, setMessageSearchName] = useState("");
  const [foundMessages, setFoundMessages] = useState([]);
  const { userData } = useUserData();

  useEffect(() => {
    if (messageSearchName.length > 0) {
      findMessage(userData[0].user_id, messageSearchName).then((res) => {
        console.log(res)
        setFoundMessages(res.data);
      });
    } else {
      setFoundMessages([]);
    }
  }, [userData, messageSearchName]);

  return (
    <Container>
      <Parent>
        <Title>Find a message</Title>
        <SearchField
          placeholder="Type here the message"
          onChange={(e) => setMessageSearchName(e.target.value)}
        />
        <MessagesList>
          {foundMessages.message ? <h2 style={{ color: "white" }}>{foundMessages.message}</h2> : null}
          {foundMessages.length > 0 ? (
            foundMessages.map((each) => {
              return (
                <h2 key={each.message_id} style={{ color: "white" }}>{each.message}</h2>
              );
            })
          ) : (
            !foundMessages.message ?
              <h2 style={{color: "white" }}>Start searching</h2>
            : null
          )}
        </MessagesList>
        <button onClick={props.click}>close</button>
      </Parent>
    </Container>
  );
};

export default FindMessage;
