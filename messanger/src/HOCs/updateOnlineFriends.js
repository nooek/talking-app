import { useCallback, useEffect, cloneElement, useState } from "react";
import { useSocket } from "../store/socketProvider";

const UpdateOnlineFriends = ({ children }) => {
  const { socket } = useSocket();
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

  return cloneElement(children, { friendsOnline: friendsOnline });
};

export default UpdateOnlineFriends;
