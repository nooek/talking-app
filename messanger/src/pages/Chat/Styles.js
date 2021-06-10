import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default Container;
