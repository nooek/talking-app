import { useRef } from "react";
import { useEffect } from "react";
import { useMessages } from "../store/messagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useUserData } from "../store/userDataProvider";
import defaultPfp from "../assets/images/default_pfp.png";

const UpdateStrangers = ({ children }) => {
  const { messages } = useMessages();
  const { contacts, setContacts } = useContacts();
  const { userData } = useUserData();
  const _isMounted = useRef(true);

  useEffect(() => {
    if (_isMounted.current) {
      let inContacts = [];
      contacts.map((each) => {
        return inContacts.push(each.user_id);
      });
      let strangersMessageToSee = [];
      messages.map((each) => {
        if (
          each.author !== userData[0].user_id &&
          !inContacts.includes(each.author)
        ) {
          inContacts.push(each.author);
          return strangersMessageToSee.push({
            user_pfp: defaultPfp,
            user_name: "Not added",
            friend_with: "",
            user_id: each.author,
            status: "REQUESTED",
          });
        }
        return null;
      });
      if (strangersMessageToSee.length > 0) {
        setContacts([...contacts, ...strangersMessageToSee]);
      }
    }
    
    return () => {
      _isMounted.current = false;
    };
  }, [messages, userData, setContacts, contacts]);

  return [children];
};

export default UpdateStrangers;
