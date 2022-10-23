import styled from '@emotion/styled';
import theme from './theme';

export const main = styled.main`
  ${theme.main};
  padding: 30px 0;

  min-height: calc(100vh - 230px);

  &>.srui-form-auto-chips-input {
    width: 100%;
    max-width: 400px;
    display: inline-block;
  }
`;
