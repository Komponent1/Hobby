import React from 'react';
import { Form, AreaInput } from '@seolim/react-ui/form';
import { Button } from '@seolim/react-ui';
import * as S from './style';
import { useCommentInput } from '../commentHook';

type Props = {
  id: number;
  loginUser: string;
  updateComment: () => void;
  initValue?: string,
};
function CommentInput({
  id,
  loginUser,
  updateComment,
  initValue,
}: Props) {
  const { submit, controls } = useCommentInput(
    initValue || '',
    updateComment,
    id,
  );

  return (
    <Form submit={submit}>
      <S.commentInput>
        <AreaInput
          disabled={loginUser === ''}
          placeholder={loginUser !== '' ? '댓글을 입력해주세요' : '로그인 후 이용하실 수 있습니다'}
          control={controls.comment}
          style={{
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        />
        <Button
          style={{ borderRadius: 0 }}
          disabled={loginUser === ''}
        >
          댓글작성
        </Button>
      </S.commentInput>
    </Form>
  );
}
CommentInput.defaultProps = {
  initValue: '',
};
export default CommentInput;
