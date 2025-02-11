import styled from '@emotion/styled';

export const box = styled.div<{ width: number, height: number }>`
  box-shadow: 1px 2px 4px grey;

  margin: 5rem auto;
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;

  padding: 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;