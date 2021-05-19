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
              <div style={{width: "225px"}}>
                <FriendName>{each.user_name}</FriendName>
              </div>
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
