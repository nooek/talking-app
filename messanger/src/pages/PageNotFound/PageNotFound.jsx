import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Message } from "./Styles";

const PageNotFound = (props) => {
  const location = useLocation();
  const { title } = props;
  document.title = title;
  return (
    <Container>
      <Message>
        The page
        {location.pathname.split("/")[1]}
        does not exist :(
      </Message>
      <h2 style={{ color: "white" }}>
        return to
        <a href="/" style={{ color: "white" }}>
          Home
        </a>
      </h2>
    </Container>
  );
};

export default PageNotFound;
