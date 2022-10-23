import styled from '@emotion/styled';

export const main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 64px);
  
  &>form {
    background: white;
  }
`;
export const InputBox = styled.div`
  margin-bottom: 20px;

  &>label {
    display: inline-block;
    margin-bottom: 5px;
  }
`;
export const Paragraph = styled.div`
  font-size: 32px;
  text-align: center;
  height: 180px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
