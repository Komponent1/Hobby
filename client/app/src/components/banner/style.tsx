import styled from '@emotion/styled';

export const div = styled.div`
  border-bottom: 1px solid grey;
`;
export const textbox = styled.div<{ width: number }>`
  max-width: ${({ width }) => Math.floor(width / 2)}px;
  margin: auto;
  margin-top: 3rem;
  height: 6rem;
  padding: 2rem;
  position: relative;
`;
export const img = {
  position: 'absolute',
  right: '6rem',
  bottom: '-3rem',
  width: '6rem',
  height: '6rem',
  border: '1px solid grey'
};
