import React from 'react';
import {useRouter} from 'next/router';
import {Header as RuiHeader} from '@seolim/react-ui/layout';
import {Avatar} from '@seolim/react-ui';
import {HeaderLayout, ButtonGroup, Title} from './style';

function Header() {
  const router = useRouter();
  return (
    <RuiHeader
      design="scroll"
      style={{ zIndex: 999 }}
    >
      <HeaderLayout>
        <ButtonGroup
          onClick={() => router.push('/')}
        >
          <Avatar
            color="rgba(0,0,0,0)"
            src="/logo.png"
            scale="small"
            design="square"
            alt=""
          />
          <Title>모두의 개발</Title>
        </ButtonGroup>
      </HeaderLayout>
    </RuiHeader>
  );
}

export default Header;
