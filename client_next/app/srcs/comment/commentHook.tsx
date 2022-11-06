import { useRouter } from 'next/router';
import { useHttpClient } from '@seolim/react-ui/http';
import { useForm } from '@seolim/react-ui/form';
import { FormControl } from '@seolim/react-ui/form/useFormControl';

type CommentInputHook = (
  initValue: string,
  updateComponent: () => void,
  id: number,
  commentId?: string,
) => {
  submit: (() => void);
  controls: { [key: string]: FormControl<any, any>; },
};
export const useCommentInput: CommentInputHook = (
  initValue,
  updateComment,
  id,
  commentId,
) => {
  const router = useRouter();
  const { httpClient } = useHttpClient([]);
  const { controls, submit } = useForm([
    { id: 'comment', type: 'area-input', controlOption: { initValue } },
  ], (data: { [key: string]: any }) => {
    const body = JSON.stringify({ article_id: id, content: data.comment });
    const headers = { 'Content-Type': 'application/json' };

    if (commentId) {
      httpClient.patch(
        `author/comment?comment_id=${commentId}`,
        { headers, body },
      ).then(() => {
        updateComment();
        controls.comment.onChange({ v: '' });
      }).catch(() => {
        router.push('/login');
      });
    } else {
      httpClient.post(
        'author/comment',
        { headers, body },
      ).then(() => {
        updateComment();
        controls.comment.onChange({ v: '' });
      }).catch(() => {
        router.push('/login');
      });
    }
  });

  return { submit, controls };
};
