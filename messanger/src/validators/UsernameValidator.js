const validateUsername = (username) => {
  if (username) {
    if (username.length > 30) {
      return { message: "Your username must have less than 30 characters" };
    }
    if (username.length <= 0) {
      return { message: "Your username must have more than 1 character" };
    }
    return true;
  }
  return false;
};

export default validateUsername;
