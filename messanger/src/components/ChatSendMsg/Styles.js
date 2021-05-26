import styled from "styled-components";
import { GrEmoji } from "react-icons/gr"

export const MessageTypeContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: rgb(167, 167, 167);
  align-items: center;
  border-top: 2px solid black;
  justify-content: space-around;
  z-index: 5;
`;

export const SendMessageButton = styled.button`
  width: 18%;
  height: 100%;
  border-left: 2px solid black;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
  background: transparent;
  font-size: 15px;
  right: 0;
  cursor: pointer;
  :hover{
    background: rgb(120, 120, 120)
  }
  @media(max-width: 400px){
    width: 30%;
  }
`;

export const MessageInput = styled.input`
  width: 70%;
  height: 80%;
  border-radius: 25px;
  border: none;
  margin-left: 5px;

  :focus {
    outline: none;
  }
`;

export const EmojiIcon = styled(GrEmoji)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`
