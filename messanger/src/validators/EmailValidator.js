import validator from "validator";

const validateEmail = (email) => {
  if (email) {
    const isValid = validator.isEmail(email);
    if (isValid) {
      return true;
    }
    return { message: "Please pass an valid email" };
  }
  return false;
};

export default validateEmail;
