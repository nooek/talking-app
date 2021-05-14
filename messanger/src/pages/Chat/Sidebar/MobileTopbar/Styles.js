import styled, { keyframes } from "styled-components";
import { MdGroupAdd } from "react-icons/md"
import { FiMoreVertical } from "react-icons/fi"

const openingAnimation = keyframes`
    from {height: 0px}
    to {height: 400px}
`;

export const Container = styled.div`
  display: none;
  @media (max-width: 700px) {
    width: 100%;
    height: ${(props) => (props.hide === true ? "auto" : "400px")};
    display: flex;
    flex-direction: column;
    animation-name: ${(props) => (props.hide === true ? "" : openingAnimation)};
    animation-duration: 800ms;
    background: rgb(230, 230, 230);
    position: ${props => props.hide && props.chat === true ? "" : "absolute"};
    z-index: 15;
    top: 0;
  }
`;

export const ShowButton = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  color: white;
  background: black;
  border: 1px solid white;
  :focus {
    outline: none;
  }
`;

export const UserPropertiesContainer = styled.div`
  width: 100%;
  height: 60px;
  display: ${(props) => (props.hide === true ? "none" : "flex")};
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
`;

export const MoreActionsContainer = styled.div`
  height: 100%;
  width: auto;
  display: ${(props) => (props.hide === true ? "none" : "flex")};
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 10px;
`;

export const FindFriendsContainer = styled.div`
  width: auto;
  height: 30px;
  display: ${(props) => (props.hide === true ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const FindFriendsInput = styled.input`
  height: 100%;
  width: 90%;
  border: 2px solid black;
  border-radius: 25px;
  text-align: center;
  :focus {
    outline: none;
  }
`;

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
  border-bottom: 2px solid white;
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

export const AddFriendIcon = styled(MdGroupAdd)`
    width: 35px;
    height: 35px;
    color: black;
    margin-right: 10px;
`

export const MoreIcons = styled(FiMoreVertical)`
    width: 30px;
    height: 30px;
    color: black;
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