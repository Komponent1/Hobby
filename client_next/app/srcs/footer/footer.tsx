import React from 'react';
import Image from 'next/image';
import { Footer as RuiFooter } from '@seolim/react-ui/layout';
import * as S from './style';

function Footer() {
  return (
    <RuiFooter>
      <S.footerlayout>
        <S.IconGroup>
          <S.marginWrapper>
            <Image src="/github.png" alt="" width={36} height={36} />
          </S.marginWrapper>
          <Image src="/storybook.svg" alt="" width={180} height={64} />
        </S.IconGroup>
        <S.paragraph>
          <S.keyword>EMAIL</S.keyword>
          <span>seolim6492@gmail.com</span>
        </S.paragraph>
      </S.footerlayout>
    </RuiFooter>
  );
}

export default Footer;
