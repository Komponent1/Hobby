import React, { useRef, useEffect, useState } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import { useNavigate } from 'react-router-dom';
import * as style from './style';
import { Banner, Category, SimpleButton } from '../../components';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type Prop = {
  content: string|undefined
  openEditor: () => void
  openDel: () => void
}

const ArticlePresenter: React.FC<Prop> = ({ content, openEditor, openDel }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [ open, setOpen ] = useState<boolean>(false);
  const mediaMatch = window.matchMedia('(max-width: 1200px)');
  const matches = useRef<boolean>(mediaMatch.matches);
  const [viewer, setViewer] = useState<any>(null);

  useEffect(() => {
    if (!ref) return;
    setViewer(new Viewer({
      el: ref.current as HTMLElement,
      initialValue: content
    }));
  }, [ ref ]);
  useEffect(() => {
    if (!viewer) return;

    viewer.setMarkdown(content);
  }, [ content ]);
  return (
    <>
      <style.head>
        <Banner />
      </style.head>
      <style.div>
        <style.section>
          <div>
            <div>
              <SimpleButton label='수정하기' onClick={openEditor}/>
              <SimpleButton label='삭제하기' onClick={openDel}/>
            </div>
            <div style={style.viewerStyle(matches.current)} ref={ref}/>
          </div>
          <style.menu open={open}>
            <Category />
          </style.menu>
          <style.menuOpen onClick={() => setOpen(!open)}>{open ? '->' : '<-'}</style.menuOpen>
        </style.section>
        
      </style.div>
    </>
  )
};

export default ArticlePresenter;
