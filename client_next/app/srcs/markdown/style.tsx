import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import { device } from '../../styles/theme';

export const md = styled.article<{
  scroll: boolean;
}>`
  font-size: 16px;
  height: 100%;
  ${({ scroll }) => (scroll
    ? 'overflow-y: scroll;padding: 16px;'
    : '')};
  word-break: keep-all;
`;
export const bookmarkMargin = styled.div`
  margin: 12px 0;

  &>div {
    &>img {
      @media ${device.tablet} {
        width: 80px;
      }
    }

    &>div {
      &>div:nth-child(1) {
        ${theme.typography.body};
      }
    }
  }
`;
export const p = styled.div`
  margin-bottom: 12px;
`;
