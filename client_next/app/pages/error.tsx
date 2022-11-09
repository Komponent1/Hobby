import React from 'react';
import { useRouter } from 'next/router';
import { ExclamationSquareFill } from 'react-bootstrap-icons';
import * as S from '../styles/404.style';

function Error() {
  const router = useRouter();

  return (
    <S.background>
      <ExclamationSquareFill size={128} />
      <S.title>예기치 못한 문제가 발생했어요!</S.title>
      <S.link onClick={() => router.push('/')}>메인으로 돌아가기</S.link>
    </S.background>
  );
}

export default Error;
