import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const id = localStorage.getItem('id')
    const newSocket = io("http://localhost:3001/", {
      transports: ["websocket"],
      query: `userid=${id}`,
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>{children}</SocketContext.Provider>
  );
}
