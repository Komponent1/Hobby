import styled from '@emotion/styled';

export const div = styled.div`
  display: flex;
  align-items: center;
`;
export const section = styled.section`
  height: 100%;
  font-size: 16px;
  
  &>form {
    height: 100%;
    display: flex;
    flex-direction: column;

    &>.quill {
      height: calc(100% - 144px);

      &>.ql-container {
        font-size: 16px !important;
      }
    }
  }
`;
