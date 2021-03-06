/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Container,
  NameAndPfpContainer,
  UserName,
  UserPfp,
  ButtonsContainer,
  Buttons,
  GoBackPage,
  Change,
  ChangePfpIcon,
  DeleteAccAlert,
  DeleteAccMessage,
  DeleteAccMessageContainer,
  DeleteAccOptionsContainer,
  DeleteAccOptions,
} from "./Styles";
import { useUserData } from "../../../store/userDataProvider";
import { useSocket } from "../../../store/socketProvider";
import UserInfo from "./UserInfo/UserInfo";
import { getUserData } from "../../../services/API/tasks/APItasks";

const Profile = (props) => {
  const { title } = props;
  document.title = title;
  const { userData, setUserData } = useUserData();
  const [goToLoginPage, setGoToLogin] = useState();
  const { socket } = useSocket();
  const [profilePic, setProfilePic] = useState(userData[0].user_pfp);
  const [pfpPreview, setPfpPreview] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteAccAlert, setDeleteAccAlert] = useState(false);

  const logOut = () => {
    localStorage.removeItem("id");
    setGoToLogin(true);
    socket.disconnect();
  };

  const deleteAccount = async () => {
    await axios.delete("http://localhost:3001/api/user", {
      data: {
        id: userData[0].user_id,
      },
    });
    localStorage.removeItem("id");
    setGoToLogin(true);
  };

  const updateUser = async () => {
    const response = await getUserData(userData[0].user_id);
    if (response) setUserData(response.data);
  };

  const uploadProfilePicToDb = async (url) => {
    await axios
      .put("http://localhost:3001/api/user", {
        name: userData[0].user_name,
        desc: userData[0].user_desc,
        pfp: url,
        onlineStatus: userData[0].online_status,
        id: userData[0].user_id,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.error) {
          updateUser();
        }
      });
  };

  const uploadProfilePicToCloud = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "User Profile Pic");
    setUploadLoading(true);

    const res = await fetch("https://api.cloudinary.com/v1_1/dl6nr4es9/image/upload", {
      method: "POST",
      body: data,
    });
    const file = await res.json();

    await setProfilePic(file.secure_url);
    setUploadLoading(false);
    await uploadProfilePicToDb(file.secure_url);
  };

  return (
    <Container>
      <Link to="/">
        <GoBackPage />
      </Link>
      <NameAndPfpContainer>
        <UserName>{userData[0].user_name}</UserName>
        <UserPfp src={pfpPreview ? URL.createObjectURL(imageFile) : profilePic} />
        {uploadLoading === false ? (
          <div>
            <label htmlFor="file-input" label="photo-input">
              <ChangePfpIcon />
            </label>
            <input
              type="file"
              name="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setPfpPreview(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <p style={{ color: "white" }}>Loading...</p>
        )}
        <Change disabled={uploadLoading} type="submit" onClick={() => uploadProfilePicToCloud()}>
          Update pfp
        </Change>
      </NameAndPfpContainer>
      <UserInfo />
      <ButtonsContainer>
        <Buttons onClick={() => logOut()} color="primary" variant="contained">
          Log out
        </Buttons>
        <Buttons onClick={() => setDeleteAccAlert(true)} color="secondary" variant="contained">
          Delete Account
        </Buttons>
        {deleteAccAlert ? (
          <DeleteAccAlert>
            <DeleteAccMessageContainer>
              <DeleteAccMessage>You sure?</DeleteAccMessage>
              <DeleteAccMessage>You will lose your account and all your contacts</DeleteAccMessage>
            </DeleteAccMessageContainer>
            <DeleteAccOptionsContainer>
              <DeleteAccOptions onClick={() => deleteAccount()}>Yes</DeleteAccOptions>
              <DeleteAccOptions onClick={() => setDeleteAccAlert(false)}>No</DeleteAccOptions>
            </DeleteAccOptionsContainer>
          </DeleteAccAlert>
        ) : null}
      </ButtonsContainer>
      {goToLoginPage ? <Redirect to="/login" /> : null}
    </Container>
  );
};

export default Profile;
