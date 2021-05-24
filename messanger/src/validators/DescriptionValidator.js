const validateDescription = (description) => {
    if (description) {
        if (description.length > 60){
            return { message: "Your description must have less than 60 characters" }
        }
        if (description.length <= 0){
            return { message: "Your description must have more than 1 character" }
        }
        return true
    }
}

export default validateDescription