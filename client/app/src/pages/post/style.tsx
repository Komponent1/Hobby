import styled from '@emotion/styled';

export const div = styled.div`
  padding: 1rem 4rem;
`;
export const sub = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;

  &>:nth-child(1) {
    flex-shrink: 1;
    
  }
  &>:nth-child(2) {
    flex-shrink: 2;
    margin-left: 2rem;
  }
`;
