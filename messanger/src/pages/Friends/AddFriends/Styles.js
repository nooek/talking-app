import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const FindFriend = styled.h2`
  font-size: 38px;
  color: white;
  margin-top: 50px;
`;

export const SearchBar = styled.input`
  width: 90%;
  height: 70px;
  font-size: 18px;
  color: black;
  border-radius: 25px;
  border: none;
  :focus {
    outline: none;
  }
`;

export const PeopleList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  overflow-x: auto;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(120, 120, 120);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 0, 0);
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  :first-child {
    margin-top: 20px;
  }
`;

export const PersonContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 10px;
`;

export const PersonName = styled.h2`
  font-size: 20px;
  color: white;
  margin-left: 20px;
`;

export const PersonPfp = styled.img`
  width: 60px;
  height: 100%;
  border-radius: 50%;
  border: 2px solid black;
  margin-left: 10px;
`;

export const AddFriendContainer = styled.div`
  position: absolute;
  right: 2px;
  height: 100%;
  width: auto;
`;

export const AddFriendButton = styled.button`
  width: 80px;
  height: 100%;
  border: none;
  :focus {
    outline: none;
  }
`;
