import React, { useState } from 'react';
import toast, { clearToasts, createToast, Toast } from 'react-simple-toasts';
import CommonHighlighter from '../../component/common-highlighter';

const toastA = createToast({
  duration: 3000,
});

function Example() {
  const [infinityToast, setInfinityToast] = useState<Toast | null>(null);
  const [extendedToast, setExtendedToast] = useState<Toast | null>(null);
  const [updatedToast, setUpdatedToast] = useState<Toast | null>(null);

  return (
    <div className="example">
      <div className="container">
        <h2 id="tooltip">react-simple-toasts</h2>
        <p className="desc">
          React Simple Toasts is a lightweight and versatile toast notification
          library for React applications.
        </p>

        <div className="example-area">
          <h3>Basic Usage</h3>
          <p>
            Display a straightforward toast notification with default settings.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toastA('Simple message')}
            >
              Display Simple Toast
            </button>
          </div>
          <CommonHighlighter>{`import toast from 'react-simple-toasts'

// ...

toast('Simple message')`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Utilizing JSX in Toast Notifications</h3>
          <p>
            Leverage JSX to design more intricate and customizable toast
            notifications. This example showcases how to include JSX elements
            and apply inline styles within the message.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast(<b style={{ color: 'skyblue' }}>Custom JSX message</b>)
              }
            >
              Display JSX Toast
            </button>
          </div>
          <CommonHighlighter>{`toast(<b style={{ color: 'skyblue' }}>Custom JSX message</b>)`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Toast Notification Duration</h3>
          <p>
            Determine the duration for which the toast notification remains
            visible. This example demonstrates how to display a toast
            notification for a specific duration.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('This message is displayed for 1 second.', 1000)
              }
            >
              Display 1-Second Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', 1000)`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Toast Clearing</h3>
          <p>
            Clear all toast notifications. This example demonstrates how to
            clear all toast notifications.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast('Simple message')}
            >
              Display Simple Toast
            </button>
            <button className="example-button" onClick={() => clearToasts()}>
              Clear Toast
            </button>
          </div>
          <CommonHighlighter>
            {`import toast, { clearToasts } from 'react-simple-toasts'

// ...

toast('Simple message')
clearToasts()`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Toast Notification Duration (Alternative Syntax)</h3>
          <p>
            As an alternative, you can use the "duration" option to specify the
            display duration.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('This message is displayed for 1 second.', {
                  duration: 1000,
                })
              }
            >
              Display 1-Second Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', {
  duration: 1000,
})`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Positioning Toast Notifications</h3>
          <p>
            Select the desired position of the toast notification on the screen.
            This example demonstrates how to display toast notifications in
            various positions.
          </p>

          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('Top-left positioned toast', { position: 'top-left' })
              }
            >
              Top-Left
            </button>
            <button
              className="example-button"
              onClick={() =>
                toast('Top-center positioned toast', { position: 'top-center' })
              }
            >
              Top-Center
            </button>
            <button
              className="example-button"
              onClick={() =>
                toast('Top-right positioned toast', { position: 'top-right' })
              }
            >
              Top-Right
            </button>
            <br />
            <br />
            <button
              className="example-button"
              onClick={() =>
                toast('Bottom-left positioned toast', {
                  position: 'bottom-left',
                })
              }
            >
              Bottom-Left
            </button>
            <button
              className="example-button"
              onClick={() =>
                toast('Bottom-center positioned toast', {
                  position: 'bottom-center',
                })
              }
            >
              Bottom-Center
            </button>
            <button
              className="example-button"
              onClick={() =>
                toast('Bottom-right positioned toast', {
                  position: 'bottom-right',
                })
              }
            >
              Bottom-Right
            </button>
            <button
              className="example-button"
              onClick={() =>
                toast('Center positioned toast', { position: 'center' })
              }
            >
              Center
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Top-left positioned toast', { position: 'top-left' })
toast('Top-center positioned toast', { position: 'top-center' })
toast('Top-right positioned toast', { position: 'top-right' })
toast('Bottom-left positioned toast', { position: 'bottom-left' })
toast('Bottom-center positioned toast', { position: 'bottom-center' })
toast('Bottom-right positioned toast', { position: 'bottom-right' })
toast('Center positioned toast', { position: 'center' })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Click-to-Close Toast</h3>
          <p>
            Create a toast notification that can be dismissed by clicking on it.
            This example demonstrates a toast with the "clickClosable" option
            set to true.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('Click to close this toast', { clickClosable: true })
              }
            >
              Display Click-to-Close Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Click to close this toast', { clickClosable: true })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Customize Toast Appearance</h3>
          <p>
            Modify the appearance of the toast notification using the "render"
            option. In this example, the toast notification will display red
            text.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() =>
                toast('Red Message', {
                  render: (message) => (
                    <div style={{ color: 'red' }}>{message}</div>
                  ),
                })
              }
            >
              Display Red Toast
            </button>
          </div>
          <CommonHighlighter>
            {`toast('Red Message', { render: message => <div style={{ color: 'red' }}>{message}</div> })`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Global Configuration</h3>
          <p>
            Establish global configurations to apply default settings to all
            toast notifications in your application.
          </p>
          <CommonHighlighter>
            {`// index.js
