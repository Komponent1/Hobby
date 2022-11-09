import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import { main } from './theme';

export const background = styled.div`
  display: flex;
  padding-top: 128px;
  flex-direction: column;
  align-items: center;
  ${main};
  height: calc(100vh - 328px);
`;
export const title = styled.h1`
  ${theme.typography.display1};
`;
export const link = styled.p`
  color: ${theme.color.black400};
  ${theme.typography.title};
  cursor: pointer;
`;
