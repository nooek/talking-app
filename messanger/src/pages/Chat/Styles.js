import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media(max-width: 700px){
    flex-direction: column;
  }
`;

export const ChatSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media(max-width: 700px){
    width: 100%;
    height: 100%;
  }
`;

export const MessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
  z-index: 2; 
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(120, 120, 120);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 0, 0);
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  :first-child {
    margin-top: 20px;
  }
  @media(max-width: 700px){
    height: 100%;
  }
`;

export const GoToLastMessageButton = styled.button`
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 80px;
  right: 35px;
  background: rgb(99, 240, 99);
  border-radius: 50%;
  border: 2px solid white;
  z-index: 15;
  cursor: pointer;
`

export const MessageContainer = styled.div`
  width: auto;
  min-width: 200px;
  height: auto;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  z-index: 1;
  position: relative;
  word-break: break-word;
  text-align: left;
  background-color: ${(props) =>
    props.sender === true ? "rgb(123, 123, 240)" : "rgb(7, 194, 7)"};
  align-self: ${(props) => (props.sender === true ? "flex-end" : "flex-start")};
  ${(props) =>
    props.sender === true
      ? "border-top-left-radius: 25px"
      : "border-top-right-radius: 245px"};
  ${(props) =>
    props.sender === true
      ? "border-bottom-left-radius: 25px"
      : "border-bottom-right-radius: 245px"};
  border-bottom-left-radius: 25px;
  margin-bottom: ${(props) => (props.sender === true ? "10px" : "30px")};
  margin-top: ${(props) => (props.sender === true ? "0px" : "20px")};
  border-right: ${(props) =>
    props.sender === true
      ? "2px solid rgb(68, 68, 241)"
      : "2px solid rgb(15, 124, 15)"};
  border-top: ${(props) =>
    props.sender === true
      ? "2px solid rgb(68, 68, 241)"
      : "2px solid rgb(15, 124, 15)"};
  border-bottom: ${(props) =>
    props.sender === true
      ? "2px solid rgb(68, 68, 241)"
      : "2px solid rgb(15, 124, 15)"};
`;

export const Message = styled.h2`
  margin: 10px;
  font-size: 18px;
  z-index: 2;
`;

export const MessageTime = styled.h2`
  font-size: 13px;
  color: black;
  position: absolute;
  bottom: 0;
  right: 0;
`