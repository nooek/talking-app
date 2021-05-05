import React from "react";
import { 
  UserInfoFieldInfo,
  UserFieldChangeInfo, 
  UserFieldChangeInfoContainer, 
  Save
} from "../Styles";

const UserFieldInfo = (props) => {
  if (props.showField === true && props.fieldselected === props.id) {
    return (
      <UserFieldChangeInfoContainer>
        <UserFieldChangeInfo
          placeholder={"New " + props.subtitle}
          onChange={props.change}
          onKeyPress={props.keypress}
        />
        <Save onClick={props.save} />
      </UserFieldChangeInfoContainer>
    );
  } else {
    return <UserInfoFieldInfo>{props.content}</UserInfoFieldInfo>;
  }
};

export default UserFieldInfo;
