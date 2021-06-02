const validatePassword = (password) => {
  if (password) {
    if (password.length <= 7) {
      return { message: "Your password must have more than 7 characters " };
    }

    if (password.length >= 50) {
      return { message: "Your password must have less than 51 characters " };
    }

    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      return { message: "Your password must have at least one number " };
    }

    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~ ]/;
    if (!hasSpecialCharacter.test(password)) {
      return {
        message: "Your password must have at least one special character",
      };
    }

    return true;
  }
  return { message: "You must provide a password " };
};

export default validatePassword;
