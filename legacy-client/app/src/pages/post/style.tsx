import styled from '@emotion/styled';

export const div = styled.div`
  padding: 3rem 4rem;
`;
export const sub = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;

  &>div:nth-of-type(1) {
    flex-shrink: 1;
    
  }
  &>div:nth-of-type(2) {
    flex-shrink: 2;
    margin-left: 2rem;
  }
`;
