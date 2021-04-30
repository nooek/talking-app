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
  background-color: black;
  border-bottom-left-radius: 20px;
  background-color: rgba(221, 221, 221, 0.493);
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
  width: auto;
  height: 95%;
  margin-left: 12px;
`;

export const MoreActions = styled(FiMoreVertical)`
  width: 30px;
  height: 100%;
  color: black;
`;
