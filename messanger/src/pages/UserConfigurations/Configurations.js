import React, { useState } from "react"
import { 
    Category,
    Container, 
    PrivacyOptionsContainer,
    PrivacyOption,
    BlocksList,
    ChangeChatBackground
} from "./Styles"
import Switch from '@material-ui/core/Switch';

const Configurations = () => {
    const [checked, setChecked] = useState(false)
    const [checked2, setChecked2] = useState(false)

    return(
        <Container>
            <Category>Privacy</Category>
            <PrivacyOptionsContainer>
                <div>
                    <PrivacyOption>Show read tick</PrivacyOption>
                    <Switch checked={checked} onChange={() => setChecked(!checked)} />
                </div>
                <div>
                    <PrivacyOption>Show online status</PrivacyOption>
                    <Switch checked={checked2} onChange={() => setChecked2(!checked2)} />
                </div>
            </PrivacyOptionsContainer>
            <Category>Blocks</Category>
            <BlocksList></BlocksList>
            <Category>Change chat background</Category>
            <ChangeChatBackground>Change chat background</ChangeChatBackground>
        </Container>
    )
}

export default Configurations