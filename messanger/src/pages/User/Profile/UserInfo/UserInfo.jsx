import React, { useState } from "react";
import { useUserData } from "../../../../store/userDataProvider";
import {
  UserInfoContainer,
  UserInfoField,
  UserInfoFieldInfo,
  UserInfoFieldSubTitle,
  ChangeButton,
} from "./Styles";
import axios from "axios";
import UserFieldInfo from "./UserInfoField/UserInfoField.jsx";
import { getUserData } from "../../../../services/API/tasks/APItasks" 

const UserInfo = () => {
  const { userData, setUserData } = useUserData();
  const [showField, setShowField] = useState(false);
  const [fieldSelected, setFieldSelected] = useState([]);
  const [newName, setNewName] = useState(userData[0].user_name);
  const [newDescription, setNewDescription] = useState(userData[0].user_desc);

  const checkIfEnterPressed = (e) => {
    const code = e.which;
    if (code === 13) {
      saveUserInfo()
    }
  };

  const getUser = () => {
    getUserData(userData[0].user_id).then(res => {
      setUserData(res.data)
      console.log(userData)
    })
  }

  console.log(userData)

  const saveUserInfo = () => {
    axios
      .put("http://localhost:3001/api/user", {
        name: newName === undefined ? '' : newName,
        desc: newDescription === undefined ? '' : newDescription,
        pfp: userData[0].user_pfp,
        onlineStatus: userData[0].online_status,
        id: userData[0].user_id
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error){
          getUser()
        }
      });
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
        />
        <ChangeButton onClick={() => openField("description")}>
          change
        </ChangeButton>
      </UserInfoField>
      <UserInfoField>
        <UserInfoFieldSubTitle>Email</UserInfoFieldSubTitle>
        <UserInfoFieldInfo>{userData[0].user_email}</UserInfoFieldInfo>
      </UserInfoField>
    </UserInfoContainer>
  );
};

export default UserInfo;
