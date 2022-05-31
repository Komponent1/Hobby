import styled from '@emotion/styled';

export const div = styled.div<{ width: number}>`
  max-width: ${({ width }) => Math.floor(width / 2)}px;
  margin: auto;
`;

