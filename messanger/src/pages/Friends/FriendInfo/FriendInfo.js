import React from "react"
import { Link } from "react-router-dom"
import { useFriend } from "../../../store/friendProvider"
import {
    ContactImage,
    Container, 
    InfoContainer, 
    Parent,
    InformationName,
    Information,
    GoBack
} from "./Styles"

const FriendInfo = () => {
    const { friend } = useFriend()
    return(
        <Container>
            <Link to="/chat">
                <GoBack />
            </Link>
            <Parent>
                <ContactImage src={friend.user_pfp} />
                <InfoContainer>
                    <InformationName>Name</InformationName>
                    <Information>{friend.user_name}</Information>
                </InfoContainer>
                <InfoContainer>
                    <InformationName>Description</InformationName>
                    <Information>{friend.user_desc}</Information>
                </InfoContainer>
            </Parent>
        </Container>
    )
}

export default FriendInfo