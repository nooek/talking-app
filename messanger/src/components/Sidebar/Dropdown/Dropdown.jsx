import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useSocket } from "../../../store/socketProvider"
import { Buttons, Container } from "./Styles"

const Dropdown = () => {
    const [goToLoginPage, setGoToLogin] = useState(false)
    const { socket } = useSocket()

    const logOut = () => {
        localStorage.removeItem('id')
        setGoToLogin(true)
        socket.disconnect()
    }

    return(
        <Container>
            <Link to="/config" style={{width: "100%"}}>
                <Buttons id="config" color="green">Config</Buttons>
            </Link>
            <Buttons onClick={() => logOut()} 
            id="log-out" 
            color="red">Log out</Buttons>
            {goToLoginPage ? <Redirect to="/login" /> : null}
        </Container>
    )
}

export default Dropdown