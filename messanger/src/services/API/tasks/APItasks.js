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
  return console.error("You must provide a user id")
};

export const getFriendsData = async (userId) => {
  if (userId) {
    const response = await axios.get(
      `${API_ADDRESS}/friends/getfriendsbyuser/${userId}`
    );
    console.log(response);
    if (response.data.message || response.data.error) {
      console.error(response.data);
    }

    if (response.data && response.data.length > 0) {
      return response;
    }
  }
  return console.error("You must provide a user id")
};

export const getMessagesData = async (userId) => {
  if (userId) {
    const response = await axios.get(`${API_ADDRESS}/message/${userId}`);
    if (response.error || response.data.message) {
      console.log(response.data);
      return;
    }
    if (response.data && response.data.length > 0) {
      return response;
    }
  }
  return console.error("You must provide a user id")
};