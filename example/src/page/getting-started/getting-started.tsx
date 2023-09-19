import React from 'react';
import CommonHighlighter from '../../component/common-highlighter';
import styles from './getting-started.module.css';

function GettingStarted() {
  return (
    <div>
      <section id="installation">
        <h2>📦 Installation</h2>
        <p>To get started with React Simple Toasts, install the package using npm or yarn:</p>
        <br />
        <div className={styles.code}>
          <CommonHighlighter>{`// with npm
npm install react-simple-toasts

// with yarn
yarn add react-simple-toasts`}</CommonHighlighter>
        </div>
      </section>
      <section id="usage">
        <h2>🛠 Usage</h2>
        <p>
          Here is a simple example of how to use React Simple Toasts.
          <br />
          As of version 4.0.0, a theme must be explicitly imported and set as a configuration
          option. Without a specified theme, no styles will be applied to the toast message.
        </p>
        <br />
        <div className={styles.code}>
          <CommonHighlighter>
            {`import React from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; // import the desired theme

// specify the theme in toastConfig
toastConfig({
  theme: 'dark',
});

function App() {
  return (
    <button onClick={() => toast('Hello, World!')}>
      Show Toast
    </button>
  );
}

export default App;`}
          </CommonHighlighter>
        </div>
      </section>
      <section>
        <h3>🌟 Benefits of using React Simple Toasts:</h3>
        <ul className={styles.benefits}>
          <li>No need for Provider or any wrapper components.</li>
          <li>Simple theme configuration with built-in styles.</li>
        </ul>
      </section>
    </div>
  );
}

export default GettingStarted;
