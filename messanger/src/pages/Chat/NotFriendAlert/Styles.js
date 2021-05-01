import styled from "styled-components"
import { Button } from "@material-ui/core"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 2px solid white;
    background: black;
    position: relative;
    margin-top: 80px;
`

export const Parent = styled.div`
    width: 350px;
    height: 250px;
`

export const Message = styled.h2`
    font-size: 20px;
    color: red;
    font-weight: bold;
`

export const ButtonsContainer = styled.div`
    width: 100%:
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

export const Buttons = styled(Button)`
    text-transform: none;
    width: 100px;
    height: 50px;
`