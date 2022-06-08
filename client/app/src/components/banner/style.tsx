import styled from '@emotion/styled';

export const div = styled.div`
  border-bottom: 1px solid grey;
`;
export const textbox = styled.div`
  ${({ theme }) => theme.width}

  margin: auto;
  margin-top: 3rem;
  height: 6rem;
  position: relative;
`;
export const img = {
  display: 'none',
  position: 'absolute',
  right: '6rem',
  bottom: '-3rem',
  width: '6rem',
  height: '6rem',
  border: '1px solid grey',
  ['@media (min-width: 720px)']: {
    display: 'block',
  }
};
export const title = {
  fontWeight: 'bold'
};
