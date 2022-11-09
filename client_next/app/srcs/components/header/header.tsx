import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Header as RuiHeader } from '@seolim/react-ui/layout';
import { Avatar, Button } from '@seolim/react-ui';
import { Cookies } from 'react-cookie';
import * as S from './style';

function Header() {
  const router = useRouter();
  const cookie = useMemo(() => new Cookies(), []);
  const [info, setInfo] = useState<{
    user: string; avatar: string; github: string;
  } | undefined>(undefined);

  useEffect(() => {
    const user = cookie.get('seolim_blog_user');
    const avatar = cookie.get('seolim_blog_user_src');
    const github = cookie.get('seolim_blog_user_github');
    if (!user || !avatar || !github) return;

    setInfo({ user, avatar, github });
  }, [cookie]);

  return (
    <RuiHeader
      design="scroll"
      style={{ zIndex: 999 }}
    >
      <S.headlayout>
        <S.buttonGroup
          onClick={() => router.push('/')}
        >
          <Avatar
            color="rgba(0,0,0,0)"
            src="/logo.png"
            scale="small"
            design="square"
            alt=""
          />
          <S.title>모두의 개발</S.title>
        </S.buttonGroup>
        {!info ? (
          <Button
            design="outline"
            corner="round"
            onClick={() => router.push('/login')}
          >
            로그인
          </Button>
        ) : (
          <S.buttonGroup>
            <Button
              design="outline"
              corner="round"
              onClick={() => router.push('/post')}
            >
              새 글 작성
            </Button>
            <Avatar src={info.avatar} alt="" />
          </S.buttonGroup>
        )}
      </S.headlayout>
    </RuiHeader>
  );
}

export default Header;
