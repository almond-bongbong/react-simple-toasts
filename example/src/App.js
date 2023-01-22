import React, { Component } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import CommonHighlighter from './component/CommonHighlighter';

export default class App extends Component {
  render() {
    return (
      <div className="example">
        <div className="container">
          <h2 id="tooltip">react-simple-toasts</h2>
          <p>Simple toast message popup for React.</p>

          <h3>Basic usage</h3>
          <div className="example-area">
            <div className="playground">
              <button
                className="example-button"
                onClick={() => toast('Message')}
              >
                click
              </button>
            </div>
            <CommonHighlighter>{`toast('Message')`}</CommonHighlighter>
          </div>

          <div className="example-area">
            <div className="playground">
              <button
                className="example-button"
                onClick={() =>
                  toast(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  )
                }
              >
                click
              </button>
            </div>
            <CommonHighlighter>
              {`toast('Lorem ipsum dolor sit ...')`}
            </CommonHighlighter>
          </div>

          <div className="example-area">
            <div className="playground">
              <button
                className="example-button"
                onClick={() => toast(<><b style={{ color: 'skyblue' }}>Hello,</b> world</>)}
              >
                click
              </button>
            </div>
            <CommonHighlighter>{`toast(<><b style={{ color: 'skyblue' }}>Hello,</b> world</>`}</CommonHighlighter>
          </div>

          <div className="example-area">
            <h3>Time</h3>
            <div className="playground">
              <button
                className="example-button"
                onClick={() =>
                  toast('This message is displayed for 1 second.', 1000)
                }
              >
                click
              </button>
            </div>
            <CommonHighlighter>
              {`toast('This message is displayed for 1 second.', 1000)`}
            </CommonHighlighter>
          </div>

          <div className="example-area">
            <div className="playground">
              <button
                className="example-button"
                onClick={() =>
                  toast('This message is displayed for 1 second.', {
                    time: 1000,
                  })
                }
              >
                click
              </button>
            </div>
            <CommonHighlighter>
              {`toast('This message is displayed for 1 second.', {
  time: 1000,
})`}
            </CommonHighlighter>
          </div>

          <div className="example-area">
            <h3>Position</h3>
            <div className="playground">
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'top-left' })}
              >
                top-left
              </button>
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'top-center' })}
              >
                top-center
              </button>
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'top-right' })}
              >
                top-right
              </button>
              <br /><br />
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'bottom-left' })}
              >
                bottom-left
              </button>
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'bottom-center' })}
              >
                bottom-center
              </button>
              <button
                className="example-button"
                onClick={() => toast('Message', { position: 'bottom-right' })}
              >
                bottom-right
              </button>
            </div>
            <CommonHighlighter>
              {`toast('Message', { position: 'top-left' })
toast('Message', { position: 'top-center' })
toast('Message', { position: 'top-right' })
toast('Message', { position: 'bottom-left' })
toast('Message', { position: 'bottom-center' })
toast('Message', { position: 'bottom-right' })`}
            </CommonHighlighter>
          </div>

          <div className="example-area">
            <h3>Click Closable</h3>
            <div className="playground">
              <button
                className="example-button"
                onClick={() =>
                  toast('Click this toast', { clickClosable: true })
                }
              >
                click
              </button>
            </div>
            <CommonHighlighter>
              {`toast('Click this toast', { clickClosable: true })`}
            </CommonHighlighter>
          </div>

          <div className="example-area">
            <h3>Custom render</h3>
            <div className="playground">
              <button
                className="example-button"
                onClick={() =>
                  toast('Message', { render: message => <div style={{ color: 'red' }}>{message}</div> })
                }
              >
                click
              </button>
            </div>
            <CommonHighlighter>
              {`// index.js
toastConfig({
  render: message => <div style={{ color: 'red' }}>{message}</div>,
})

// ...

toast('Message')`}
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
              https://github.com/almond-bongbong
            </a>
          </div>
        </footer>
      </div>
    );
  }
}
