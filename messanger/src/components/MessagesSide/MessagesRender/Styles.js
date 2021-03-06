import styled from "styled-components";

export const MessageContainer = styled.div`
  width: auto;
  min-width: 200px;
  max-width: 300px;
  height: auto;
  display: flex;
  flex-direction: row;
  z-index: 1;
  position: relative;
  word-break: break-word;
  text-align: left;
  background-color: ${(props) => (props.sender === true ? "rgb(123, 123, 240)" : "rgb(7, 194, 7)")};
  align-self: ${(props) => (props.sender === true ? "flex-end" : "flex-start")};
  margin-bottom: ${(props) => (props.sender === true ? "10px" : "30px")};
  margin-top: ${(props) => (props.sender === true ? "10px" : "20px")};
  /* border-right: ${(props) => (props.sender === true ? "2px solid rgb(68, 68, 241)" : "2px solid rgb(15, 124, 15)")}; */
  /* border-top: ${(props) => (props.sender === true ? "2px solid rgb(68, 68, 241)" : "2px solid rgb(15, 124, 15)")}; */
  /* border-bottom: ${(props) => (props.sender === true ? "2px solid rgb(68, 68, 241)" : "2px solid rgb(15, 124, 15)")}; */
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-left: ${(props) => (props.sender === true ? "2px solid black" : "")};
  border-right: ${(props) => (props.sender === false ? "2px solid black" : "")};
`;

export const Message = styled.h2`
  margin-bottom: 30px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 5px;
  font-size: 18px;
  z-index: 2;
`;

export const MessageTime = styled.h2`
  font-size: 13px;
  color: black;
  position: absolute;
  bottom: 0;
  left: 10px;
`;
