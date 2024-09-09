import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';
import global from '../../../styles/theme';

export const HeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  ${global.main};
`;
export const ButtonGroup = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;

  &>.srui-button {
    margin-right: 16px;
  }
`;
export const Title = styled.div`
  ${theme.typography.title};
  margin-left: 8px;  
`;
