import React, { useState, useEffect, useRef } from "react";
import axios from "axios"

const GetUserData = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const _isMounted = useRef(true);

  useEffect(() => {
    if (_isMounted.current) {
      axios.get('')
      setLoading(true)
    }
    return () => {
      _isMounted.current = false;
    };
  }, []);

  if (loading) {
    return children;
  } else {
    return <></>;
  }
};

export default GetUserData;
