import React from "react";
import {
  Options,
  OptionsContainer,
  WarningContainer,
  WarningMessage,
} from "./Styles";

const Warning = (props) => {
  const { msg, action, toggle } = props;
  return (
    <WarningContainer>
      <WarningMessage>{msg}</WarningMessage>
      <OptionsContainer>
        <Options onClick={action}>Yes</Options>
        <Options onClick={toggle}>No</Options>
      </OptionsContainer>
    </WarningContainer>
  );
};

export default Warning;
