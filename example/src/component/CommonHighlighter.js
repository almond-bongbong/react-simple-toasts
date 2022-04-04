import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';

SyntaxHighlighter.registerLanguage('jsx', jsx);

function CommonHighlighter({ children, language = 'jsx' }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={prism}
      customStyle={{ padding: 20 }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default CommonHighlighter;
