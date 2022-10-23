import styled from '@emotion/styled';

export const div = styled.div`
  display: flex;
  align-items: center;
`;
export const section = styled.section`
  flex: 1 1 50%;
  height: 100%;
  
  &>form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &>form>.quill {
    height: calc(100% - 144px);
  }
`;
