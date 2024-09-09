import React from 'react';
import { Form, AreaInput, useForm } from '@seolim/react-ui/form';
import { Button } from '@seolim/react-ui';
import * as S from './style';
import { PostComment } from '../../../../legacy/hook/useComment';

type Props = {
  id: number;
  loginUser: string;
  post: PostComment;
};
function CommentInput({
  id,
  loginUser,
  post,
}: Props) {
  const { controls, submit } = useForm([
    { id: 'comment', type: 'area-input', controlOption: { initValue: '' } },
  ], ({ comment }: { comment: string }) => {
    post({ article_id: id, content: comment }).then(() => controls.comment.onChange({ v: '' }));
  });

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
export default CommentInput;
