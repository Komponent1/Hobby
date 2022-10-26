import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import global from '../../styles/theme';

export const footerlayout = styled.div`
  ${global.main};
  padding: 20px;
  width: calc(100% - 40px);
`;
export const borderBox = styled.div`
  border-top: 1px solid ${theme.color.white400};
  margin: 0 32px;
  padding: 16px 0;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const marginWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  height: 100%;
`;
export const IconGroup = styled.section`
  display: flex;
`;
export const paragraph = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 128px;

  color: ${theme.color.black500};
  font-size: 14px;
`;
export const keyword = styled.span`
  color: ${theme.color.black700};
  font-weight: 800;
`;
export const description = styled.span`
  color: ${theme.color.black500};
  font-size: 14px;
`;
