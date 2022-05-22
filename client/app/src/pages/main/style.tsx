import styled from '@emotion/styled';

export const head = styled.div`
  width: 100vw;
`;
export const div = styled.div`
  width: 100vw;
  position: relative;
`;
export const section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  padding-top: 2rem;
  right: 0;
  width: 1200px;

  @media screen and (max-width: calc(1200px)) {
    width: calc(100% - 8rem);
    padding: 0 4rem;
    padding-top: 2rem;
  }
`;
export const menu = styled.div<{ open: boolean }>`
  margin: 0 2rem;
  background: white;
  min-width: 10rem;

  @media screen and (max-width: 1200px) {
    position: fixed;
    right: 0;
    top: 50vh;
    transform: scaleX(${({ open }) => open ? '1' : '0'});
  }
`;
export const menuOpen = styled.div`
  display: none;

  @media screen and (max-width: 1200px) {
    display: block;
    position: fixed;
    right: 0;
    top: 50vh;
  }
`;
