import React from "react"
import {
    Container,
    Message
} from "./Styles"

const PageNotFound = (props) => {
    document.title = props.title
    return(
        <Container>
            <Message>This page does not exist :(</Message>
            <h2 style={{color: "white"}}>return to <a href="/" style={{color: "white"}}>Home</a></h2>
        </Container>
    )
}

export default PageNotFound