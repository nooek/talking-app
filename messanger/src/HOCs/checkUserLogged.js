import React from "react";
import { Link } from "react-router-dom";

const CheckUserLogged = ({ children }) => {
  const id = localStorage.getItem("id");
  const location = window.location.pathname;

  if (location === "/login" || location === "/register") {
    return children;
  }

  if (id) {
    return children;
  }
  return <Link to="/login">Please LogIn</Link>;
};

export default CheckUserLogged;
