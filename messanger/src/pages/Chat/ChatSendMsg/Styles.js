import styled from "styled-components";

export const MessageTypeContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  background-color: rgba(221, 221, 221, 0.493);
  align-items: center;
`;

export const SendMessageButton = styled.button`
  width: 20%;
  height: 100%;
  background-color: rgb(81, 255, 0);
  border: none;
  font-weight: bold;
  position: absolute;
  right: 0;
  @media(max-width: 400px){
    width: 30%;
  }
`;

export const MessageInput = styled.input`
  width: 75%;
  height: 80%;
  border-radius: 25px;
  border: none;
  margin-left: 5px;
  @media(max-width: 400px){
    width: calc(100% - 31%);
    margin-left: 0;
    position: absolute;
    left: 0;
  }
  :focus {
    outline: none;
  }
`;
