import { useEffect, useRef } from "react";
import { useContacts } from "../store/contactsProvider";
import { useFriend } from "../store/friendProvider";
import { useSocket } from "../store/socketProvider";

const UpdateContact = ({ children }) => {
  const { contacts, setContacts } = useContacts();
  const { socket } = useSocket();
  const { friend, setFriend } = useFriend();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      socket.on("update-contact", (data) => {
        if (data[1] !== "BLOCKED") {
          const friends = contacts.filter((each) => each.user_id !== data[0]);
          const friendFiltered = contacts.filter((each) => each.user_id === data[0]);

          const newStatus = data[1];
          if (data[1] === "ACCEPTED" && friend[0].status !== "BLOCKED") {
            friendFiltered[0].status = newStatus;
            if (friend.user_id === friend[0].user_id) {
              setFriend(...friend);
              setContacts(...friends, friendFiltered);
            }
          }
          if (data[1] !== "ACCEPTED") {
            friendFiltered[0].status = newStatus;
            setFriend(...friend);
            setContacts(...friends, ...friendFiltered);
          }
        }
      });
    }
    return () => {
      socket.off("update-contact");
      isMounted.current = false;
    };
  }, [contacts, socket, friend, setContacts, setFriend]);

  return [children];
};

export default UpdateContact;
