import styled, { keyframes } from "styled-components"

const open = keyframes`
    from{transform: scale(0);}
    to{transform: scale(1);}
`

export const Container = styled.div`
    width: 180px;
    height: 250px;
    border: 1.5px solid purple;
    background: rgb(231, 229, 229);
    position: absolute;
    right: 30%;
    top: 55%;
    z-index: 2;
    transform-origin: top right;
    animation-name: ${open};
    animation-duration: 600ms;
    animation-fill-mode: both;
    border-radius: 25px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

export const Buttons = styled.button`
    width: 90%;
    height: 50px;
    border-bottom: 1px solid black;
    background: ${props => props.color ? props.color : "white"};
    border: 2px solid black;
    font-weight: bold;
    border-radius: 15px;
    :focus{
        outline: none;
        border: none;
    }
`