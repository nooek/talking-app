import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Text,
  FieldsWrapper,
  Fields,
  SubmitButton,
} from "../../styles/RegisterAndLoginForm/Styles";
import defaultPfp from "../../assets/images/default_pfp.png";
import validatePassword from "../../validators/PasswordValidator";
import validateEmail from "../../validators/EmailValidator";
import validateUsername from "../../validators/UsernameValidator";

const Login = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [blockButton, setBlockButton] = useState(true);
  const { title } = props;
  document.title = title;

  useEffect(() => {
    const params = [name, email, password];
    if (params.includes("")) {
      setMessage("Please, fill all the fields");
      setBlockButton(true);
    } else {
      setBlockButton(false);
    }
  }, [name, email, password]);

  const register = () => {
    const validPassword = validatePassword(password);
    const validEmail = validateEmail(email);
    const validUsername = validateUsername(name);
    const isValid = validUsername && validEmail && validPassword;
    console.log(isValid);
    // if (isValid) {
    //   axios
    //     .post("http://localhost:3001/api/user/register", {
    //       name: name,
    //       password: password,
    //       userEmail: email,
    //       pfp: defaultPfp,
    //     })
    //     .then((res) => {
    //       setMessage(res.data.message);
    //     });
    // } else {
    //   if (validUsername.message) setMessage(validUsername.message);
    //   if (validEmail.message) setMessage(validEmail.message);
    //   if (validPassword.message) setMessage(validPassword.message);
    // }
    axios
      .post("http://localhost:3001/api/user/register", {
        name: name,
        password: password,
        userEmail: email,
        pfp: defaultPfp,
      })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  return (
    <Container>
      <Card>
        <Text>Register</Text>
        <FieldsWrapper>
          <Fields placeholder="Name" onChange={(e) => setName(e.target.value)} maxLength={30} />
          <Fields placeholder="Email" onChange={(e) => setEmail(e.target.value)} maxLength={120} />
          <Fields placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </FieldsWrapper>
        <SubmitButton disabled={blockButton} onClick={() => register()}>
          Register
        </SubmitButton>
      </Card>
      {message ? <h2 style={{ color: "white" }}>{message}</h2> : null}
      <h2 style={{ color: "white", fontSize: "20px" }}>
        If you already have an account,
        <Link to="/login">login</Link>
      </h2>
    </Container>
  );
};

export default Login;
