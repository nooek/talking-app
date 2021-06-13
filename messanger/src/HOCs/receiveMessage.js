import { useEffect } from "react";
import messageNotificationSound from "../assets/sounds/message-notification.ogg";
import { useContactMessages } from "../store/contactMessagesProvider";
import { useContacts } from "../store/contactsProvider";
import { useFriend } from "../store/friendProvider";
import { useMessages } from "../store/messagesProvider";
import { useSocket } from "../store/socketProvider";
import { useUserData } from "../store/userDataProvider";

const ReceiveMessage = ({ children }) => {
  const { setContactMessages } = useContactMessages();
  const { contacts, setContacts } = useContacts();
  const { messages, setMessages } = useMessages();
  const { friend } = useFriend();
  const { socket } = useSocket();
  const { userData } = useUserData();

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
          if (message.author === friend.user_id) {
            // eslint-disable-next-line max-len
            setContactMessages((prevContactMessages) => [message, ...prevContactMessages.reverse()]);
          }
          setMessages([message, ...messages]);
          const contactsWithoutFriend = contacts.filter((each) => each.user_id !== message.author);
          const messageAuthor = contacts.filter((each) => each.user_id === message.author);
          setContacts([...messageAuthor, ...contactsWithoutFriend]);
          playAudio(new Audio(messageNotificationSound));
        }
      });
      return () => {
        socket.off("receive-message");
      };
    }
    return () => {};
  }, [socket, messages, setMessages, userData, contacts, friend]);

  return children;
};

export default ReceiveMessage;
