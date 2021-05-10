import React from "react";
import {
  Options,
  OptionsContainer,
  WarningContainer,
  WarningMessage,
} from "./Styles";

const Warning = (props) => {
  return (
    <WarningContainer>
      <WarningMessage>{props.msg}</WarningMessage>
      <OptionsContainer>
        <Options onClick={props.action}>Yes</Options>
        <Options onClick={props.toggle}>No</Options>
      </OptionsContainer>
    </WarningContainer>
  );
};

export default Warning;
