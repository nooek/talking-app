import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  IntroductionText,
  MainContainer,
  MainText,
  ButtonsContainer,
  MainButtons,
} from "./Styles";

const Home = (props) => {
  const { title } = props;
  document.title = title;
  return (
    <Container>
      <Header>
        <IntroductionText>Talk with your friends in real time</IntroductionText>
      </Header>
      <MainContainer>
        <MainText>Create an account or Log in to continue</MainText>
        <ButtonsContainer>
          <Link to="/register" style={{ width: "100%", textDecoration: "none" }}>
            <MainButtons variant="contained" color="primary">
              Register
            </MainButtons>
          </Link>
          <Link to="/login" style={{ width: "100%", textDecoration: "none" }}>
            <MainButtons variant="contained" color="primary">
              Login
            </MainButtons>
          </Link>
        </ButtonsContainer>
      </MainContainer>
    </Container>
  );
};

export default Home;
