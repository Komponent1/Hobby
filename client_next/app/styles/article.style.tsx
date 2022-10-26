import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';

export const main = styled.main`
  padding: 60px 0;
  width: 95%;
  max-width: 736px;
  margin: auto;
  min-height: calc(100vh - 124px);
`;
export const banner = styled.img<{
  load: boolean;
  err: boolean;
}>`
  width: 100%;
  visibility: ${({ load }) => (load ? 'visible' : 'hidden')};
  ${({ load }) => (load ? '' : 'height: 0')};
  display: ${({ err }) => (err ? 'none' : 'block')};

  object-fit: cover;
  object-position: top left;
  margin: 18px 0;
`;
export const title = styled.div`
  ${theme.typography.display3};
  word-break: keep-all;
  margin: 24px 0;
`;
export const chips = styled.div`
  &>div {
    margin-right: 5px;
  }
`;
export const Content = styled.section`
  margin: 24px 0;
`;
export const wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const userBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 16px;
  color: ${theme.color.black400};
`;
export const p = styled.div`
  display: inline-block;
  font-size: 14px;
`;

