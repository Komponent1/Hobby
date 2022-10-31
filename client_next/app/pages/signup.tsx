/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Image from 'next/image';
import { Avatar, Button } from '@seolim/react-ui';
import { useLayout } from '@seolim/react-ui/layout';
import { useHttpClient } from '@seolim/react-ui/http';
import { useForm, Form, TextInput } from '@seolim/react-ui/form';
import Head from 'next/head';
import { Card, CardContent } from '@seolim/react-ui/card';
import { useRouter } from 'next/router';
import * as S from '../styles/signup.style';

function Signup() {
  const router = useRouter();
  useLayout(true, false);
  const { httpClient } = useHttpClient([]);
  const { controls, submit } = useForm([
    { id: 'email', type: 'text-input', controlOption: { initValue: '' } },
    { id: 'password', type: 'text-input', controlOption: { initValue: '' } },
  ], (data: { email: string, password: string }) => {
    httpClient.post(
      'sign/users',
      {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      },
    ).then(() => router.push('/login'));
  });
  const gitSignup = () => {
    router.push('');
  };

  return (
    <S.main>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <S.Paragraph>
        <Avatar
          scale="large"
          color="rgba(0,0,0,0)"
          src=""
          alt=""
        />
        회원가입
      </S.Paragraph>
      <Card width="100%" style={{ maxWidth: '420px' }}>
        <Form submit={submit}>
          <CardContent>
            <S.InputBox>
              <label>이메일</label>
              <TextInput
                scale="large"
                control={controls.email}
              />
            </S.InputBox>
            <S.InputBox>
              <label>비밀번호</label>
              <TextInput
                scale="large"
                control={controls.password}
                type="password"
              />
            </S.InputBox>
            <Button
              size="wide"
              design="outline"
              style={{ marginTop: '15px' }}
            >
              회원가입
            </Button>
          </CardContent>
        </Form>
        <CardContent>
          <Button
            size="wide"
            design="outline"
            style={{ marginTop: '15px' }}
            onClick={gitSignup}
          >
            <Image src="/github.png" alt="" width={31} height={31} />
            깃허브로 회원가입
          </Button>
        </CardContent>
      </Card>
    </S.main>
  );
}

export default Signup;
