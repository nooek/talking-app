import { useEffect } from "react";
import axios from "axios";
import messageNotificationSound from "../assets/sounds/message-notification.ogg";
import { useMessages } from "../store/messagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useUserData } from "../store/userDataProvider";
import { useFriend } from "../store/friendProvider";
import { useSocket } from "../store/socketProvider";
import defaultPfp from "../assets/images/default_pfp.png";

const UpdateStrangers = ({ children }) => {
  const { messages, setMessages } = useMessages();
  const { contacts, setContacts } = useContacts();
  const { userData } = useUserData();
  const { friend } = useFriend();
  const { socket } = useSocket();

  useEffect(() => {
    const API_ADDRESS = "http://localhost:3001/api";
    axios.get(`${API_ADDRESS}/message/${userData[0].user_id}`)
      .then((res) => {
        if (res.data.error) {
          console.error(res.data.error);
        }
        if (res.data) {
          setMessages(res.data);
        }
      });
  }, [userData]);

  const playAudio = (audio) => {
    audio.play();
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        const blockedContactsList = [];
        contacts.map((each) => {
          if (each.status === "BLOCKED") {
            return blockedContactsList.push(each.user_id);
          }
          return null;
        });

        if (message.author !== friend.user_id) {
          message.seen = false;
        }

        if (!blockedContactsList.includes(message.author)) {
          console.log("dsa543");
          setMessages([message, ...messages]);
          const inContacts = [];
          contacts.map((each) => inContacts.push(each.user_id));
          const strangersMessageToSee = [];
          if (message.author !== userData[0].user_id && !inContacts.includes(message.author)) {
            inContacts.push(message.author);
            strangersMessageToSee.push({
              user_pfp: defaultPfp,
              user_name: "Not added",
              friend_with: "",
              user_id: message.author,
              status: "REQUESTED",
            });
          }
          if (strangersMessageToSee.length > 0) {
            setContacts([...strangersMessageToSee, ...contacts]);
          }
          playAudio(new Audio(messageNotificationSound));
        }
      });
      return () => {
        socket.off("receive-message");
      };
    }
    return () => {};
  }, [socket, messages, setMessages, contacts, friend]);

  useEffect(() => {
    const inContacts = [];
    contacts.map((each) => inContacts.push(each.user_id));
    const strangersMessageToSee = [];
    messages.map((each) => {
      if (each.author !== userData[0].user_id && !inContacts.includes(each.author)) {
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
    console.log(strangersMessageToSee);
    if (strangersMessageToSee.length > 0) {
      setContacts([...contacts, ...strangersMessageToSee]);
    }
  }, [messages, userData]);

  return [children];
};

export default UpdateStrangers;
