import styled from "styled-components";

export const ChatSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

export const MessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
  z-index: 2;
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
  @media (max-width: 700px) {
    height: 100%;
  }
`;

export const GoToLastMessageButton = styled.button`
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 80px;
  right: 35px;
  background: rgb(99, 240, 99);
  border-radius: 50%;
  border: 2px solid white;
  z-index: 15;
  cursor: pointer;
`;
