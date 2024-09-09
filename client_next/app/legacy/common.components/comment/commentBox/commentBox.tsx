import React, { useState } from 'react';
import { Avatar, Button } from '@seolim/react-ui';
import { useModal } from '@seolim/react-ui/modal';
import { AreaInput, useForm } from '@seolim/react-ui/form';
import { date2string } from '../../../../lib';
import * as S from './style';
import { DeleteComment, PatchComment } from '../../../../legacy/hook/useComment';

type Props = {
  articleId: number;
  id: string;
  content: string;
  user_id: string;
  user_src: string;
  date: string;
  loginUser: string;
  del: DeleteComment;
  patch: PatchComment;
};
function CommentBox({
  articleId,
  id,
  content,
  user_id,
  user_src,
  date,
  loginUser,
  del,
  patch,
}: Props) {
  const { openModal } = useModal('정말 삭제하시겠습니까?', {
    header: '경고!',
    onAction: () => del(id),
  });
  const [edit, setEdit] = useState<boolean>(false);
  const { submit, controls } = useForm([
    {
      id: 'comment',
      type: 'area-input',
      controlOption: { initValue: content },
    },
  ], ({ comment }: { comment: string }) => patch(
    id,
    { article_id: articleId, content: comment },
  ).then(() => controls.comment.onChange({ v: '' })));

  return (
    <S.comment>
      <S.user>
        <Avatar src={user_src} />
      </S.user>
      <S.box>
        <S.caption>
          {user_id}
          <S.date>{date2string(date)}</S.date>
          {user_id === loginUser && (
            <>
              <S.del onClick={() => openModal()}>삭제</S.del>
              <S.del
                onClick={() => {
                  controls.comment.onChange({ v: content });
                  setEdit(true);
                }}
              >
                수정
              </S.del>
            </>
          )}
        </S.caption>
        <S.content>
          {edit
            ? (
              <>
                <AreaInput control={controls.comment} />
                <S.ButtonGroup>
                  <Button
                    design="outline"
                    onClick={(e) => {
                      e?.preventDefault();
                      controls.comment.onChange({
                        v: content,
                      });
                      setEdit(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      submit();
                      setEdit(false);
                    }}
                  >
                    수정
                  </Button>
                </S.ButtonGroup>
              </>
            ) : content}
        </S.content>
      </S.box>
    </S.comment>
  );
}

export default CommentBox;
