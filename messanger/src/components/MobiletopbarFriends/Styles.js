import styled from "styled-components"

export const FriendsList = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: ${(props) => (props.hide === true ? "none" : "")};
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(161, 161, 161);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(99, 99, 99);
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  :first-child {
    margin-top: 20px;
  }
`;

export const FriendContainer = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  position: relative;
  background: ${props => props.selected === true ? "rgb(197, 197, 197)" : "none"};
  :hover{
	  background: rgb(197, 197, 197);
  }
`;

export const FriendPfp = styled.img`
  width: 60px;
  height: 100%;
  margin-left: 10px;
`

export const FriendName = styled.h2`
  color: black;
  font-size: 18px;
  margin-left: 5px;
`

export const MessageDate = styled.h4`
  position: absolute;
  top: 2px;
  margin-top: 0;
  right: 7px;
`

export const LastContactMessage = styled.h3`
  position: relative;  
  top: 30%;
  font-size: 16px;
`

export const OnlineBubble = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid black;
  background: ${props => props.online === true ? "rgb(3, 207, 3)" : "rgba(87, 87, 87, 0.829)"};
  position: absolute;
  border-radius: 50%;
  bottom: 5px;
  right: 10px;
`