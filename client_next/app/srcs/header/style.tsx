import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import global from '../../styles/theme';

export const headlayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  ${global.main};
`;
export const buttonGroup = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  &>.srui-button {
    margin-right: 16px;
  }
`;
export const title = styled.div`
  ${theme.typography.title};
  margin-left: 8px;  
`;
