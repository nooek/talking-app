import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../../../store/socketProvider";
import { Buttons, Container } from "./Styles";

const Dropdown = () => {
  const [goToLoginPage, setGoToLoginPage] = useState(false);
  const { socket } = useSocket();

  console.log("dsada");
  const logOut = () => {
    localStorage.removeItem("id");
    axios.get("http://localhost:3001/api/user/logout/asd", {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        socket.disconnect();
        setGoToLoginPage(true);
      });
  };

  return (
    <Container>
      <Link to="/config" style={{ width: "100%" }}>
        <Buttons id="config" color="green">
          Config
        </Buttons>
      </Link>
      <Buttons onClick={() => logOut()} id="log-out" color="red">
        Log out
      </Buttons>
      {goToLoginPage ? <Redirect to="/login" /> : null}
    </Container>
  );
};

export default Dropdown;
