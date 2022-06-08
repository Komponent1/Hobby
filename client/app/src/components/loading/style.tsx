import styled from '@emotion/styled';

export const background = styled.div`
  position: relative;
  ${({ theme }) => theme.background('white')}
`;
export const div = styled.div<{ size: number }>`
  position: absolute;
  top: calc(50vh - ${({ size }) => Math.floor(size / 2)}px);
  left: calc(50vw - ${({ size }) => Math.floor(size / 2)}px);
`;
export const text = {
  fontWeight: 'bold'
};
