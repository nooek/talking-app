import React, { useState } from "react"
import { 
    Container, 
    NameAndPfpContainer, 
    UserName,
    UserPfp,
    ButtonsContainer,
    Buttons,
    GoBackPage,
} from "./Styles"
import { useUserData } from "../../../store/userDataProvider"
import { useSocket } from "../../../store/socketProvider"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"
import UserInfo from "./UserInfo/UserInfo"

const Profile = (props) => {
    document.title = props.title
    const { userData } = useUserData()
    const [goToLoginPage, setGoToLogin] = useState()
    const { socket } = useSocket()

    const logOut = () => {
        localStorage.removeItem('id')
        socket.emit("user-log-out", userData[0].user_id)
        setGoToLogin(true)
    }

    const deleteAccount = async () => {
        await axios.delete("http://localhost:3001/api/user", {
            data: {
                id: userData[0].user_id
            }
        })
        localStorage.removeItem('id')
        setGoToLogin(true)
    }
    
    return(
        <Container>
            <Link to="/chat">
                <GoBackPage />
            </Link>
            <NameAndPfpContainer>
                <UserName>{userData[0].user_name}</UserName>
                <UserPfp src={userData[0].user_pfp} />
            </NameAndPfpContainer>
            <UserInfo />
            <ButtonsContainer>
                <Buttons 
                onClick={() => logOut()}
                color="primary" 
                variant="contained">
                    Log out
                </Buttons>
                <Buttons 
                onClick={() => deleteAccount()}
                color="secondary" 
                variant="contained">
                    Delete Account
                </Buttons>
            </ButtonsContainer>
            { goToLoginPage ? <Redirect to="/login" /> : null }
        </Container>
    )
}

export default Profile