import toast, { toastConfig } from 'react-simple-toasts'

toastConfig({
  duration: 4000,
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
          <h3>Max Visible Toasts</h3>
          <p>
            Limit the number of toast notifications displayed at the same time.
          </p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast('Toast message', { maxVisibleToasts: 3 })}
            >
              Show Toasts (Limited by maxVisibleToasts)
            </button>
          </div>
          <CommonHighlighter>
            {`toastConfig({ maxVisibleToasts: 3 });

// ...

toast('Toast message');`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <p>Apply maxVisibleToasts directly in the toast function.</p>
          <div className="playground">
            <button
              className="example-button"
              onClick={() => toast('Toast message', { maxVisibleToasts: 3 })}
            >
              Show Toasts (Limited by maxVisibleToasts)
            </button>
          </div>
          <CommonHighlighter>
            {`<button
  onClick={() => toast('Toast message', { maxVisibleToasts: 3 })}
>
  Show Toasts (Limited by maxVisibleToasts)
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Control Infinite Toast</h3>
          <p>
            In this example, we use the Toast object to display and close a
            toast with an infinite duration.
          </p>

          <div className="playground">
            <button
              className="example-button"
              disabled={!!infinityToast}
              onClick={() => {
                const myToast = toast('Infinity Message', Infinity);
                setInfinityToast(myToast);
              }}
            >
              Display Infinite Toast
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

        <div className="example-area">
          <h3>Update Toast Duration</h3>
          <p>
            In this example, we use the Toast object's 'updateDuration' method
            to update the duration of a toast message.
          </p>

          <div className="playground">
            <button
              className="example-button"
              disabled={!!extendedToast}
              onClick={() => {
                const myToast = toast('Message', {
                  duration: Infinity,
                  onClose: () => setExtendedToast(null),
                });
                setExtendedToast(myToast);
              }}
            >
              Display Toast
            </button>
            <button
              className="example-button"
              disabled={!extendedToast}
              onClick={() => {
                extendedToast?.updateDuration(500);
              }}
            >
              Update Duration to 5s
            </button>
          </div>
          <CommonHighlighter>
            {`const myToast = toast('Message', 3000); // Show toast for 3 seconds

myToast.updateDuration(5000); // Update toast duration to 5 seconds`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Update Toast Message and Duration</h3>
          <p>
            In this example, we use the Toast object's 'update' method to update
            the message and duration of a toast message.
          </p>

          <div className="playground">
            <button
              className="example-button"
              disabled={!!updatedToast}
              onClick={() => {
                const myToast = toast('Original Message', {
                  duration: 3000,
                  onClose: () => setUpdatedToast(null),
                });
                setUpdatedToast(myToast);
              }}
            >
              Display Toast
            </button>
            <button
              className="example-button"
              disabled={!updatedToast}
              onClick={() => {
                updatedToast?.update('Updated Message', 5000);
              }}
            >
              Update Message and Duration
            </button>
          </div>
          <CommonHighlighter>
            {`const myToast = toast('Original Message', 3000); // Show toast for 3 seconds

myToast.update('Updated Message', 5000); // Update toast message and duration`}
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

export default Example;
