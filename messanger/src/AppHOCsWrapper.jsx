import React from "react";
import {
  CheckUserLogged,
  GetUserData,
} from "./HOCs/index";

const AppHOCsWrapper = ({ children }) => (
  <CheckUserLogged>
    <GetUserData>
      { children }
    </GetUserData>
  </CheckUserLogged>
);

export default AppHOCsWrapper;
