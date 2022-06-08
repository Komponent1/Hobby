import styled from '@emotion/styled';

export const menu = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  padding-left: 2rem;
  width: calc(15rem - 2rem);
  height: calc(100vh - 18rem);
  
  border-left: 1px solid black;
  display: none;

  @media ${({ theme }) => theme.device.wide} {
    display: block;
  }
`;
export const menuOpen = styled.div<{ open: boolean }>`
  display: none;
  position: absolute;
  top: 5rem;
  right: ${({ open }) => open ? '13.5rem' : '0'};
  transform: rotate(${({ open }) => open ? '180deg' : 0});

  @media ${({ theme }) => theme.device.wide} {
    display: block;
  }
`;
export const logo = {
  borderRadius: '4rem 0 0 4rem',
  width: '1.5rem',
  height: '3rem',
  background: 'white',
  color: 'black',
  boxShadow: '-2px 0 2px 1px grey' 
};
