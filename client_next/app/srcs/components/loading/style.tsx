import styled from '@emotion/styled';

export const background = styled.div`
  position: fixed;
  top: 0;
  fixed: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  
  &>div {
    margin: auto;
  }

  z-index: 999;
`;
