import styled, { keyframes } from "styled-components";

const open = keyframes`
    from{transform: scale(0);}
    to{transform: scale(1);}
`;

export const Container = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  position: absolute;
  margin-top: 200px;
  margin-right: 250px;
  z-index: 7;
  background: rgb(29, 29, 29);
  transform-origin: top right;
  animation-name: ${open};
  animation-duration: 600ms;
  animation-fill-mode: both;
`;

export const Options = styled.button`
  color: white;
  border: none;
  background: none;
  width: 100%;
  height: 60px;
  font-size: 18px;
  :hover {
    background: rgb(0, 0, 0);
  }
  :focus {
    outline: none;
  }
`;

export const WarningContainer = styled.div`
  width: 200px;
  height: auto;
  border: 2px solid white;
  position: absolute;
  top: 100%;
  right: -2px;
  background: rgb(29, 29, 29);
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const WarningMessage = styled.h2`
  font-size: 20px;
  color: white;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const OptionsButton = styled.button`
  color: white;
  border: none;
  background: none;
  width: 100%;
  height: 60px;
  font-size: 18px;
  :hover {
    background: rgb(0, 0, 0);
  }
  :focus {
    outline: none;
  }
`;
