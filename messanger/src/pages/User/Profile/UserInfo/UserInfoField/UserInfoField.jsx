import React from "react";
import {
  UserInfoFieldInfo,
  UserFieldChangeInfo,
  UserFieldChangeInfoContainer,
  Save,
} from "../Styles";

const UserFieldInfo = (props) => {
  const { showField, fieldselected,
    save, change, subtitle, keypress, content, maxchars, id } = props;
  if (showField === true && fieldselected === id) {
    return (
      <UserFieldChangeInfoContainer>
        <UserFieldChangeInfo
          placeholder={`New ${subtitle}`}
          onChange={change}
          onKeyPress={keypress}
          maxLength={maxchars}
        />
        <Save onClick={save} />
      </UserFieldChangeInfoContainer>
    );
  }
  return <UserInfoFieldInfo>{content}</UserInfoFieldInfo>;
};

export default UserFieldInfo;
