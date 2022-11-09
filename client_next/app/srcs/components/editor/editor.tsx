import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Spinner } from '@seolim/react-ui/loading';
import { ModalPortal } from '@seolim/react-ui/modal';
import {
  TextInput, useForm, Form, AutoChipsInput,
} from '@seolim/react-ui/form';
import { Button } from '@seolim/react-ui';
import UploadModal from '../uploadModal/uploadModal';
import * as S from './style';
import { useArticle } from '../../hook';
import { ImageAPI } from '../../api';
import LoadingPortal from '../loading/loading';

const LoadingWraper = () => (
  <S.div>
    <Spinner scale="big" />
  </S.div>
);
const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: LoadingWraper,
});
type EditorProps = {
  tags: any[];
  onChange: (value: string) => void;
  raw?: any;
};
function markdown2Html(markdownText: string) {
  return markdownText.split('\n').reduce((acc, str) => {
    if (str === '') return `${acc}<p><br></p>`;
    return `${acc}<p>${str}</p>`;
  }, '');
}
function Editor({
  tags,
  onChange,
  raw,
}: EditorProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(raw ? markdown2Html(raw.content) : '');
  const { post, patch, loading } = useArticle();
  const { controls, submit } = useForm([
    { id: 'title', type: 'text-input', controlOption: { initValue: raw ? raw.title : '' } },
    { id: 'tag', type: 'multi-text-input', controlOption: { initValue: raw ? [...raw.tag] : [] } },
    { id: 'content', type: 'text-input', controlOption: { initValue: raw ? raw.content : '' } },
    { id: 'banner', type: 'img-input', controlOption: {} },
    { id: 'bannerSrc', type: 'text-input', controlOption: { initValue: '' } },
  ], (data: { [key: string]: any }) => {
    if (raw) patch(raw.id, data);
    else post(data).then();
  });

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', () => {
      const imageAPI = new ImageAPI(undefined, undefined, process.env.NODE_ENV === 'development');
      imageAPI.post((input.files as FileList)[0])
        .then((url) => setValue((v) => `${v}\n![img](${url})`));
    });
  }, []);
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  return (
    <S.section>
      <Form submit={submit}>
        <TextInput
          id="title-input"
          control={controls.title}
          design="underline"
          scale="big"
          placeholder="제목을 입력하세요"
        />
        <AutoChipsInput
          id="tag-input"
          design="underline"
          control={controls.tag}
          controlValue={tags.map((tag) => tag.name)}
          placeholder="태그를 입력해주세요"
        />
        <QuillWrapper
          theme="snow"
          value={value}
          onChange={(content, _, __, editor) => {
            setValue(content);
            controls.content.onChange({ v: editor.getText() });
            onChange(editor.getText());
          }}
          modules={modules}
        />
        <Button
          size="big"
          style={{
            position: 'absolute',
            right: 'calc(50% + 40px)',
            bottom: '40px',
          }}
          onClick={(e) => {
            e?.preventDefault();
            setOpen(true);
          }}
        >
          업로드
        </Button>
      </Form>
      {open ? (
        <ModalPortal
          id="modal-root"
          header="배너 선택"
          onAction={submit}
          closeModal={() => setOpen(false)}
          width="800px"
        >
          <UploadModal
            controlImg={controls.banner}
            controlSrc={controls.bannerSrc}
          />
        </ModalPortal>
      ) : null}
      {loading && <LoadingPortal />}
    </S.section>
  );
}
Editor.defaultProps = {
  raw: undefined,
};

export default Editor;
