import styled from '@emotion/styled';

export const div = styled.div<{ width: number}>`
  margin: auto;
  margin-top: 2rem;

  ${({ theme }) => theme.width}
`;

