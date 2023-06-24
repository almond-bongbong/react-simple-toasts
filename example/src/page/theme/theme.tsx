import React, { Fragment } from 'react';
import CommonHighlighter from '../../component/common-highlighter';
import Button from '../../component/button';
import styles from './theme.module.css';
import toast, { Themes, ToastOptions } from 'react-simple-toasts';
import themes from '../../assets/themes.json';

function Theme() {
  const themeList = Object.values(Themes);

  return (
    <div>
      <section id="introduction">
        <h2>📚 Introduction</h2>
        <p>
          The theme functionality in react-simple-toasts allows for
          customisation of toast appearances. No theme is applied by default
          unless explicitly specified.
        </p>

        <div className={styles.playground}>
          <Button
            onClick={() => {
              toast('Hello, World!', { theme: null });
            }}
          >
            None theme
          </Button>
        </div>
        <div className={styles.code}>
          <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!')}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
        </div>
      </section>

      <section id="built-in-themes">
        <h2>🎁 Built-in Themes</h2>
        <p>
          react-simple-toasts comes with built-in themes:{' '}
          {themeList.map((theme) => (
            <Fragment key={theme}>
              <code>'{theme}'</code>
              {theme !== themes[themes.length - 1] ? ', ' : ''}
            </Fragment>
          ))}
          . You can use these themes to quickly style your toasts. Here is how
          you can use these themes:
        </p>

        <div className={styles.area}>
          <div className={styles.playground}>
            {themeList.map((theme) => (
              <Button
                key={theme}
                onClick={() => {
                  toast('Hello, World!', {
                    theme: theme as ToastOptions['theme'],
                  });
                }}
              >
                {theme}
              </Button>
            ))}
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
${themeList
  .map((theme) => `import 'react-simple-toasts/dist/theme/${theme}.css';`)
  .join('\n')}

export default function App() {
  return (
    <>
      ${themeList
        .map(
          (
            theme,
          ) => `<button onClick={() => toast('Hello, World!', { theme: '${theme}' })}>
        ${theme}
      </button>`,
        )
        .join('\n      ')}
    </>
  );
}`}</CommonHighlighter>
          </div>
        </div>
      </section>

      <section id="setting-a-theme">
        <h2>🎨 Setting a Theme</h2>
        <p>
          There are several ways to set a theme for your toasts. Here are some
          examples:
        </p>
        <br />

        <div className={styles.area}>
          <h3>Setting a theme in toast function</h3>
          <p>
            You can directly specify a theme when calling the toast function.
          </p>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { theme: 'dark' })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div className={styles.area}>
          <h3>Setting a global theme</h3>
          <p>
            You can set a global theme that will be used for all toasts by
            default.
          </p>
          <div className={styles.code}>
            <CommonHighlighter>{`// index.js
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({
  theme: 'dark',
});`}</CommonHighlighter>
            <br />
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!')}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div className={styles.area}>
          <h3>Creating a themed toast function</h3>
          <p>
            You can create a toast function with a specified theme that can be
            used throughout your application.
          </p>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

const darkToast = createToast({ theme: 'dark' });

export default function App() {
  return (
    <button onClick={() => darkToast('Hello, World!')}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>
      </section>

      <section id="custom-theme">
        <h2>🛠 Custom Theme</h2>
        <p>
          If the built-in themes do not suit your needs, you can easily create
          your own custom theme. To do this, simply specify your own CSS class
          by using the <code>className</code> property. You can apply this
          property when calling the toast function, setting global
          configurations, or creating a toast function. Here is an example of
          how you can create a custom theme:
        </p>

        <div className={styles.area}>
          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World!', { theme: null, className: 'my-toast' })
              }
            >
              Custom toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter language="css">{`/* my-style.css */

.my-toast {
  background-color: rgba(255, 107, 129, 0.9);
  padding: 10px 20px;
  color: #fff;
  border-radius: 3px;
}`}</CommonHighlighter>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
import './my-style.css';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { className: 'my-toast' })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>
      </section>

      <section id="contributing-theme">
        <h2>🤝 Contributing Theme</h2>
        <p>
          If you've created a theme that you believe would be beneficial to
          others, you're welcome to contribute it to the react-simple-toasts
          library. Here are the steps to do so:
        </p>
        <ul className={styles.list}>
          <li>
            Add your theme name to the <code>Themes</code> constant in the{' '}
            <a href="https://github.com/almond-bongbong/react-simple-toasts/blob/master/src/lib/constants.ts#L13">
              source code
            </a>
            . It should look something like this:
            <div className={styles.code}>
              <CommonHighlighter language="javascript">{`// After addition, your theme should be included as follows:
export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
  YOUR_THEME_NAME: 'your_theme_name',
} as const;`}</CommonHighlighter>
            </div>
            <br />
          </li>
          <li>
            Create a CSS file with the same name as your theme, and add it to
            the{' '}
            <a href="https://github.com/almond-bongbong/react-simple-toasts/tree/master/src/theme">
              theme folder
            </a>
            .
          </li>
          <li>
            Declare the <code>.toast-[name]</code> selector in your CSS file and
            apply your styles. The <code>[name]</code> should match the name of
            your theme.
            <div className={styles.code}>
              <CommonHighlighter language="css">{`/* /src/theme/some.css */

.toast-some {
  /* your styles here */
}`}</CommonHighlighter>
            </div>
          </li>
        </ul>
        <p className={styles.description}>
          We appreciate your contributions and look forward to seeing your
          creative and unique themes!
        </p>
      </section>
    </div>
  );
}

export default Theme;
