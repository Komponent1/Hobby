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
export const bookmarkMargin = styled.div`
  margin: 12px 0;
`;
export const p = styled.div`
  margin-bottom: 12px;
`;
