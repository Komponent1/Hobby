import React, { useEffect, useState } from 'react';
import { ImgInput } from '@seolim/react-ui/form';
import Image from 'next/image';
import { FormControl } from '@seolim/react-ui/form/useFormControl';
import { Grid } from '@seolim/react-ui';
import * as S from './style';
import { ImageAPI } from '../../api';

type UploadModalProps = {
  controlImg: FormControl<File, HTMLInputElement>;
  controlSrc: FormControl<string, HTMLInputElement>;
};
function UploadModal({
  controlImg,
  controlSrc,
}: UploadModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    const imageAPI = new ImageAPI(undefined, undefined, true);
    imageAPI.getAll().then((imageList) => {
      setImages(imageList);
    });
  }, []);

  const choiceInGrid = (i: number) => {
    setSelected(i);
    controlImg.onChange({
      v: undefined,
    });
    controlSrc.onChange({
      v: images[i],
    });
  };
  useEffect(() => {
    controlSrc.onChange({
      v: '',
    });
    setSelected(-1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlImg.value]);

  return (
    <S.wrapper>
      <S.upload right>
        <ImgInput control={controlImg} id="banner-input" />
        <S.explain>파일을 올리거나 우측에서 선택하세요</S.explain>
      </S.upload>
      <S.upload>
        <Grid
          columns={2}
          gap={16}
          style={{
            height: '320px',
            overflowY: 'scroll',
          }}
        >
          {images.map((img, i) => (
            <S.imageBox
              key={img}
              selected={selected === i}
              onClick={() => choiceInGrid(i)}
            >
              <Image
                width={192}
                height={120}
                src={`${process.env.NEXT_PUBLIC_BASEURL}/public/${img}`}
                alt=""
              />
            </S.imageBox>
          ))}
        </Grid>
      </S.upload>
    </S.wrapper>
  );
}

export default UploadModal;
