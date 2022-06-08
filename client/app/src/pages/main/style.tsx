import styled from '@emotion/styled';

export const head = styled.div`
  width: 100vw;
`;
export const div = styled.div`
  width: 100vw;
`;
//border-top은 margin 겹치기 방지
export const section = styled.section`
  position: relative;
`;
export const article = styled.div<{ width: number }>`
  ${({ theme }) => theme.width}
  padding: 2rem;
  margin: auto;
`;
export const menu = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  padding-left: 2rem;
  width: calc(15rem - 2rem);
  height: calc(100vh - 18rem);
  
  border-left: 1px solid black;

  @media screen and (max-width: 1200px) {
    transform: scaleX(${({ open }) => open ? '1' : '0'});
  }
`;
export const menuOpen = styled.div<{ open: boolean }>`
  display: none;

  @media screen and (max-width: 1200px) {
    display: block;
    position: absolute;
    top: 5rem;
    right: ${({ open }) => open ? '13.5rem' : '0'};
    transform: rotate(${({ open }) => open ? '180deg' : 0});
  }
`;
