import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  children?: React.ReactNode;
  language?: string;
};

const CodeBox: React.FC<Props> = ({ children, language = 'jsx' }) => {
  const codeContent = typeof children === 'string'
    ? children
    : React.Children.toArray(children).join('');

  return (
    <div className="border border-gray-700">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '16px',
          fontSize: '14px',
          background: '#1f2937',
          borderRadius: '0',
        }}
        showLineNumbers={false}
        wrapLines
        wrapLongLines
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBox;
