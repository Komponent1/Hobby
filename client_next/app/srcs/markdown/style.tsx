import styled from '@emotion/styled';

export const md = styled.article<{
  scroll: boolean;
}>`
  font-size: 18px;
  height: 100%;
  ${({ scroll }) => (scroll
    ? 'overflow-y: scroll;padding: 16px;'
    : '')};
`;
