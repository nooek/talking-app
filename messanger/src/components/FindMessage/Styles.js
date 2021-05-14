import styled, { keyframes } from "styled-components"

const fade = keyframes`
    from {height: 0px;}
    to {height: 100%;}
`

export const Container = styled.div`
    width: 400px;
    height: 100%;   
    position: absolute;
    right: 0;
    top: 0;
    animation-name: ${fade};
    animation-duration: 800ms;
    background: rgb(34, 34, 34);
    z-index: 72;
`

export const Parent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const Title = styled.h2`
    font-size: 35px;
    color: white;
`

export const SearchField = styled.input`
    width: 80%;
    color: black;
    text-align: center;
    height: 30px;
    box-shadow: 5px 5px 5px rgb(0, 0, 0);
    border: none;
    :focus{
        outline: none;
    }
`

export const MessagesList = styled.div`
    width: 95%;
    height: auto;
    max-height: 550px;
    border: 1px solid white;
    box-shadow: 5px 5px 5px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    border-radius: 12px;
    overflow-x: auto;
`