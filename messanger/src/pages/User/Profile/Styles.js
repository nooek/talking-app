import styled from "styled-components";
import { Button } from "@material-ui/core";
import { BiArrowBack } from "react-icons/bi"

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const NameAndPfpContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: break-all;
  margin-top: 40px;
`;

export const UserName = styled.h2`
  color: white;
  font-size: 3rem;
  @media (max-width: 600px) {
    font-size: 1.5rem
  }
`;

export const UserPfp = styled.img`
  width: 300px;
  height: 100%;
  @media (max-width: 300px) {
    width: 80%;
  }
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;
`;

export const UserInfoField = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  word-break: break-all;
`;

export const UserInfoFieldSubTitle = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 3px;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const UserInfoFieldInfo = styled.h2`
  color: white;
  font-size: 30px;
  margin-top: 0;
  @media (max-width: 500px) {
    font-size: 24px;
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
  @media (max-width: 300px) {
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
`
