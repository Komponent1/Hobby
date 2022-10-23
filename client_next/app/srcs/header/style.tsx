import styled from '@emotion/styled';
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
