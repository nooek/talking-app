import styled from "styled-components";
import { MdGroupAdd } from "react-icons/md";

export const Container = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const PresentionalTextContainer = styled.div`
  width: 80%;
  height: 80%;
  color: black;
  background-color: rgb(39, 39, 39);
  border-radius: 25px;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin-top: 100px;
`;

export const PresentionalText = styled.h2`
  font-size: 38px;
  color: white;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

export const AddFriendIcon = styled(MdGroupAdd)`
  width: 50px;
  height: 50px;
  color: white;
  position: relative;
  top: 12px;
`;
