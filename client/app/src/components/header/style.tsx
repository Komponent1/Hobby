import styled from '@emotion/styled';

export const header = styled.header`
  position: fixed;
  width: calc(100% - 4rem);
  top: 0;
  left: 0;
  height: 3rem;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  z-index: 2000;

  background: white;
`;
export const buttonDiv = styled.div`
  display: flex;
`
export const logo = styled.div`
  display: flex;
  flex-direction: row;
`;
export const icon = {
  width: '2rem',
  height:'2rem',
  margin: 'auto'
}
export const text = {
  margin: 'auto',
  marginLeft: '1rem'
};
export const button = {
  height: '2rem',
  margin: 'auto',
  marginRight: '1rem'
}
