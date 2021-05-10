import React, { useState } from "react"
import { 
    Category,
    Container, 
    PrivacyOptionsContainer,
    PrivacyOption,
    BlocksList,
} from "./Styles"
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import { useUserData } from "../../../store/userDataProvider"

const Configurations = () => {
    const { userData, setUserData } = useUserData()
    const [checked, setChecked] = useState(userData[0].online_status)
    const [checked2, setChecked2] = useState(false)
    
    const updateUser = async () => {
        await axios
      .put("http://localhost:3001/api/user", {
        name: userData[0].user_name,
        desc: userData[0].user_desc,
        pfp: userData[0].user_pfp,
        onlineStatus: checked === true ? true : false,
        id: userData[0].user_id
      })
    }

    return(
        <Container>
            <Category>Privacy</Category>
            <PrivacyOptionsContainer>
                <div>
                    <PrivacyOption>Show read tick</PrivacyOption>
                    <Switch checked={checked} onChange={() => setChecked(!checked)} onClick={() => updateUser()} />
                </div>
                <div>
                    <PrivacyOption>Show online status</PrivacyOption>
                    <Switch checked={checked2} onChange={() => setChecked2(!checked2)} />
                </div>
            </PrivacyOptionsContainer>
            <Category>Blocks</Category>
            <BlocksList></BlocksList>
            
        </Container>
    )
}

export default Configurations