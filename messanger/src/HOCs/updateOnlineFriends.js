import { useEffect, cloneElement, useState, useRef } from "react";
import { useSocket } from "../store/socketProvider";

const UpdateOnlineFriends = ({ children }) => {
  const { socket } = useSocket();
  const [friendsOnline, setFriendsOnline] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      socket.emit("get-users-online");
      socket.on("get-user-online", (data) => {
        const onlineList = [];
        data.map((each) => onlineList.push(each.userId));
        setFriendsOnline(onlineList);
      });
    }
    return () => {
      isMounted.current = false;
      socket.off("get-user-online");
    };
  }, [socket]);

  return cloneElement(children, { friendsOnline: friendsOnline });
};

export default UpdateOnlineFriends;
