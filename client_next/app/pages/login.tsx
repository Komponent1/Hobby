/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Avatar } from '@seolim/react-ui';
import { useLayout } from '@seolim/react-ui/layout';
import { Card, CardContent } from '@seolim/react-ui/card';
import { Skeleton } from '@seolim/react-ui/loading';
import * as S from '../styles/login.style';

function Login() {
  const router = useRouter();
  useLayout(true, false);
  const gitSignup = () => {
    router.push(`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GIT_CLIENT}`);
  };

  return (
    <S.main>
      <S.Paragraph>
        <Avatar
          scale="large"
          color="rgba(0,0,0,0)"
          src=""
          alt={<Skeleton type="avatar" />}
        />
        로그인
      </S.Paragraph>
      <Card width="100%" style={{ maxWidth: '420px' }}>
        <CardContent>
          <Button
            size="wide"
            design="outline"
            style={{ marginTop: '15px' }}
            onClick={gitSignup}
          >
            <Image src="/github.png" alt="" width={31} height={31} />
            깃허브로 로그인
          </Button>
        </CardContent>
      </Card>
    </S.main>
  );
}

export default Login;
