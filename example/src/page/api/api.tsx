import React, { Fragment } from 'react';
import styles from './api.module.css';
import CommonHighlighter from '../../component/common-highlighter';
import { Themes } from '../../../../src/lib/constants';

function Api() {
  const themes = Object.values(Themes);

  return (
    <div className={styles.apis}>
      <section id="toast">
        <h2>🍞 Toast</h2>

        <h3>toast(message, durationOrOptions): Toast</h3>
        <p>
          Displays a toast notification with the given message and options. It returns a Toast
          object that allows you to control the toast message currently being displayed.
        </p>
        <div className={styles.code}>
          <CommonHighlighter>{`import toast from 'react-simple-toasts';

export function MyComponent() {
  return (
    <button onClick={() => toast('Hello, world!')}>
      Display Toast
    </button>
  );
}`}</CommonHighlighter>
        </div>
        <br />
        <p>
          By default, the toast message is displayed for 3 seconds. Modify the duration by providing
          a second argument to the <code>toast</code> function:
        </p>
        <div className={styles.code}>
          <CommonHighlighter>{`toast('Hello, world!', 5000);`}</CommonHighlighter>
        </div>
        <br />
        <p>
          Adjust the appearance and behavior of the toast message by supplying an options object to
          the toast function:
        </p>
        <div className={styles.code}>
          <CommonHighlighter>{`toast('Hello, world!', {
  duration: 5000,
  position: 'top-right',
  clickable: true,
  clickClosable: true,
  className: 'custom-toast',
  render: (message) => <CustomToast message={message} />,
  onClick: (event) => console.log('Toast clicked!'),
});`}</CommonHighlighter>
        </div>
        <br />

        <h4>Main Parameters</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>message</td>
              <td>
                <code>string</code>, <code>ReactNode</code>
              </td>
              <td>The message to display in the toast.</td>
            </tr>
            <tr>
              <td>durationOrOptions</td>
              <td>
                <code>number</code>, <code>object</code>
              </td>
              <td>
                Either the duration for the toast (in milliseconds) or an object containing options
                for the toast.
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h4>Options Object Properties</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>duration</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The duration (in milliseconds) for which the toast message will be displayed.
                Default is <code>3000</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>theme</td>
              <td>
                <code>string</code>
              </td>
              <td>
                The theme property specifies the visual theme of the toast message. Available
                options include
                {themes.map((name, i) => (
                  <Fragment key={name}>
                    <code key={name}>'{name}'</code>
                    {i < themes.length - 1 ? ', ' : ''}
                  </Fragment>
                ))}
                .
              </td>
              <td>4.0.0</td>
            </tr>
            <tr>
              <td>zIndex</td>
              <td>
                <code>number</code>
              </td>
              <td>
                Sets the stack order of the toast. Higher values will render the toast on top.
                Default is <code>1000</code>.
              </td>
              <td>5.0.0</td>
            </tr>
            <tr>
              <td>className</td>
              <td>
                <code>string</code>
              </td>
              <td>A string of classes to apply to the toast container.</td>
              <td></td>
            </tr>
            <tr>
              <td>clickable</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                A boolean value that determines whether the toast message is clickable. Default is{' '}
                <code>false</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>clickClosable</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                A boolean value that determines whether the toast message can be closed by clicking
                on it. Default is <code>false</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>position</td>
              <td>
                <code>string</code>
              </td>
              <td>
                A string that sets the position of the toast message. Available options are{' '}
                <code>'bottom-left'</code>, <code>'bottom-center'</code>,{' '}
                <code>'bottom-right'</code>, <code>'top-left'</code>, <code>'top-center'</code>,{' '}
                <code>'top-right'</code>, and <code>'center'</code>. Default is{' '}
                <code>'bottom-center'</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>maxVisibleToasts</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The maximum number of toast messages that can be displayed simultaneously. Default
                is <code>null</code>, which allows an unlimited number of toasts.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>render</td>
              <td>
                <code>function</code>
              </td>
              <td>
                A function that returns a ReactNode to render as the toast message. The function
                takes a <code>message</code> argument, which is the message to display in the toast.
                Default is <code>null</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>isReversedOrder</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                A boolean value that determines whether the order of toast messages will be
                reversed. Default is <code>false</code>.
              </td>
              <td>5.1.0</td>
            </tr>
            <tr>
              <td>onClick</td>
              <td>
                <code>function</code>
              </td>
              <td>
                A function to be called when the toast message is clicked. This function takes an{' '}
                <code>event</code> argument, which is the click event. Must be used with{' '}
                <code>clickable: true</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>onClose</td>
              <td>
                <code>function</code>
              </td>
              <td>
                A function to be called when the toast message is closed and the closing animation
                is finished.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>onCloseStart</td>
              <td>
                <code>function</code>
              </td>
              <td>
                A function to be called when the toast message starts closing, right before the
                closing animation begins.
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3>Toast Return Object</h3>
        <p style={{ marginBottom: 15 }}>
          When you call the <code>toast</code> function, it returns a <code>Toast</code> object that
          you can use to control the displayed toast message. The <code>Toast</code> object includes
          the following methods:
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>close()</code>
              </td>
              <td>Closes the currently displayed toast message.</td>
              <td>3.3.0</td>
            </tr>
            <tr>
              <td>
                <code>updateDuration(newDuration: number)</code>
              </td>
              <td>Updates the duration of the currently displayed toast message.</td>
              <td>3.5.0</td>
            </tr>
            <tr>
              <td>
                <code>update(message: ReactNode, duration?: number)</code>
              </td>
              <td>Updates the message and duration of the currently displayed toast message.</td>
              <td>3.5.0</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: 15 }}>
          These methods can be invoked at any time to manage the toast message before its duration
          has elapsed.
        </p>
        <div className={styles.code}>
          <CommonHighlighter>{`const myToast = toast('Hello, world!', Infinity);

// ...

<button onClick={() => myToast.close()}>
  Close Toast Message
</button>`}</CommonHighlighter>
        </div>
      </section>

      <section id="toast-config">
        <h2>🛠️ Toast Config</h2>
        <h3>
          Configuring Toasts: <code>createToast</code> and <code>toastConfig</code>
        </h3>
        <p>
          The <code>createToast</code> and <code>toastConfig</code> functions provide methods for
          configuring and managing toast messages in your application. Both functions can be used to
          fine-tune the behavior of your toast messages, each serving a different purpose.
        </p>
        <br />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>duration</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The duration (in milliseconds) for which the toast message will be displayed.
                Default is <code>3000</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>theme</td>
              <td>
                <code>string</code>
              </td>
              <td>
                The theme property specifies the visual theme of the toast message. Available
                options include
                {themes.map((name, i) => (
                  <Fragment key={name}>
                    <code key={name}>'{name}'</code>
                    {i < themes.length - 1 ? ', ' : ''}
                  </Fragment>
                ))}
                .
              </td>
              <td>4.0.0</td>
            </tr>
            <tr>
              <td>zIndex</td>
              <td>
                <code>number</code>
              </td>
              <td>
                Sets the stack order of the toast. Higher values will render the toast on top.
                Default is <code>1000</code>.
              </td>
              <td>5.0.0</td>
            </tr>
            <tr>
              <td>className</td>
              <td>
                <code>string</code>
              </td>
              <td>A string of classes to apply to the toast container.</td>
              <td></td>
            </tr>
            <tr>
              <td>clickClosable</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                A boolean value that determines whether the toast message can be closed by clicking
                on it. Default is <code>false</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>position</td>
              <td>
                <code>string</code>
              </td>
              <td>
                A string that sets the position of the toast message. Available options are{' '}
                <code>'bottom-left'</code>, <code>'bottom-center'</code>,{' '}
                <code>'bottom-right'</code>, <code>'top-left'</code>, <code>'top-center'</code>,{' '}
                <code>'top-right'</code>, and <code>'center'</code>. Default is{' '}
                <code>'bottom-center'</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>maxVisibleToasts</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The maximum number of toast messages that can be displayed simultaneously. Default
                is <code>null</code>, which allows an unlimited number of toasts.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>render</td>
              <td>
                <code>function</code>
              </td>
              <td>
                A function that returns a ReactNode to render as the toast message. The function
                takes a <code>message</code> argument, which is the message to display in the toast.
                Default is <code>null</code>.
              </td>
              <td></td>
            </tr>
            <tr>
              <td>isReversedOrder</td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                A boolean value that determines whether the order of toast messages will be
                reversed. Default is <code>false</code>.
              </td>
              <td>5.1.0</td>
            </tr>
            <tr>
              <td>offsetX</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The horizontal offset (in pixels) from the edge of the viewport. This value
                determines the left or right distance of the toast depending on the toast's
                position. Default is <code>30</code>.
              </td>
              <td>5.6.0</td>
            </tr>
            <tr>
              <td>offsetY</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The vertical offset (in pixels) from the edge of the viewport. This value determines
                the top or bottom distance of the toast depending on the toast's position. Default
                is <code>30</code>.
              </td>
              <td>5.6.0</td>
            </tr>
            <tr>
              <td>gap</td>
              <td>
                <code>number</code>
              </td>
              <td>
                The vertical gap (in pixels) between consecutive toast messages. This value determines the vertical distance between toasts. Default is <code>10</code>.
              </td>
              <td>5.7.0</td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3>createToast(options)</h3>
        <p>
          Introduced in version 3.6.0, the <code>createToast</code> function generates a new toast
          function instance based on the given options. This allows you to create and manage
          multiple pre-configured toast instances with different configurations.
        </p>
        <div className={styles.code}>
          <CommonHighlighter>
            {`import { createToast } from 'react-simple-toasts';

const customToast = createToast({
  duration: 5000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'bottom-right',
  maxVisibleToasts: 3,
  render: (message) => <b className="my-toast">{message}</b>,
});

function MyComponent() {
  return (
    <button onClick={() => customToast('Hello, world!')}>
      Display Custom Toast
    </button>
  );
}`}
          </CommonHighlighter>
        </div>
        <br />

        <h3>toastConfig(options)</h3>
        <p>
          The <code>toastConfig</code> function sets default options for all toast messages in your
          application.
        </p>
        <div className={styles.code}>
          <CommonHighlighter>
            {`// index.js
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  duration: 5000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'bottom-right',
  maxVisibleToasts: 3,
  render: (message) => <b className="my-toast">{message}</b>,
});`}
          </CommonHighlighter>
        </div>
        <br />

        <h3>createToast vs toastConfig</h3>
        <p>
          While both <code>createToast</code> and <code>toastConfig</code> serve similar purposes,
          they differ in their usage. <code>toastConfig</code> specifies default settings that apply
          to all toast messages throughout your application. In contrast, <code>createToast</code>{' '}
          is used to create distinct toast instances with various configurations.
        </p>
        <p>
          If you need to create toasts with special settings for specific sections only, it's
          recommended to use <code>createToast</code>. However, if you want to maintain consistency
          across your application, it's advisable to specify default settings using{' '}
          <code>toastConfig</code>.
        </p>
      </section>

      <section id="clear-toasts">
        <h2>🧹 Clearing Toasts</h2>
        <h3>clearToasts()</h3>
        <p>
          The <code>clearToasts</code> function is used to dismiss all currently displayed toast
          notifications. This can be especially useful in situations where you want to ensure that
          all toasts are removed from the screen, such as navigating away from a page or reacting to
          specific user actions.
        </p>
        <br />
        <p>
          Here is an example of how to use the <code>clearToasts</code> function:
        </p>
        <div className={styles.code}>
          <CommonHighlighter>{`import { clearToasts } from 'react-simple-toasts';

// ... your other code

// This will dismiss all current toast notifications
clearToasts();`}</CommonHighlighter>
        </div>
        <br />
        <p>
          Note that the <code>clearToasts</code> function does not take any arguments and does not
          return a value. It simply removes all toasts from the screen.
        </p>
      </section>
    </div>
  );
}

export default Api;
