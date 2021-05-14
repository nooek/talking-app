import axios from "axios"

const API_ADDRESS = "http://localhost:3001/api/message";

export const findMessage = async (userId, searchKey) => {
    const res = await axios
    .get(`${API_ADDRESS}/find/${userId}/${searchKey}`)

    if (res.data.error){
        console.error(res.data.error)
    }

    if (res.data){
       return res
    }
    return console.error("Something went wrong")    
}

export const getChatMessagesData = () => {

}