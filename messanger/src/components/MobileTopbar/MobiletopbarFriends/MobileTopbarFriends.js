import React from "react";
import { useFriend } from "../../../store/friendProvider";
import {
  FriendsList,
  FriendContainer,
  FriendName,
  LastContactMessage,
  MessageDate,
  FriendPfp,
  OnlineBubble,
} from "./Styles";

const Friends = (props) => {
  const { friend, setFriend } = useFriend();
  return (
    <FriendsList hide={props.hide}>
      {props.contactList.map((each, index) => {
        if (each.status !== "DENIED") {
          return (
            <FriendContainer
              key={index}
              onClick={() => {
                setFriend(each);
                if (props.hide) {
                  props.hide = !props.hide;
                }
              }}
              selected={friend.user_id === each.user_id ? true : false}
            >
              {each.user_pfp ? <FriendPfp src={each.user_pfp} /> : null}
              <FriendName>{each.user_name}</FriendName>
              <LastContactMessage>dsada</LastContactMessage>
              <MessageDate>sad</MessageDate>
              {each.user_id ? (
                <OnlineBubble
                  online={
                    props.onlineFriends &&
                    props.onlineFriends.includes(each.user_id.toString())
                      ? true
                      : false
                  }
                />
              ) : null}
            </FriendContainer>
          );
        } else {
          return null;
        }
      })}
      ;
    </FriendsList>
  );
};

export default Friends;
