import React from 'react';
import CommentBox from './commentBox/commentBox';
import CommentInput from './commentInput/commentInput';
import useComment from '../../../legacy/hook/useComment';
import { useLogin } from '../../../legacy/hook';
import * as S from './style';

type Props = {
  id: number;
};
function Comment({
  id,
}: Props) {
  const loginUser = useLogin('seolim_blog_user');
  const {
    post, patch, del, comments,
  } = useComment(id, true);

  return (
    <S.div>
      <CommentInput
        post={post}
        loginUser={loginUser}
        id={id}
      />
      <S.comments>
        {comments.map((comment) => (
          <CommentBox
            key={comment.id}
            {...comment}
            articleId={id}
            loginUser={loginUser}
            patch={patch}
            del={del}
          />
        ))}
      </S.comments>
    </S.div>
  );
}

export default Comment;
