import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useUserData } from "../store/userDataProvider";
import { useSocket } from "../store/socketProvider";

const GetUserData = ({ children }) => {
  const { setUserData } = useUserData();
  const { socket, setSocket } = useSocket();
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(true);
  const isMounted = useRef(true);
  const location = window.location.pathname;

  const createNewSocket = async (data) => {
    if (socket) {
      await socket.disconnect();
    }
    const newSocket = await io("http://localhost:3001/", {
      transports: ["websocket"],
      query: {
        room: data[0].user_id,
        showOnline: data[0].online_status,
      },
    });
    if (newSocket) {
      setSocket(newSocket);
      setLoading(false);
    }
    return () => newSocket.close();
  };

  useEffect(() => {
    if (isMounted.current) {
      if (location === "/login" || location === "/register") {
        setLoading(false);
        return () => {
          isMounted.current = false;
        };
      }
      axios
        .get("http://localhost:3001/api/user/getuser", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.user) {
            createNewSocket(res.data.user);
            setUserData(res.data.user);
          }
          if (!res.data.user) {
            setLogged(false);
          }
          setLoading(false);
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!loading && logged) {
    return children;
  }

  if (!loading && !logged) {
    // eslint-disable-next-line react/jsx-one-expression-per-line
    window.location.href = "http://localhost:3000/login";
  }
  return <></>;
};

export default GetUserData;
