import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Footer as RuiFooter } from '@seolim/react-ui/layout';
import * as S from './style';

function Footer() {
  const router = useRouter();

  return (
    <RuiFooter color="white">
      <S.footerlayout>
        <S.borderBox>
          <S.paragraph>
            <S.keyword>EMAIL</S.keyword>
            <S.description>seolim6492@gmail.com</S.description>
          </S.paragraph>
          <S.marginWrapper>
            <S.keyword>개발 깃허브</S.keyword>
            <Image
              src="/github.png"
              alt=""
              width={42}
              height={42}
              onClick={() => router.push('https://github.com/Komponent1')}
            />
          </S.marginWrapper>
          <S.marginWrapper>
            <S.keyword>UI 스토리북</S.keyword>
            <Image
              src="/storybook.png"
              alt=""
              width={42}
              height={42}
              onClick={() => router.push('https://deploy-storybook--6333d80e63299bb883b10717.chromatic.com/')}
            />
          </S.marginWrapper>
        </S.borderBox>
      </S.footerlayout>
    </RuiFooter>
  );
}

export default Footer;
