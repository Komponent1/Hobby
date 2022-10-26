import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Spinner } from '@seolim/react-ui/loading';
import { ModalPortal } from '@seolim/react-ui/modal';
import {
  TextInput, useForm, Form, AutoChipsInput,
} from '@seolim/react-ui/form';
import { Button } from '@seolim/react-ui';
import { useHttpClient } from '@seolim/react-ui/http';
import { useRouter } from 'next/router';
import UploadModal from '../uploadModal/uploadModal';
import * as S from './style';
import { banner } from '../../styles/article.style';

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
function Editor({
  tags,
  onChange,
  raw,
}: EditorProps) {
  const { httpClient } = useHttpClient([]);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(raw ? raw.content : '');
  const { controls, submit } = useForm([
    { id: 'title', type: 'text-input', controlOption: { initValue: raw ? raw.title : '' } },
    { id: 'tag', type: 'multi-text-input', controlOption: { initValue: raw ? [...raw.tag] : [] } },
    { id: 'content', type: 'text-input', controlOption: { initValue: raw ? raw.content : '' } },
    { id: 'banner', type: 'img-input', controlOption: {} },
    { id: 'bannerSrc', type: 'text-input', controlOption: { initValue: '' } },
  ], (data: { [key: string]: any }) => {
    const formData = new FormData();
    if (data.bannerSrc !== '') formData.append('banner', new Blob([data.bannerSrc], { type: 'text/plain' }));
    else formData.append('banner', data.banner);
    formData.append('md', new Blob([data.content], { type: 'text/plain' }));
    formData.append('article', new Blob([JSON.stringify({
      title: data.title, tag: data.tag.map((s: string) => ({ name: s, color: 'grey' })), content: data.content,
    })], { type: 'application/json' }));

    if (raw) {
      httpClient.patch<number>(
        `author/article?article_id=${raw.id}`,
        {
          body: formData,
        },
        async (res: Response) => {
          const d = await res.json();
          return d.id;
        },
      ).then((id) => router.push(`/article/${id}`));
    } else {
      httpClient.post<number>(
        'author/article',
        {
          body: formData,
        },
        async (res: Response) => {
          const d = await res.json();
          return d.id;
        },
      ).then((id) => router.push(`/article/${id}`));
    }
  });

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', () => {
      const formData = new FormData();
      formData.append('file', (input.files as FileList)[0]);

      httpClient.post<string>(
        'author/image',
        { body: formData },
        async (res: Response) => (await res.json()).url,
      ).then((url) => setValue((v) => `${v}\n![img](${url})`));
    });
  }, [httpClient]);
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
    </S.section>
  );
}
Editor.defaultProps = {
  raw: undefined,
};

export default Editor;
