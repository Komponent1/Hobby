import React, { useRef, useEffect, useState } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import * as style from './style';
import { Banner, Category } from '../../components';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type Prop = {
  content: string|undefined
}

const ArticlePresenter: React.FC<Prop> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [ open, setOpen ] = useState<boolean>(false);
  const mediaMatch = window.matchMedia('(max-width: 1200px)');
  const [matches, setMatched] = useState(mediaMatch.matches);
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
  }, [ content ])
  return (
    <>
      <style.head>
        <Banner />
      </style.head>
      <style.div>
        <style.section>
          <div style={style.viewerStyle(matches)} ref={ref}/>
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
