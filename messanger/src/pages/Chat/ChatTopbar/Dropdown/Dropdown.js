import React, { useState } from "react"
import { 
    Container,
    Options, 
    OptionsContainer, 
    WarningContainer,
    WarningMessage  
} from "./Styles"

const Dropdown = () => {
    const [showWarning, setShowWarning] = useState(false)
    const [warningMessage, setWarningMessage] = useState("")

    const openWarning = (message) => {
        if (!message) return
        setShowWarning(true)
        setWarningMessage(message)
    }

    return(
        <Container>
            <Options>Friend Info</Options>
            <Options onClick={() => openWarning("Do you want to clear the chat?")}>Clear Chat</Options>
            <Options onClick={() => openWarning("Do you want to block that contact?")}>Block</Options>
            {
                showWarning === true ?
                <WarningContainer>
                    <WarningMessage>{warningMessage}</WarningMessage>
                    <OptionsContainer>
                        <Options>Yes</Options>
                        <Options>No</Options>
                    </OptionsContainer>
                </WarningContainer>
                : null
            }
        </Container>
    )
}

export default Dropdown