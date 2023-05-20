import React from 'react';
import CommonHighlighter from '../../component/common-highlighter';

function GettingStarted() {
  return (
    <div>
      <section id="installation">
        <h2>📦 Installation</h2>
        <p>
          To get started with React Simple Toasts, install the package using npm
          or yarn:
        </p>
        <br />
        <CommonHighlighter>{`// with npm
npm install react-simple-toasts

// with yarn
yarn add react-simple-toasts`}</CommonHighlighter>
      </section>
      <section id="usage">
        <h2>🛠 Usage</h2>
        <p>Here is a simple example of how to use React Simple Toasts:</p>
        <br />
        <CommonHighlighter>
          {`import React from 'react';
import toast from 'react-simple-toasts';

function App() {
  return (
    <div>
      <button onClick={() => toast('Hello, World!')}>
        Show Toast
      </button>
    </div>
  );
}

export default App;`}
        </CommonHighlighter>
      </section>
    </div>
  );
}

export default GettingStarted;
