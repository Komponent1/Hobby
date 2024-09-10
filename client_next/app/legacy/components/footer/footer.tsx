import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Footer as RuiFooter } from '@seolim/react-ui/layout';
import {
  BorderBox, Description, FooterLayout, Keyword, MarginWrapper, Paragraph,
} from './style';

function Footer() {
  const router = useRouter();

  return (
    <RuiFooter color="white">
      <FooterLayout>
        <BorderBox>
          <Paragraph>
            <Keyword>EMAIL</Keyword>
            <Description>seolim6492@gmail.com</Description>
          </Paragraph>
          <MarginWrapper>
            <Keyword>개발 깃허브</Keyword>
            <Image
              src="/github.png"
              alt=""
              width={42}
              height={42}
              onClick={() => router.push('https://github.com/Komponent1')}
            />
          </MarginWrapper>
          <MarginWrapper>
            <Keyword>UI 스토리북</Keyword>
            <Image
              src="/storybook.png"
              alt=""
              width={42}
              height={42}
              onClick={() => router.push('https://deploy-storybook--6333d80e63299bb883b10717.chromatic.com/')}
            />
          </MarginWrapper>
        </BorderBox>
      </FooterLayout>
    </RuiFooter>
  );
}

export default Footer;
