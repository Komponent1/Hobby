import React from 'react';
import { ImgInput } from '@seolim/react-ui/form';
import { FormControl } from '@seolim/react-ui/form/useFormControl';
import * as S from './style';

type UploadModalProps = {
  control: FormControl<File, HTMLInputElement>;
};
function uploadModal({
  control,
}: UploadModalProps) {
  return (
    <>
      <ImgInput control={control} id="banner-input" />
      <S.explain>배너가 없을 시 랜덤으로 선택됩니다</S.explain>
    </>
  );
}

export default uploadModal;
