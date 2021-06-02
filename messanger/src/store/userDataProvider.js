import React, { useContext, createContext, useState } from "react";

const data = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  return <data.Provider value={{ userData, setUserData }}>{children}</data.Provider>;
};

export const useUserData = () => {
  const context = useContext(data);
  const { userData, setUserData } = context;
  return { userData, setUserData };
};

export default UserDataProvider;
