import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import { device } from './theme';

export const postboard = styled.main`
  display: flex;
  flex-direction: 0;
  width: 100vw;
  height: 100vh;
  position: relative;

  &>article {
    flex: 1 1 calc(50% - 32px);
    height: calc(100% - 32px);

    @media ${device.tablet} {
      display: none;
    }
  }

  &>section {
    height: 100%;
    flex: 1 1 50%;
    
    border-right: 1px solid ${theme.color.white400};

    @media ${device.tablet} {
      width: 100%;
      flex: none;
    }
  }
`;
export const field = styled.div`
  height: 50px;
`;
