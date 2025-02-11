import React from 'react'
import * as style from './style';
import { SimpleButton } from '..';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type Prop = {
  openEditor: () => void
  openDel: () => void
  matches: any
}
const ArticlePresenter = React.forwardRef<HTMLDivElement, Prop>(({ openDel, openEditor, matches }, ref) => {
  return (
    <>
      <style.buttons>
        <SimpleButton sx={{ marginRight: '1rem' }} label='수정하기' onClick={openEditor}/>
        <SimpleButton label='삭제하기' onClick={openDel}/>
      </style.buttons>
      <div style={style.viewerStyle(matches.current)} ref={ref}/>
    </>
  );
});

export default ArticlePresenter;
