import styled from "styled-components";
import { Button } from "@material-ui/core";
import { BiArrowBack } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const NameAndPfpContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: break-all;
  margin-top: 40px;
  position: relative;
`;

export const ChangePfpIcon = styled(IoIosAddCircle)`
  width: 50px;
  height: 50px;
  position: relative;
  bottom: 25px;
  color: rgb(15, 199, 15);
  cursor: pointer;
  @media (max-width: 300px) {
    width: 35px;
    height: 35px;
    bottom: 18px;
  }
`;

export const Change = styled.button`
  width: 200px;
  height: 40px;
  font-size: 20px;
  background: transparent;
  border: 2px solid white;
  color: white;
  margin-bottom: 10px;
  margin-top: 30px;
  :hover {
    background: black;
  }
  :focus {
    outline: none;
  }
  @media (max-width: 300px) {
    width: 95%;
  }
`;

export const UserName = styled.h2`
  color: white;
  font-size: 3rem;
  @media (max-width: 300px) {
    font-size: 1.5rem;
  }
`;

export const UserPfp = styled.img`
  width: 270px;
  height: 260px;
  border-radius: 50%;
  @media (max-width: 300px) {
    width: 130px;
    height: 130px;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const Buttons = styled(Button)`
  width: 300px;
  height: 55px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 25px;
  text-transform: none;
  font-size: 17px;
  @media (max-width: 400px) {
    width: 90%;
  }
`;

export const GoBackPage = styled(BiArrowBack)`
  width: 50px;
  height: 50px;
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
`;

export const DeleteAccAlert = styled.div`
  width: 430px;
  height: 180px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(228, 226, 226);
  position: absolute;
  top: 45%;
  text-align: center;
`;

export const DeleteAccMessageContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const DeleteAccMessage = styled.h2`
  color: black;
  font-size: 24px;
  margin-top: 3px;
`;

export const DeleteAccOptionsContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 0px;
`;

export const DeleteAccOptions = styled.button`
  width: 200px;
  height: 90%;
  border: 2px solid white;
  color: white;
  background: black;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;
