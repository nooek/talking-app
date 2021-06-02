import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserData } from "../store/userDataProvider";

const GetUserData = ({ children }) => {
  const { setUserData } = useUserData();
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      axios.get("http://localhost:3001/api/user/getuser", {
        withCredentials: true,
      }).then((res) => {
        setUserData(res.data.data.user);
        setLoading(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!loading) {
    return children;
  }
  return <></>;
};

export default GetUserData;
