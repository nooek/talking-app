import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useUserData } from "../store/userDataProvider";
import { useSocket } from "../store/socketProvider";

const GetUserData = ({ children }) => {
  const { userData, setUserData } = useUserData();
  const { socket, setSocket } = useSocket();
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const location = window.location.pathname;

  const createNewSocket = async (data) => {
    console.log(data[0].user_id);
    if (socket) {
      await socket.disconnect();
    }
    console.log("dsa");
    const newSocket = await io("http://localhost:3001/", {
      transports: ["websocket"],
      query: {
        room: data[0].user_id,
        showOnline: data[0].online_status,
      },
    });
    console.log("dasda");
    if (newSocket) {
      console.log("dasda");
      setSocket(newSocket);
      setLoading(false);
    }
    return () => newSocket.close();
  };

  useEffect(() => {
    if (isMounted.current) {
      if (location === "/login" || location === "/register") {
        setLoading(false);
      }
      axios
        .get("http://localhost:3001/api/user/getuser", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          createNewSocket(res.data.user);
          setUserData(res.data.user);
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  console.log(userData);

  if (!loading) {
    return children;
  }
  return <></>;
};

export default GetUserData;
