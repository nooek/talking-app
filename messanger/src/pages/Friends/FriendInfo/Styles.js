import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

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
  justify-content: center;
  text-align: center;
`;

export const ContactImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  @media (max-width: 300px) {
    width: 80%;
    height: 230px;
  }
`;

export const InfoContainer = styled.div`
  width: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  margin-top: 20px;
  word-break: break-all;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const InformationName = styled.h4`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const Information = styled.h2`
  color: white;
  margin-top: 0;
  font-size: 22px;
`;

export const GoBack = styled(BiArrowBack)`
  width: 50px;
  height: 50px;
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const SubInfo = styled.h2`
  font-size: 20px;
  color: white;
`;
