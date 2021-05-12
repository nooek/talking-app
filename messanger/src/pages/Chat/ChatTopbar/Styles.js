import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";

export const ChatTopBar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 0;
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
`;

export const FriendName = styled.h2`
  font-size: 18px;
  margin-left: 12px;
`;

export const FriendPfp = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 50%;
  margin-left: 12px;
  border: 2px solid black;
`;

export const MoreActions = styled(FiMoreVertical)`
  width: 30px;
  height: 100%;
  color: black;
  cursor: pointer;
`;
