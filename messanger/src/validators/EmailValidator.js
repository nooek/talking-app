import validator from "validator"

const validateEmail = (email) => {
  if (email) {
    const isValid = validator.isEmail(email)
    if (isValid){
        return true
    } else {
        return { message: "Please pass an valid email" }
    }
  }
}

export default validateEmail