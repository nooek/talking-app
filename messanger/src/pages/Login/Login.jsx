import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import io from "socket.io-client";
import {
  Container,
  Card,
  Text,
  FieldsWrapper,
  Fields,
  SubmitButton,
} from "../../styles/RegisterAndLoginForm/Styles";
import { useUserData } from "../../store/userDataProvider";
import { useSocket } from "../../store/socketProvider";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const { setUserData } = useUserData();
  const { socket, setSocket } = useSocket();
  const { title } = props;
  document.title = title;

  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

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
      setRedirect(true);
    }
  };

  const login = () => {
    setUserData([]);
    axios
      .post(
        "http://localhost:3001/api/user/login",
        {
          password: password,
          userEmail: email,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
        } else {
          setUserData(res.data.user_info);
          createNewSocket(res.data.user_info);
        }
      });
  };

  return (
    <Container>
      <Card>
        <Text>Login</Text>
        <FieldsWrapper>
          <Fields placeholder="Email" onChange={(e) => setEmail(e.target.value)} maxLength={120} />
          <Fields placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </FieldsWrapper>
        <SubmitButton onClick={() => login()}>Login</SubmitButton>
      </Card>
      {message ? <h2 style={{ color: "white" }}>{message}</h2> : null}
      {redirect === true ? <Redirect to="/" /> : null}
      <h2 style={{ color: "white" }}>
        If you dont have an account,
        <Link to="/register">register</Link>
      </h2>
    </Container>
  );
};

export default Login;
