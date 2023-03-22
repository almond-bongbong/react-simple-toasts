import React, { useState } from 'react';
import toast, { Toast, toastConfig } from 'react-simple-toasts';
import CommonHighlighter from './component/CommonHighlighter';

function App() {
  const [infinityToast, setInfinityToast] = useState<Toast | null>(null);

  return (
    <div className="example">
      <div className="container">
        <h2 id="tooltip">react-simple-toasts</h2>
        <p className="desc">Simple toast message popup for React.</p>

        <div className="example-area">
          <h3>Basic usage</h3>
          <p>
            Display a simple toast message with the default settings.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast('Simple message')}
            >
              Show Simple Toast
            </button>
          </div>
          <CommonHighlighter>{`toast('Simple message')`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Using JSX in Toast Messages</h3>
          <p>
            You can use JSX to create more complex and customizable toast messages.
            This example demonstrates how to include JSX elements and apply inline styles within the message.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast(<b style={{ color: 'skyblue' }}>Custom JSX message</b>)}
            >
              Show JSX Toast
            </button>
          </div>
          <CommonHighlighter>{`toast(<b style={{ color: 'skyblue' }}>Custom JSX message</b>)`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Toast Display Duration</h3>
          <p>
            Control the duration for which the toast message is displayed.
            This example demonstrates how to display a toast message for a specific time.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('This message is displayed for 1 second.', 1000)
              }
            >
              Show 1-Second Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', 1000)`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Toast Display Duration (Alternative Syntax)</h3>
          <p>
            Alternatively, you can use the "time" option to specify the display duration.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('This message is displayed for 1 second.', {
                  time: 1000,
                })
              }
            >
              Show 1-Second Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', {
  time: 1000,
})`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Positioning Toast Messages</h3>
          <p>
            Choose the position of the toast message on the screen.
            This example demonstrates how to display a toast message in various positions.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast('Top-left positioned toast', { position: 'top-left' })}
            >
              Top-Left
            </button>
            <button
              className="example-button"
              onClick={() => toast('Top-center positioned toast', { position: 'top-center' })}
            >
              Top-Center
            </button>
            <button
              className="example-button"
              onClick={() => toast('Top-right positioned toast', { position: 'top-right' })}
            >
              Top-Right
            </button>
            <br /><br />
            <button
              className="example-button"
              onClick={() => toast('Bottom-left positioned toast', { position: 'bottom-left' })}
            >
              Bottom-Left
            </button>
            <button
              className="example-button"
              onClick={() => toast('Bottom-center positioned toast', { position: 'bottom-center' })}
            >
              Bottom-Center
            </button>
            <button
              className="example-button"
              onClick={() => toast('Bottom-right positioned toast', { position: 'bottom-right' })}
            >
              Bottom-Right
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Top-left positioned toast', { position: 'top-left' })
toast('Top-center positioned toast', { position: 'top-center' })
toast('Top-right positioned toast', { position: 'top-right' })
toast('Bottom-left positioned toast', { position: 'bottom-left' })
toast('Bottom-center positioned toast', { position: 'bottom-center' })
toast('Bottom-right positioned toast', { position: 'bottom-right' })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Click-to-Close Toast</h3>
          <p>
            Create a toast message that can be closed by clicking on it.
            This example demonstrates a toast with the "clickClosable" option set to true.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('Click to close this toast', { clickClosable: true })
              }
            >
              Show Click-to-Close Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Click to close this toast', { clickClosable: true })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Customize Toast Appearance</h3>
          <p>
            Customize the appearance of the toast message using the "render" option.
            In this example, the toast message will be displayed in red text.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('Red Message', { render: message => <div style={{ color: 'red' }}>{message}</div> })
              }
            >
              Show Red Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Red Message', { render: message => <div style={{ color: 'red' }}>{message}</div> })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Global Configuration</h3>
          <p>
            Set global configurations to apply default settings to all toast messages in your application.
          </p>
          <CommonHighlighter>
            {`// index.js
toastConfig({
  time: 4000,
  className: 'my-toast',
  position: 'top-center',
  clickClosable: true,
  render: message => <div style={{ color: 'red' }}>{message}</div>,
})

// ...

toast('Red Message')`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Control Infinite Toast</h3>
          <p>In this example, we use the Toast object to show and close a toast with an infinite duration.</p>
          <div className="playground">
            <button
              className="example-button"
              disabled={!!infinityToast}
              onClick={() => {
                const myToast = toast('Message', Infinity);
                setInfinityToast(myToast);
              }}
            >
              Show Infinite Toast
            </button>
            <button
              className="example-button"
              disabled={!infinityToast}
              onClick={() => {
                infinityToast?.close();
                setInfinityToast(null);
              }}
            >
              Close Infinite Toast
            </button>
          </div>
          <CommonHighlighter>
            {`const myToast = toast('Message', Infinity); // Show toast

myToast.close(); // Close toast`}
          </CommonHighlighter>

        </div>
      </div>

      <footer>
        <div className="footer-content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong/react-simple-toasts"
          >
            https://github.com/almond-bongbong/react-simple-toasts
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
