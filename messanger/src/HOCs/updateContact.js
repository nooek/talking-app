import { useEffect, useRef } from "react";
import { useContacts } from "../store/contactsProvider";
import { useFriend } from "../store/friendProvider";
import { useSocket } from "../store/socketProvider";

const UpdateContact = ({ children }) => {
    const { contacts, setContacts } = useContacts()
    const { socket } = useSocket()
    const { friend, setFriend } = useFriend()
    const _isMounted = useRef(true);

    useEffect(() => {
      if (_isMounted.current){
        socket.on("update-contact", (data) => {
          if (data[1] !== "BLOCKED") {
            const friends = contacts.filter((each) => {
              return each.user_id !== data[0];
            });
    
            const friend = contacts.filter((each) => {
              return each.user_id === data[0];
            });
            console.log(data);
    
            console.log(friend[0]);
            if (data[1] === "ACCEPTED" && friend[0].status !== "BLOCKED") {
              friend[0].status = data[1];
              if (friend.user_id === friend[0].user_id) {
                setFriend(...friend);
                setContacts(...friends, friend);
              }
            }
    
            if (data[1] !== "ACCEPTED") {
              friend[0].status = data[1];
              setFriend(...friend);
              setContacts(...friends, ...friend);
            }
          }
        });
      }
        return () => {
          socket.off("update-contact");
          _isMounted.current = false
        };
      }, [contacts, socket, friend, setContacts, setFriend]);
    
    return ([children ])
}

export default UpdateContact