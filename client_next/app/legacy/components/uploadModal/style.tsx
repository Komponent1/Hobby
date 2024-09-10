import styled from '@emotion/styled';
import theme from '@seolim/react-ui/styles/theme';

export const explain = styled.div`
  font-size: ${theme.typography.caption};
  color: ${theme.color.black400};
`;
export const wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const imageBox = styled.div<{
  selected: boolean;
}>`
  display: inline-block;
  border: ${({ selected }) => (selected
    ? `3px solid ${theme.color.primary}`
    : `2px solid ${theme.color.black400}`)};
  border-radius: 4px;
  padding: 10px;
`;
export const upload = styled.div<{
  right?: boolean;
}>`
  ${({ right }) => (right ? 'margin-right: 32px' : '')};
`;
