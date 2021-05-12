import React, { useState } from "react";
import {
  Container,
  Card,
  Text,
  FieldsWrapper,
  Fields,
  SubmitButton,
} from "../../styles/RegisterAndLoginForm/Styles";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useUserData } from "../../store/userDataProvider";
import { useSocket } from "../../store/socketProvider";
import io from "socket.io-client";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const { setUserData } = useUserData();
  const { socket, setSocket } = useSocket();
  document.title = props.title;

  const login = async () => {
    await axios
      .post(
        "http://localhost:3001/api/user/login",
        {
          password: password,
          userEmail: email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
        } else {
          getUserData();
        }
      });
  };

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

  return (
    <Container>
      <Card>
        <Text>Login</Text>
        <FieldsWrapper>
          <Fields
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Fields
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FieldsWrapper>
        <SubmitButton onClick={() => login()}>Login</SubmitButton>
      </Card>
      {message ? <h2 style={{ color: "white" }}>{message}</h2> : null}
      {redirect === true ? <Redirect to="/chat" /> : null}
    </Container>
  );
};

export default Login;