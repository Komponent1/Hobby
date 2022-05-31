import React, { useRef, useEffect, useState } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import * as style from './style';
import { Banner, Category, SimpleButton } from '../../components';
import { Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
          <style.viewer width={window.screen.width}>
            <style.buttons>
              <SimpleButton sx={{ marginRight: '1rem' }} label='수정하기' onClick={openEditor}/>
              <SimpleButton label='삭제하기' onClick={openDel}/>
            </style.buttons>
            <div style={style.viewerStyle(matches.current)} ref={ref}/>
          </style.viewer>
          <style.menu open={open}>
            <Category />
          </style.menu>
          <style.menuOpen open={open} onClick={() => setOpen(!open)}>
            <Avatar sx={{
              borderRadius: '4rem 0 0 4rem',
              width: '1.5rem',
              height: '3rem',
              background: 'white',
              color: 'black',
              boxShadow: '-2px 0 2px 1px grey'}}>
              <ArrowBackIcon />
            </Avatar>
          </style.menuOpen>
        </style.section>
        
      </style.div>
    </>
  )
};

export default ArticlePresenter;
