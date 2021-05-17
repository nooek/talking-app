import React, { useState, useCallback, useEffect, cloneElement } from "react";
import { useSocket } from "../store/socketProvider";
import { useContacts } from "../store/contactsProvider";
import { useFriend } from "../store/friendProvider";
import { useMessages } from "../store/messagesProvider"
import { useUserData } from "../store/userDataProvider"
// import updateContactStatus from "../pages/Chat/functions/updateContactStatus";
import defaultPfp from "../assets/default_pfp.png"

const GetFriendRealTimeInfo = ({ children }) => {
  const { socket } = useSocket();
  const { contacts, setContacts } = useContacts();
  const { friend, setFriend } = useFriend();
  const { messages } = useMessages()
  const { userData } = useUserData()
  const [friendsOnline, setFriendsOnline] = useState([]);

  const updateOnlineFriends = useCallback(() => {
    socket.emit("get-users-online");
    socket.on("get-user-online", (data) => {
      let onlineList = [];
      data.map((each) => {
        return onlineList.push(each.userId);
      });
      setFriendsOnline(onlineList);
    });

    return () => {
      socket.off("get-user-online");
    };
  }, [socket]);

  useEffect(() => {
    updateOnlineFriends();
  }, [updateOnlineFriends]);

  useEffect(() => {
    socket.on("update-contact", (data) => {
      console.log(data)
      const friends = contacts.filter(each => {
        return each.user_id !== data[0]
      })

      const friend = contacts.filter(each => {
        return each.user_id === data[0]
      })
      console.log(friend[0])

      if (data[1] !== "BLOCKED"){
        if (data[1] === "ACCEPTED" && friend[0].status !== "BLOCKED"){
          friend[0].status = data[1]
          if (friend.user_id === friend[0].user_id){
            setFriend(...friend)
            setContacts(...friends, friend)
          }
        }

        if (data[1] !== "ACCEPTED"){
          friend[0].status = data[1]
          setFriend(...friend)
          setContacts(...friends, ...friend)
        }
      }
    })
    return () => {
      socket.off("update-contact");
    };
  }, [contacts, socket, friend, setContacts, setFriend]);

  useEffect(() => {
    let inContacts = []
    contacts.map(each => {
      return inContacts.push(each.user_id)
    })
    let strangersMessageToSee = []
    messages.map(each => {
      if (each.author !== userData[0].user_id && !inContacts.includes(each.author)){
        console.log(each)
        inContacts.push(each.author)
        return strangersMessageToSee.push({
          user_pfp: defaultPfp,
          user_name: "Not added",
          friend_with: "",
          user_id: each.author,
          status: "REQUESTED"
        })
        
      }
      return null
    })

    if (strangersMessageToSee.length > 0){
      setContacts([...contacts, ...strangersMessageToSee])
    }
  }, [messages, userData, setContacts, contacts])

  return cloneElement(children, { friendsOnline: friendsOnline });
};

export default GetFriendRealTimeInfo;