import React, { useState } from "react";
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
} from "./Styles";
import { useUserData } from "../../../store/userDataProvider";
import { useSocket } from "../../../store/socketProvider";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import UserInfo from "./UserInfo/UserInfo";
import { getUserData } from "../../../services/API/tasks/APItasks"

const Profile = (props) => {
  document.title = props.title;
  const { userData, setUserData } = useUserData();
  const [goToLoginPage, setGoToLogin] = useState();
  const { socket } = useSocket();
  const [profilePic, setProfilePic] = useState(userData[0].user_pfp);
  const [imageFile, setImageFile] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const logOut = () => {
    localStorage.removeItem("id");
    setGoToLogin(true);
    socket.disconnect()
  };

  const deleteAccount = async () => {
    console.log("sda")
    await axios.delete("http://localhost:3001/api/user", {
      data: {
        id: userData[0].user_id,
      },
    }).then(res => {
      console.log(res)
    })
    localStorage.removeItem("id");
    setGoToLogin(true);
  };

  const uploadProfilePicToCloud = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "User Profile Pic");
    setUploadLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dl6nr4es9/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    await setProfilePic(file.secure_url);
    setUploadLoading(false);
    await uploadProfilePicToDb(file.secure_url)
  };

  const uploadProfilePicToDb = async (url) => {
    await axios
      .put("http://localhost:3001/api/user", {
        name: userData[0].user_name,
        desc: userData[0].user_desc,
        pfp: url,
        onlineStatus: userData[0].online_status,
        id: userData[0].user_id
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error){
          updateUser()
        }
      });
  };

  const updateUser = async () => {
    const response = await getUserData(userData[0].user_id)
    if (response) setUserData(response)
    console.log(response)
  }

  return (
    <Container>
      <Link to="/chat">
        <GoBackPage />
      </Link>
      <NameAndPfpContainer>
        <UserName>{userData[0].user_name}</UserName>
        <UserPfp src={profilePic} />
        {uploadLoading === false ? (
          <div>
            <label htmlFor="file-input">
              <ChangePfpIcon />
            </label>
            <input
              type="file"
              name="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{display: "none"}}
            />
            
          </div>
        ) : (
          <p style={{ color: "white" }}>Loading...</p>
        )}
        <Change
          disabled={uploadLoading === false ? false : true}
          type="submit"
          onClick={() => uploadProfilePicToCloud()}
        >
          Update pfp
        </Change>
      </NameAndPfpContainer>
      <UserInfo />
      <ButtonsContainer>
        <Buttons onClick={() => logOut()} color="primary" variant="contained">
          Log out
        </Buttons>
        <Buttons
          onClick={() => deleteAccount()}
          color="secondary"
          variant="contained"
        >
          Delete Account
        </Buttons>
      </ButtonsContainer>
      {goToLoginPage ? <Redirect to="/login" /> : null}
    </Container>
  );
};

export default Profile;

//   const updateUserData = async () => {
//     console.log(userData[0].user_id)
//     await axios
//     .get(`http://localhost:3001/api/user/${userData[0].user_id}`)
//     .then(res => {
//       console.log(res)
//         if (!res.data.message){
//           setUserData(res.data)
//         }
//     })
// }
