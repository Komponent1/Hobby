import styled from '@emotion/styled';

export const div = styled.div`
  
`;
export const listText = styled.div<{ select: boolean }>`
  padding: 0 0.5rem;
  margin: 0.5rem 0;
  font: 1rem;
  color: ${({ select }) => select ? 'blue': 'black'};
  
  ${({ select }) => select ? 'box-shadow: 5px 0px 0px -4px inset blue': 'none'};
  
  &:hover {
    color: ${({ select }) => select ? 'blue' : 'grey'} !important;
    box-shadow: 5px 0px 0px -4px inset ${({ select }) => select ? 'blue' : 'grey'} !important;
  }
`;
