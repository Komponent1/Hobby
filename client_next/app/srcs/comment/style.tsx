import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';

export const div = styled.div`

`;
export const commentInput = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
export const comments = styled.div`
  
`;
export const comment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const user = styled.div`
  padding: 0 12px;
`;
export const box = styled.div`
  flex-grow: 1;
  overflow: hidden;
  border-radius: 12px;
  border: 2px solid ${theme.color.white400};
  margin-bottom: 12px;
`;
export const caption = styled.div`
  background: ${theme.color.white300};
  padding: 4px 16px;
`;
export const content = styled.p`
  padding: 16px;
  word-break: keep-all;
`;
export const date = styled.span`
  ${theme.typography.caption};
  color: ${theme.color.black400};
  margin-left: 12px;
`;
