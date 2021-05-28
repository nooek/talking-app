import { useEffect, cloneElement, useState, useRef } from "react";
import { useSocket } from "../store/socketProvider";

const UpdateOnlineFriends = ({ children }) => {
  const { socket } = useSocket();
  const [friendsOnline, setFriendsOnline] = useState([]);
  const _isMounted = useRef(true);

  useEffect(() => {
    if (_isMounted.current) {
      socket.emit("get-users-online");
      socket.on("get-user-online", (data) => {
        let onlineList = [];
        data.map((each) => {
          return onlineList.push(each.userId);
        });
        setFriendsOnline(onlineList);
      });
    }
    return () => {
      _isMounted.current = false;
      socket.off("get-user-online");
    };
  }, [socket]);

  return cloneElement(children, { friendsOnline: friendsOnline });
};

export default UpdateOnlineFriends;
