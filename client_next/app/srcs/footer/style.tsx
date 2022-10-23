import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import global from '../../styles/theme';

export const footerlayout = styled.div`
  ${global.main};
  padding: 20px;

  display: flex;
  flex-direction: row;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center;
`;
export const marginWrapper = styled.div`
  margin-right: 16px;
`;
export const IconGroup = styled.section`
  display: flex;
  align-items: center;
`;
export const paragraph = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  color: ${theme.color.black500};
  font-size: 14px;
`;
export const keyword = styled.span`
  color: ${theme.color.black700};
  font-weight: 800;
`;
