const validateMessage = (message) => {
  if (message) {
    if (message.length <= 0) {
      return false;
    }
    if (message.length > 1000) {
      return false;
    }
    return true;
  }
  return false;
};

export default validateMessage;
