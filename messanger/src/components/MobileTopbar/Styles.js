import styled, { keyframes } from "styled-components";
import { MdGroupAdd } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";

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
    position: ${(props) => (props.hide && props.chat === true ? "relative" : "absolute")};
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

export const UserPfp = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 10px;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
`;

export const UserName = styled.h2`
  color: black;
  font-size: 18px;
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AddFriendIcon = styled(MdGroupAdd)`
  width: 35px;
  height: 35px;
  color: black;
  margin-right: 10px;
`;

export const MoreIcons = styled(FiMoreVertical)`
  width: 30px;
  height: 30px;
  color: black;
`;
