import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FileEarmarkExcelFill } from 'react-bootstrap-icons';
import * as S from '../styles/404.style';

function NotFound() {
  const router = useRouter();

  return (
    <S.background>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <FileEarmarkExcelFill size={128} />
      <S.title>
        해당 페이지를 찾을 수 없습니다
      </S.title>
      <S.link onClick={() => router.push('/')}>
        메인으로 돌아가기
      </S.link>
    </S.background>
  );
}

export default NotFound;
