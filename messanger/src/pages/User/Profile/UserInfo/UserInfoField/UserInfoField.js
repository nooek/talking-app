import React from "react"
import {
    UserInfoFieldInfo,
    UserFieldChangeInfo
} from "../Styles"

const UserFieldInfo = (props) => {
    if (props.showField === false){
        return(
            <UserInfoFieldInfo>{props.content}</UserInfoFieldInfo>
        )
    }else{
        return(
            <UserFieldChangeInfo placeholder={"New " + props.subtitle} />
        )
    }
}

export default UserFieldInfo