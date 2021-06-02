import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const GetUserData = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      axios.get("");
      setLoading(true);
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return children;
  }
  return <></>;
};

export default GetUserData;
