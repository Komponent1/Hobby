import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { Cookies } from 'react-cookie';
import { useHttpClient } from '@seolim/react-ui/http';
import { Comment as tComment } from 'Data';
import CommentBox from './commentBox/commentBox';
import CommentInput from './commentInput/commentInput';
import * as S from './style';

type Props = {
  id: number;
};
function Comment({
  id,
}: Props) {
  const cookie = useMemo(() => new Cookies(), []);
  const [isLogin, setIsLogin] = useState<string>('');
  const { httpClient } = useHttpClient([]);
  const [comments, setComments] = useState<tComment[]>([]);
  useEffect(() => {
    const user = cookie.get('seolim_blog_user');
    if (user) setIsLogin(user);
  }, [cookie]);
  const updateComment = useCallback(() => {
    httpClient.get<tComment[]>(
      `api/comment?article_id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      async (res: Response) => {
        const data = await res.json();
        return data.comments;
      },
    ).then((data) => {
      (data as tComment[]).sort(
        (a, b) => (
          new Date(b.date).getTime()
          - new Date(a.date).getTime()
        ),
      );
      setComments(data as tComment[]);
    });
  }, [httpClient, id]);
  useEffect(() => {
    if (!httpClient) return;
    updateComment();
  }, [updateComment, httpClient]);

  return (
    <S.div>
      <CommentInput
        updateComment={updateComment}
        loginUser={isLogin}
        id={id}
      />
      <S.comments>
        {comments.map((comment) => (
          <CommentBox
            key={comment.id}
            {...comment}
            articleId={id}
            loginUser={isLogin}
            updateComment={updateComment}
          />
        ))}
      </S.comments>
    </S.div>
  );
}

export default Comment;
