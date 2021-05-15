import styled, { keyframes } from "styled-components"

const fade = keyframes`
    from {height: 0px;}
    to {height: 100%;}
`

export const Container = styled.div`
    animation: 1s ease-out 0s 1 ${fade};
    background: rgb(34, 34, 34);
    width: 400px;
    height: 100%;   
    position: absolute;
    right: 0;
    top: 0;
    z-index: 17;
    text-align: center;
    @media(max-width: 400px){
        width: 100%;
        height: 96.8%;
        bottom: 0;
        top: 30px;
    }
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
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(120, 120, 120);
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    
  }

  ::-webkit-scrollbar {
    width: 10px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  :first-child {
    margin-top: 20px;
  }
`

export const CloseButton = styled.button`
    width: 80%;
    height: 35px;
    border: 0;
    position: absolute;
    bottom: 130px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid black;
    :focus{
        outline: none;
    }
`

export const MessageContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid white;
`

export const MessageContent = styled.h2`
    color: white;
`

export const MessageDate = styled.h3`
    font-size: 15px;
    color: white;
`

export const PersonThatSend = styled.h2`
    color: white;
    font-style: italic;
`