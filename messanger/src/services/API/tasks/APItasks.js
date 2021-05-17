import axios from "axios";
const API_ADDRESS = "http://localhost:3001/api";

export const getUserData = async (userId) => {
  if (userId) {
    const response = await axios.get(`${API_ADDRESS}/user/${userId}`);
    console.log(response);
    if (response.data.message) {
      console.error(response.data.message);
      return;
    }
    if (response.data && response.data.length > 0) {
      return response;
    }
    return;
  }
  console.error("You must provide a user id")
  return 0
};

export const getFriendsData = async (userId) => {
  if (userId) {
    const response = await axios.get(
      `${API_ADDRESS}/friends/getfriendsbyuser/${userId}`
    );
    if (response.data.error) {
      console.error("An error ocurred: " + response.data.error)
    }
  
    if (response.data) {
      return response;
    }
  }
  console.error("You must provide a user id")
  return 0
};

export const getMessagesData = async (userId) => {
  if (userId) {
    const response = await axios.get(`${API_ADDRESS}/message/${userId}`);
    if (response.data.error) {
      console.log(response.data.error);
      return;
    }
    if (response.data) {
      return response;
    }
  }
  console.error("You must provide a user id")
  return 0
};