import React, { useRef, useEffect } from 'react';
import { Editor as form } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// const editor = new form({
//   el: document.querySelector('.editor'),
//   previewStyle: 'vertical',
//   height: '500px',
//   initialValue: 'none'
// });

const Editor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref) return;

    new form({
      el: ref.current as HTMLElement,
      previewStyle: 'vertical',
      height: '500px',
      initialValue: 'none'
    });
  }, [ ref ]);

  return (
    <div ref={ref}>
    
    </div>
  );
};

export default Editor;