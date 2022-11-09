/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import MarkDown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { OgBookmark } from '@seolim/react-ui/bookmark';
import 'github-markdown-css/github-markdown.css';
import * as S from './style';
import BookmarkAPI from '../../api/bookmark';

type PreviewProps = {
  mdString: string;
  scroll?: boolean;
  renderBookmark?: boolean;
};
function Preview({
  mdString,
  scroll,
  renderBookmark = false,
}: PreviewProps) {
  const router = useRouter();
  const ref = useRef<HTMLElement | null>(null);
  const bookmarkAPI = useMemo(() => new BookmarkAPI(undefined, undefined, true), []);
  useEffect(() => {
    if (!ref.current) return () => {};
    const scrolling = () => {
      ref.current?.scrollTo(0, ref.current?.scrollHeight || 0);
    };
    ref.current.addEventListener('DOMNodeInserted', scrolling);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ref.current?.removeEventListener('DOMNodeInserted', scrolling);
  }, [ref]);

  return (
    <S.md
      className="markdown-body"
      scroll={!!scroll}
      ref={ref}
    >
      <MarkDown
        children={mdString}
        components={{
          p({ children, ...props }) {
            return <S.p {...props}>{children}</S.p>;
          },
          a({
            children, href, style, ...props
          }) {
            if (renderBookmark) {
              return (
                <S.bookmarkMargin>
                  <OgBookmark
                    originTitle={children as string}
                    originUrl={href as string}
                    requestPromise={() => bookmarkAPI.get(href as string)}
                    route={(url: string) => router.push(url)}
                  />
                </S.bookmarkMargin>
              );
            }
            return (
              <a href={href} {...props}>{children}</a>
            );
          },
          code({
            node, inline, className, children, style, ...props
          }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={coy}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </S.md>
  );
}
Preview.defaultProps = {
  scroll: false,
  renderBookmark: false,
};

export default Preview;
