import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid white;
  background: rgb(26, 26, 26);
  position: absolute;
  top: 100px;
  margin-top: 80px;
  z-index: 10;
  @media (max-width: 700px) {
    width: 90%;
    margin-top: 20px;
  }
`;

export const Parent = styled.div`
  width: 300px;
  height: 200px;
  @media (max-width: 400px) {
    width: 100%;
    height: auto;
  }
`;

export const Message = styled.h2`
  font-size: 20px;
  color: red;
  font-weight: bold;
  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

export const ButtonsContainer = styled.div`
    width: 100%:
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    @media(max-width: 400px){
        flex-direction: column;
    }
`;

export const Buttons = styled(Button)`
  text-transform: none;
  width: 100px;
  height: 50px;
  @media (max-width: 400px) {
    width: 80%;
    height: 30px;
    margin-bottom: 10px;
  }
`;
