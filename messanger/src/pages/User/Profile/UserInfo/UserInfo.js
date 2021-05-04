import React, { useState } from "react";
import { useUserData } from "../../../../store/userDataProvider";
import {
  UserFieldChangeInfo,
  UserInfoContainer,
  UserInfoField,
  UserInfoFieldInfo,
  UserInfoFieldSubTitle,
} from "./Styles";
import axios from "axios";
import UserFieldInfo from "./UserInfoField/UserInfoField";

const UserInfo = () => {
    const { userData } = useUserData();
    const [showField, setShowField] = useState(false)

    const updateUserInfo = () => {

    }

    return (
        <UserInfoContainer>
        <UserInfoField>
            <UserInfoFieldSubTitle>Name</UserInfoFieldSubTitle>
            <UserFieldInfo showField={showField} content={userData[0].user_name} subtitle="Name" />
            <button onClick={() => setShowField(!showField)}>change</button>
        </UserInfoField>
        <UserInfoField>
            <UserInfoFieldSubTitle>Description</UserInfoFieldSubTitle>
            <UserFieldInfo showField={showField} content={userData[0].user_desc} subtitle="Description" />
            <button onClick={() => setShowField(!showField)}>change</button>
        </UserInfoField>
        <UserInfoField>
            <UserInfoFieldSubTitle>Email</UserInfoFieldSubTitle>
            <UserInfoFieldInfo>{userData[0].user_email}</UserInfoFieldInfo>
        </UserInfoField>
        </UserInfoContainer>
    );
};

export default UserInfo;
