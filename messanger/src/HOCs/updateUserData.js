import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../store/userDataProvider";

const UpdateUserData = ({ children }) => {
  const { userData, setUserData } = useUserData();
  const [loading, setLoading] = useState(true);

  const getUserData = useCallback(async () => {
    await axios
      .get("http://localhost:3001/api/user/getuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data.user);
          setLoading(false);
        }
      });
  }, [setUserData]);

  useEffect(() => {
    getUserData()
    setLoading(false)
  }, [getUserData]);

  console.log(userData)

  if (loading === false) {
    return children;
  } else {
    return <></>;
  }
};

export default UpdateUserData;
