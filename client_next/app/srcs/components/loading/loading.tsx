import React from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '@seolim/react-ui/loading';
import * as S from './style';

function LoadingPortal() {
  const element = typeof window !== 'undefined' && document.getElementById('loading-root');

  if (!element) return null;
  return createPortal(
    <S.background>
      <Spinner scale="big" />
    </S.background>,
    element,
  );
}

export default LoadingPortal;
