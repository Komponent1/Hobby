import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import {device} from '../../../styles/theme';

export const Main = styled.main`
  padding: 60px 0;
  width: 95%;
  max-width: 736px;
  margin: auto;
  min-height: calc(100vh - 124px);
`;
export const Banner = styled.img<{
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
export const Title = styled.div`
  ${theme.typography.display3};
  word-break: keep-all;
  margin: 24px 0;

  @media ${device.tablet} {
    ${theme.typography.display1};
  }
`;
export const Chips = styled.div`
  &>div {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
export const Content = styled.section`
  margin: 24px 0;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const UserBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 16px;
  color: ${theme.color.black400};
`;
export const Paragraph = styled.div`
  display: inline-block;
  font-size: 14px;
`;
export const ImageWrapper = styled.div`
  width: 100%;
  
  &>span {
    position: unset !important;
    
    &>.autoImage {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  &>button:nth-of-type(2) {
    margin-left: 12px;
  }
`;
