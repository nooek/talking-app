import React, { useState } from "react";
import axios from "axios";
import { useUserData } from "../../../../store/userDataProvider";
import {
  UserInfoContainer,
  UserInfoField,
  UserInfoFieldInfo,
  UserInfoFieldSubTitle,
  ChangeButton,
} from "./Styles";
import UserFieldInfo from "./UserInfoField/UserInfoField";
import { getUserData } from "../../../../services/API/tasks/APItasks";
import validateUsername from "../../../../validators/UsernameValidator";
import validateDescription from "../../../../validators/DescriptionValidator";

const UserInfo = () => {
  const { userData, setUserData } = useUserData();
  const [showField, setShowField] = useState(false);
  const [fieldSelected, setFieldSelected] = useState([]);
  const [newName, setNewName] = useState(userData[0].user_name);
  const [newDescription, setNewDescription] = useState(userData[0].user_desc);

  const getUser = () => {
    getUserData(userData[0].user_id).then((res) => {
      setUserData(res.data);
    });
  };

  const saveUserInfo = () => {
    const validUsername = validateUsername(newName);
    const validDescription = validateDescription(newDescription);
    if (validUsername === true && validDescription === true) {
      axios
        .put("http://localhost:3001/api/user", {
          name: newName === undefined ? "" : newName,
          desc: newDescription === undefined ? "" : newDescription,
          pfp: userData[0].user_pfp,
          onlineStatus: userData[0].online_status,
          id: userData[0].user_id,
        }, {
          withCredentials: true,
        })
        .then((res) => {
          if (!res.data.error) {
            getUser();
          }
        });
    }
  };

  const checkIfEnterPressed = (e) => {
    const code = e.which;
    if (code === 13) {
      saveUserInfo();
    }
  };

  const openField = (field) => {
    setFieldSelected("");
    setShowField(!showField);
    setFieldSelected(field);
  };

  return (
    <UserInfoContainer>
      <UserInfoField>
        <UserInfoFieldSubTitle>Name</UserInfoFieldSubTitle>
        <UserFieldInfo
          showField={showField}
          content={userData[0].user_name}
          subtitle="Name"
          id="name"
          fieldselected={fieldSelected}
          change={(e) => setNewName(e.target.value)}
          save={() => saveUserInfo()}
          keypress={(e) => checkIfEnterPressed(e)}
          maxchars={30}
        />

        <ChangeButton onClick={() => openField("name")}>change</ChangeButton>
      </UserInfoField>
      <UserInfoField>
        <UserInfoFieldSubTitle>Description</UserInfoFieldSubTitle>
        <UserFieldInfo
          showField={showField}
          content={userData[0].user_desc}
          subtitle="Description"
          id="description"
          fieldselected={fieldSelected}
          change={(e) => setNewDescription(e.target.value)}
          save={() => saveUserInfo()}
          maxchars={60}
        />
        <ChangeButton onClick={() => openField("description")}>change</ChangeButton>
      </UserInfoField>
      <UserInfoField>
        <UserInfoFieldSubTitle>Email</UserInfoFieldSubTitle>
        <UserInfoFieldInfo>{userData[0].user_email}</UserInfoFieldInfo>
      </UserInfoField>
    </UserInfoContainer>
  );
};

export default UserInfo;
