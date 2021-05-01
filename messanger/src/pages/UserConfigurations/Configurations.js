import React, { useState } from "react"
import { 
    Category,
    Container, 
    PrivacyOptionsContainer,
    PrivacyOption,
    BlocksList,
} from "./Styles"
import Switch from '@material-ui/core/Switch';
// import axios from "axios";
// import { useUserData } from "../../store/userDataProvider"

const Configurations = () => {
    const [checked, setChecked] = useState(false)
    const [checked2, setChecked2] = useState(false)
    // const { userData, setUserData } = useUserData()

    // const updateUser = () => {
    //     axios
    //     .get(`http://localhost:3001/api/user/${userData[0].user_id}`)
    //     .then(res => {
    //         if (res.data){
    //             setUserData(res.data)
    //         }
    //     })
    // }

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
            
        </Container>
    )
}

export default Configurations