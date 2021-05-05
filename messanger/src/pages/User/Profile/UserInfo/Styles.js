import styled from "styled-components";
import { VscSaveAs } from "react-icons/vsc"

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
  border: 2px solid white;
  margin-top: 10px;
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

export const UserFieldChangeInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
` 

export const UserFieldChangeInfo = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  margin-bottom: 20px;
  border-radius: 5px;
  margin-top: 20px;
  :focus{
    outline: none;
  }
`

export const ChangeButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 20px;
  background: transparent;
  border: 2px solid white;
  color: white;
  margin-bottom: 10px;
  :hover{
    background: black;
  }
  :focus{
    outline: none;
  }
`

export const Save = styled(VscSaveAs)`
  width: 35px;
  height: 33px;
  color: green;
  margin-left: 10px;
`