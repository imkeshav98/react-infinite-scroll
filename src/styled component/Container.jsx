import styled from "styled-components";

export const Container = styled.div`
  width: 20rem;
  height: 10rem;
  background-color: aliceblue;
  border: 1px solid rgb(166, 184, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: rgb(125, 151, 255);

  @media (max-width: 400px) {
    width: 90%;
  }
`;
