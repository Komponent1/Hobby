import styled from '@emotion/styled';

export const buttons = styled.div`
  display: flex;
  padding: 1.5rem 0;
`;
export const viewerStyle = (matches: boolean) => ({
  maxWidth: matches ? 'none' : '900px',
  width: '100%'
});
