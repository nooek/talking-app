import React from "react";
import { useFriend } from "../../../store/friendProvider";
import {
  FriendsList,
  FriendContainer,
  FriendName,
  MessageDate,
  FriendPfp,
  OnlineBubble,
} from "./Styles";

const Friends = (props) => {
  const { friend, setFriend } = useFriend();
  const { contactList, onlineFriends } = props;
  let { hide } = props;
  return (
    <FriendsList hide={hide}>
      {contactList.map((each) => {
        if (each.status !== "DENIED") {
          return (
            <FriendContainer
              key={each.friend_id}
              onClick={() => {
                setFriend(each);
                hide = !hide;
              }}
              selected={friend.user_id === each.user_id}
            >
              {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
              <div style={{ width: "225px" }}>
                <FriendName>{each.user_name}</FriendName>
              </div>
              <MessageDate>sad</MessageDate>
              {each.user_id && onlineFriends ? (
                <OnlineBubble online={!!onlineFriends.includes(each.user_id.toString())} />
              ) : null}
            </FriendContainer>
          );
        }
        return null;
      })}
      ;
    </FriendsList>
  );
};

export default Friends;
