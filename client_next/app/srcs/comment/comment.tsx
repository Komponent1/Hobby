import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Avatar, Button } from '@seolim/react-ui';
import { useHttpClient } from '@seolim/react-ui/http';
import { Form, useForm, AreaInput } from '@seolim/react-ui/form';
import { Comment as tComment } from 'Data';
import { date2string } from '../../lib';
import * as S from './style';

type Props = {
  id: number;
};
function Comment({
  id,
}: Props) {
  const cookie = useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { httpClient } = useHttpClient([]);
  const [comments, setComments] = useState<tComment[]>([]);
  useEffect(() => {
    const user = cookie.get('seolim_blog_user');
    if (user) setIsLogin(true);
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

  const { controls, submit } = useForm([
    { id: 'comment', type: 'area-input', controlOption: { initValue: '' } },
  ], (data: { [key: string]: any }) => {
    httpClient.post('author/comment', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article_id: id,
        comment: data.comment,
      }),
    }).then(() => {
      updateComment();
      controls.comment.onChange({ v: '' });
    }).catch(() => {
      router.push('/login');
    });
  });

  return (
    <S.div>
      <Form submit={submit}>
        <S.commentInput>
          <AreaInput
            disabled={!isLogin}
            placeholder={isLogin ? '댓글을 입력해주세요' : '로그인 후 이용하실 수 있습니다'}
            control={controls.comment}
            style={{
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
          <Button
            style={{ borderRadius: 0 }}
            disabled={!isLogin}
          >
            댓글작성
          </Button>
        </S.commentInput>
      </Form>
      <S.comments>
        {comments.map((comment) => (
          <S.comment key={comment.id}>
            <S.user>
              <Avatar src={comment.user_src} />
            </S.user>
            <S.box>
              <S.caption>
                {comment.user_id}
                <S.date>{date2string(comment.date)}</S.date>
              </S.caption>
              <S.content>
                {comment.content}
              </S.content>
            </S.box>
          </S.comment>
        ))}
      </S.comments>
    </S.div>
  );
}

export default Comment;
