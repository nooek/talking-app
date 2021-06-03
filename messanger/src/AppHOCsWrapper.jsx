import React from "react";
import { GetUserData } from "./HOCs/index";

const AppHOCsWrapper = ({ children }) => (
  <GetUserData>
    {children}
  </GetUserData>
);

export default AppHOCsWrapper;
