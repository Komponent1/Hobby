import { useRouter } from 'next/router';
import {
  useMemo, useCallback, useState, useEffect,
} from 'react';
import { Comment } from 'Data';
import { useAlert } from '@seolim/react-ui/alert';
import CommentService from '../../legacy/api/comment';

export type CommentBody = { article_id: number, content: string };
export type PostComment = (data: CommentBody) => Promise<void>;
export type PatchComment = (commentId: string, data: CommentBody) => Promise<void>;
export type GetComment = () => Promise<void>;
export type DeleteComment = (commentId: string) => Promise<void>;
export type UseComment = (id: number, init?: boolean) => ({
  comments: Comment[];
  getAll: GetComment;
  post: PostComment;
  patch: PatchComment;
  del: DeleteComment;
});
const useComment: UseComment = (id, init) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { alert } = useAlert('lb');
  const router = useRouter();
  const service = useMemo(() => new CommentService(
    undefined,
    {
      responseErr(error) {
        if (error.response && error.response.status >= 500) {
          router.push('/error');
          return new Promise(() => {});
        }
        return Promise.reject(error);
      },
    },
    false,
    process.env.NODE_ENV === 'development',
  ), [router]);

  const getAll: GetComment = useCallback(async () => {
    const data = await service.getAll(id);
    setComments(data);
  }, [service, id]);

  const post: PostComment = useCallback(async (
    data: { article_id: number, content: string },
  ) => {
    try {
      await service.post(data);
      getAll();
    } catch (error) {
      alert('댓글올리기에 실패했습니다. 나중에 다시 해주세요', { scale: 'large' });
    }
  }, [service, getAll, alert]);

  const patch: PatchComment = useCallback(async (
    commentId: string,
    data: { article_id: number, content: string },
  ) => {
    try {
      await service.patch(commentId, data);
      getAll();
    } catch (error) {
      alert('댓글올리기에 실패했습니다. 나중에 다시 해주세요', { scale: 'large' });
    }
  }, [service, getAll, alert]);

  const del: DeleteComment = useCallback(async (commentId: string) => {
    try {
      await service.delete(commentId);
      getAll();
    } catch (error) {
      alert('댓글 삭제에 실패했습니다. 나중에 다시 해주세요', { scale: 'large' });
    }
  }, [service, getAll, alert]);

  useEffect(() => {
    setLoading(true);
    if (init) getAll();
  }, [getAll, init]);

  return {
    loading,
    comments,
    getAll,
    post,
    patch,
    del,
  };
};

export default useComment;
