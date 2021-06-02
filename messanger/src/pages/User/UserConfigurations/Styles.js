import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Parent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Category = styled.h2`
  color: white;
  font-size: 23px;
`;

export const PrivacyOptionsContainer = styled.div`
  width: 500px;
  height: 400px;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 550px) {
    width: 93%;
  }
`;

export const PrivacyOption = styled.h2`
  color: white;
  font-size: 20px;
`;

export const BlocksList = styled.div`
  width: 500px;
  height: auto;
  max-height: 650px;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
  @media (max-width: 550px) {
    width: 93%;
  }
`;

export const FriendContainer = styled.div`
  width: 95%;
  height: 70px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 10px;
  :first-child {
    margin-top: 10px;
  }
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0;
    margin-top: 10px;
    height: auto;
    position: relative;
    margin-bottom: 10px;
  }
`;

export const FriendPfp = styled.img`
  width: 70px;
  height: 100%;
  margin-left: 10px;
  border-radius: 50%;
  border: 1px solid white;
  @media (max-width: 550px) {
    margin-bottom: 5px;
  }
`;

export const FriendName = styled.h2`
  color: black;
  font-size: 24px;
  margin-left: 10px;
  @media (max-width: 550px) {
    margin-top: 2px;
  }
`;

export const UnblockButton = styled.button`
  width: 100px;
  height: 100%;
  border: none;
  position: absolute;
  background: none;
  font-weight: bold;
  font-size: 16px;
  background: rgb(172, 172, 172);
  right: 0;
  box-shadow: 3px 3px 3px rgb(0, 0, 0);
  border-top: 1px solid black;
  border-left: 1px solid black;
  cursor: pointer;
  :hover {
    background: white;
    transform: scale(1.05);
  }
  @media (max-width: 550px) {
    position: relative;
    bottom: 0;
    width: 90%;
    height: auto;
  }
`;
