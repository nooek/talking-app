import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
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

  const getUserData = async () => {
    socket.disconnect();

    const { data } = await axios.get("http://localhost:3001/api/user/getuser", {
      withCredentials: true,
    });

    if (data.user) {
      setUserData(data.user);
      localStorage.setItem("id", JSON.parse(data.user[0].user_id));
      const newSocket = io("http://localhost:3001/", {
        transports: ["websocket"],
        query: {
          room: data.user[0].user_id,
          showOnline: data.user[0].online_status,
        },
      });
      setSocket(newSocket);
      setRedirect(true);
    }
  };

  const login = async () => {
    await axios
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
          getUserData();
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
      {redirect === true ? <Redirect to="/chat" /> : null}
    </Container>
  );
};

export default Login;
