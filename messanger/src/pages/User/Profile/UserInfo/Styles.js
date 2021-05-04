import styled from "styled-components";

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

export const UserFieldChangeInfo = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  margin-bottom: 20px;
  border-radius: 25px;
  margin-top: 20px;
  :focus{
    outline: none;
  }

`