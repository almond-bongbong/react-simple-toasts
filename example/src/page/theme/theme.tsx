import React from 'react';
import CommonHighlighter from '../../component/common-highlighter';
import Button from '../../component/button';
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

function Theme() {
  return (
    <div>
      <h2>Theme</h2>
      <p>
        react-simple-toasts has a default theme, but you can customize it by
        passing a theme object to the toast function.
      </p>
      <br />
      <Button onClick={() => {
        toast('Hello, World!', { duration: Infinity, theme: 'dark' });
      }}>
        Light theme
      </Button>
      <br />
      <br />
      <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { theme: 'light' })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>

      <section>
        <h3></h3>
      </section>
    </div>
  );
}

export default Theme;
