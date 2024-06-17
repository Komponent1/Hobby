import {Article, User} from 'Data';
import React from 'react';
import Head from 'next/head';
import {Avatar} from '@seolim/react-ui';
import {Chip} from '@seolim/react-ui/chips';
import Image from 'next/image';
import {useLayout} from '@seolim/react-ui/layout';
import {Comment, Markdown} from '../../components';
import {
  Box, Chips, Content, ImageWrapper, Main, Paragraph, Title, UserBox, Wrapper,
} from './article.style';

type Props = {
  article: Article;
  content: string;
  user: User;
  date: string;
};
const ArticlePage: React.FC<Props> = ({
  article, content, user, date,
}) => {
  useLayout(true, true);

  return (
    <Main>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={content.substring(0, 20)} />
        <meta name="keyword" content={article.tag.map((t) => t.name).join(', ')} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={article.title} />
        <meta name="og:url" content={`https://blog-sage-pi.vercel.app/article/${article.id}`} />
        <meta name="og:image" content={article.src} />
        <meta name="og:description" content={`${content.substring(0, 30)}...`} />
      </Head>
      <Content>
        <Wrapper>
          <UserBox>
            <Avatar
              src={user.src}
              alt=""
              color="rgba(0,0,0,0)"
            />
            <Box>
              <Paragraph>{article.user_id}</Paragraph>
              <Paragraph>{date}</Paragraph>
            </Box>
          </UserBox>
        </Wrapper>
      </Content>
      <br />
      <Title>{article.title}</Title>
      <Content>
        <Chips>
          {article.tag.map(({ name }) => (
            <Chip
              key={name}
              style={{}}
            >
              {name}
            </Chip>
          ))}
        </Chips>
      </Content>
      <br />
      <Content>
        <ImageWrapper>
          <Image
            className="autoImage"
            src={article.src}
            layout="fill"
            alt=""
          />
        </ImageWrapper>
      </Content>
      <br />
      <Content>
        <Markdown mdString={content} renderBookmark />
      </Content>
      <Comment id={article.id} />
    </Main>
  );
};

export default ArticlePage;
