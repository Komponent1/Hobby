import styled from '@emotion/styled';

export const head = styled.div`
  width: 100vw;
`;
export const div = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;
export const section = styled.section`
  width: calc(100% - 28rem);
  padding-top: 2rem;
  padding-right: 2rem;
  padding-left: 20rem;

  @media screen and (max-width: 900px) {
    width: calc(100% - 8rem);
  }
`;
export const menu = styled.div<{ open: boolean }>`
  width: 20rem;
  background: grey;

  @media screen and (max-width: 900px) {
    position: fixed;
    right: 0;
    top: 5vh;
    transform: scaleX(${({ open }) => open ? '1' : '0'});
  }
`;
export const menuOpen = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
    position: fixed;
    right: 0;
    top: 50vh;
  }
`;
