import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 500px;
  height: 650px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 8px 8px 8px rgb(0, 0, 0);
  @media (max-width: 600px) {
    width: 90%;
    height: 450px;
  }
`;

export const Text = styled.h2`
  font-size: 35px;
  color: black;
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

export const FieldsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Fields = styled.input`
  width: 90%;
  height: 65px;
  margin-bottom: 40px;
  font-size: 18px;
  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

export const SubmitButton = styled.button`
  width: 70%;
  height: 50px;
  border-bottom: 20px;
  background-color: rgb(28, 99, 231);
  font-size: 19px;
  color: white;
  border-radius: 25px;
  border: 0;
  box-shadow: 4px 4px 4px rgb(0, 0, 0);
  :hover {
    transform: scale(1.01);
  }
  :active {
    transform: scale(0.99);
  }
  :focus {
    outline: none;
  }
  @media (max-width: 600px) {
    height: 40px;
  }
`;
