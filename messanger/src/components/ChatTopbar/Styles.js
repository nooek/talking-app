import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
import { GoSearch } from "react-icons/go"

export const ChatTopBar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(167, 167, 167);
  @media(max-width: 700px){
    margin-bottom: auto;
    position: relative;
  }
`;

export const TopbarUserInfoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TopbarMoreActionsContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media(max-width: 700px){
    width: 30%;
  }
`;

export const FriendName = styled.h2`
  font-size: 18px;
  margin-left: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FriendPfp = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-left: 12px;
  border: 1px solid black;
`;

export const DropdownOpen = styled(FiMoreVertical)`
  width: 30px;
  height: 100%;
  color: black;
  cursor: pointer;
`;

export const SearchIcon = styled(GoSearch)`
  width: 25px;
  height: 80%;
  color: black;
  margin-right: 20px;
  cursor: pointer;
`