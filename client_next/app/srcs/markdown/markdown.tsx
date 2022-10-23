/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import MarkDown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'github-markdown-css/github-markdown.css';
import * as S from './style';

type PreviewProps = {
  mdString: string;
  scroll?: boolean;
};
function Preview({
  mdString,
  scroll,
}: PreviewProps) {
  return (
    <S.md className="markdown-body" scroll={!!scroll}>
      <MarkDown
        children={mdString}
        components={{
          code({
            node, inline, className, children, ...props
          }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                // TODO: cjs problem??
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
};

export default Preview;
