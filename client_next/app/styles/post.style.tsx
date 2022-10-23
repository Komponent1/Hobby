import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';

export const postboard = styled.main`
  display: flex;
  flex-direction: 0;
  width: 100vw;
  height: 100vh;
  position: relative;

  &>article {
    flex: 1 1 calc(50% - 32px);
    height: calc(100% - 32px);
    ${theme.etcStyle.popupShadow};
  }
`;
