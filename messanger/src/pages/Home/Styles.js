import styled from "styled-components"
import { Button } from "@material-ui/core"

export const Container = styled.div`
    width: 100%;
    height: 100%;
`
export const Header = styled.div`
    width: 100%;
    height: 300px;
    background-color: white;
    color: black;
    position: absolute;
    top: 0;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const IntroductionText = styled.h2`
    color: black;
    font-size: 50px;
    @media(max-width: 600px){
        font-size: 35px;
    }
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: calc(100% - 300px);
    text-align: center;
    align-items: center;
`

export const MainText = styled.h2`
    color: white;
    font-size: 35px;
    margin-top: 60px;
`

export const ButtonsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const MainButtons = styled(Button)`
    text-transform: none;
    margin-bottom: 30px;
    width: 350px;
    height: 40px;
    font-size: 16px;
    @media(max-width: 400px){
        width: 100%;
    }
`
