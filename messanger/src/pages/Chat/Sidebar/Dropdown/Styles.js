import styled, { keyframes } from "styled-components"

const open = keyframes`
    from{transform: scale(0);}
    to{transform: scale(1);}
`

export const Container = styled.div`
    width: 180px;
    height: auto;
    background: rgb(231, 229, 229);
    position: absolute;
    right: 30%;
    top: 55%;
    z-index: 2;
    transform-origin: top right;
    animation-name: ${open};
    animation-duration: 600ms;
    animation-fill-mode: both;
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(29, 29, 29);
`

export const Buttons = styled.button`
    color: white;
    border: none;    
    background: none;
    width: 100%;
    height: 80px;
    font-size: 18px;
    :hover{
        background: rgb(0, 0, 0);
    }
    :focus{
        outline: none;
    }
`