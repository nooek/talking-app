import axios from "axios";

const API_ADDRESS = "http://localhost:3001/api";

const searchFriend = async (userId, searchName, axiosCancelToken) => {
  if (userId) {
    const response = await axios
      .get(`${API_ADDRESS}/find/friend/${userId}/${searchName}`, {
        cancelToken: axiosCancelToken,
      }).catch((err) => {
        if (!axios.isCancel(err)) console.log(err);
      });

    if (response) {
      if (response.data.error) {
        return console.error(response.data.error);
      }
      if (response.data) {
        return response;
      }
    }
    return null;
  }
  return console.error("You must provide a user id");
};

export default searchFriend;
