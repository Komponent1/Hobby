import styled from '@emotion/styled';

export const div = styled.div`
  
`;
export const listText = styled.div<{ select: boolean }>`
  padding: 0 0.5rem;
  margin: 0.5rem 0;
  font: 1rem;
  color: ${({ select }) => select ? '#1976d2': 'black'};
  
  ${({ select }) => select ? 'box-shadow: 5px 0px 0px -3px inset #1976d2': 'none'};
  
  &:hover {
    color: ${({ select }) => select ? 'rgba(25, 118, 210, 0.5)' : 'grey'} !important;
    box-shadow: 5px 0px 0px -4px inset ${({ select }) => select ? 'rgba(25, 118, 210, 0.5)' : 'grey'} !important;
  }
`;
