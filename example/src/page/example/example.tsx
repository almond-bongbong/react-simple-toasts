import React, { useState } from 'react';
import toast, { Toast, ToastPosition } from 'react-simple-toasts';
import { Link } from 'react-router-dom';
import styles from './example.module.css';
import CommonHighlighter from '../../component/common-highlighter';
import Button from '../../component/button';
import MyMessage from '../../component/example/my-message';

function Example() {
  const [position, setPosition] = useState<ToastPosition>('bottom-center');
  const [infiniteToast, setInfiniteToast] = useState<Toast | null>(null);

  return (
    <div className={styles.example}>
      <section id="simple-example">
        <h2>🔬 Simple Example</h2>
        <p>Here's a simple example of how to use our package:</p>
        <br />
        <div id="basic-usage" className={styles.area}>
          <h3>Basic Usage</h3>
          <div className={styles.playground}>
            <Button onClick={() => toast('Hello, World!')}>Show Toast</Button>
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
        </div>

        <div id="duration" className={styles.area}>
          <h3>Duration</h3>

          <div className={styles.default}>
            default: <code>3000</code>
          </div>
          <p className={styles.description}>
            The <code>duration</code> option, in milliseconds, allows you to control how long the
            toast message is displayed. There are two different ways to set it as shown in the
            example.
          </p>
          <div className={styles.playground}>
            <Button onClick={() => toast('Hello, World!', 1000)}>Show Toast</Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <>
      <button onClick={() => toast('Hello, World!', 1000)}>
        Show Toast
      </button>
      <button onClick={() => toast('Hello, World!', { duration: 1000 })}>
        Show Toast
      </button>
    </>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="theme" className={styles.area}>
          <h3>Theme</h3>

          <div className={styles.default}>
            default: <code>undefined</code>
          </div>
          <p className={styles.description}>
            The <code>theme</code> option in the toast configuration allows you to apply different
            styles to your toasts. If no theme is specified, no default styles will be applied. You
            need to import the CSS file for the desired theme as shown in the code example below.
            For the available themes, please refer to the <a href="/api">API page</a>.
          </p>
          <div className={styles.playground}>
            <Button onClick={() => toast('Hello, World!', { theme: null })}>No theme</Button>

            <Button onClick={() => toast('Hello, World!', { theme: 'dark' })}>Dark Toast</Button>
            <Button onClick={() => toast('Hello, World!', { theme: 'light' })}>Light Toast</Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import 'react-simple-toasts/dist/theme/light.css';

export default function App() {
  return (
    <>
      <Button onClick={() => toast('Hello, World!', { theme: 'dark' })}>
        Dark Toast
      </Button>
      <Button onClick={() => toast('Hello, World!', { theme: 'light' })}>
        Light Toast
      </Button>
    </>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="class-name" className={styles.area}>
          <h3>className</h3>

          <div className={styles.default}>
            default: <code>undefined</code>
          </div>
          <p className={styles.description}>
            The <code>className</code> option allows you to customize the style of the toast
            message. You can provide your own CSS class name and define the styles in your CSS file
            as shown in the example.
          </p>
          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World!', {
                  className: 'my-toast',
                  theme: null,
                })
              }
            >
              Show Toast
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
import 'my-style.css';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { className: 'my-toast' })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="clickable" className={styles.area}>
          <h3>clickable</h3>

          <div className={styles.default}>
            default: <code>false</code>
          </div>

          <p className={styles.description}>
            The <code>clickable</code> option allows you to make the toast message interactive,
            meaning it can be clicked. Once <code>clickable</code> is set to true, you can provide
            an <code>onClick</code> handler to execute an action when the toast is clicked, as
            demonstrated in the example.
          </p>
          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World!', {
                  duration: 5000,
                  clickable: true,
                  onClick: () => alert('Clicked!'),
                })
              }
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {

  const handleClick = () => {
    toast('Hello, World!', {
      clickable: true,
      onClick: () => alert('Clicked!'),
    });
  }

  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="click-closable" className={styles.area}>
          <h3>clickClosable</h3>

          <div className={styles.default}>
            default: <code>false</code>
          </div>

          <p className={styles.description}>
            The <code>clickClosable</code> prop allows users to dismiss the toast by clicking on it.
            When set to <code>true</code>, a click anywhere on the toast message will close the
            toast. This provides an additional, user-friendly way to dismiss toasts, beyond waiting
            for them to automatically disappear.
          </p>

          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World!', {
                  duration: 5000,
                  clickClosable: true,
                })
              }
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { clickClosable: true })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="position" className={styles.area}>
          <h3>position</h3>

          <div className={styles.default}>
            default: <code>bottom-center</code>
          </div>

          <p className={styles.description}>
            The <code>position</code> prop determines the location on the screen where the toast
            will appear. Available positions include <code>'top-left'</code>,
            <code>'top-center'</code>, <code>'top-right'</code>, <code>'bottom-left'</code>,{' '}
            <code>'bottom-center'</code>,<code>'bottom-right'</code>, and <code>'center'</code>.
            This gives you the flexibility to ensure that the toast doesn't interfere with other
            important UI elements.
          </p>

          <div className={styles.playground}>
            <select
              value={position}
              style={{ marginRight: 8 }}
              onChange={(e) => setPosition(e.target.value as ToastPosition)}
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="center">Center</option>
            </select>
            <Button
              onClick={() =>
                toast('Hello, World!', {
                  position,
                })
              }
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast, { ToastPosition } from 'react-simple-toasts';

export default function App() {
  const [position, setPosition] = useState<ToastPosition>('bottom-center');

  const handleClick = () => {
    toast('Hello, World!', { position });
  }

  return (
      <>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as ToastPosition)}
        >
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="center">Center</option>
        </select>

        <button onClick={handleClick}>
          Show Toast
        </button>
      </>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="max-visible" className={styles.area}>
          <h3>maxVisibleToasts</h3>

          <div className={styles.default}>
            default: <code>undefined</code>
          </div>

          <p className={styles.description}>
            The <code>maxVisibleToasts</code> prop sets a limit to the number of toasts that can be
            displayed on the screen at the same time. If more toasts are triggered while the limit
            is reached, they will be queued and displayed as older toasts disappear. This helps
            prevent a scenario where a large number of toasts are displayed simultaneously,
            potentially disrupting the user experience.
          </p>

          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World!', {
                  maxVisibleToasts: 3,
                })
              }
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  return (
    <button onClick={() => toast('Hello, World!', { maxVisibleToasts: 3 })}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="loading" className={styles.area}>
          <h3>loading</h3>
          <div className={styles.default}>
            default: <code>false</code>
          </div>
          <p className={styles.description}>
            The loading option provides the functionality to display a loading indicator within a
            toast message. This option is useful for visually indicating to the user that a lengthy
            operation is in progress. The color of the loading indicator is determined by the color
            of the message in the toast. The loading option can be set as true or as a Promise
            object, and there are two ways to use it
          </p>
          <div className={styles.playground}>
            <Button onClick={() => toast('Synchronizing...', { loading: true })}>Show Toast</Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`toast('Synchronizing...', { loading: true });`}</CommonHighlighter>
          </div>
          <br />
          Or, to simulate a lengthy operation, you can use a Promise that resolves after a delay.
          The following example demonstrates a dummy Promise that resolves after 3 seconds, but in a
          real-world scenario, this could represent an actual asynchronous task:
          <div className={styles.code}>
            <CommonHighlighter>{`const taskPromise = new Promise((resolve) => setTimeout(resolve, 3000));

toast('Synchronizing...', { loading: taskPromise });`}</CommonHighlighter>
          </div>
        </div>
      </section>

      <section id="advanced-example">
        <h2>🚀 Advanced Example</h2>
        <p>This is a more advanced example with additional options:</p>
        <br />

        <div id="promise-based-loading" className={styles.area}>
          <h3>Promise Based Loading</h3>
          <p className={styles.description}>
            This example demonstrates how to use a Promise to control a loading indicator in a toast
            message. A loading indicator is shown while the Promise is pending. Once resolved, the
            toast updates to a success message with a different theme and duration.
          </p>
          <div className={styles.playground}>
            <Button
              onClick={() => {
                const taskPromise = new Promise((resolve) => setTimeout(resolve, 2000));

                const taskToast = toast('Task started...', {
                  theme: 'info',
                  loading: taskPromise,
                  duration: Infinity,
                });

                taskPromise.then(() =>
                  taskToast.update({
                    message: 'Task completed!',
                    duration: 2000,
                    theme: 'success',
                  }),
                );
              }}
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/info.css';
import 'react-simple-toasts/dist/theme/success.css';

// ...            

const taskPromise = new Promise((resolve) => setTimeout(resolve, 2000));

const taskToast = toast('Task started...', {
  theme: 'info',
  loading: taskPromise,
  duration: Infinity,
});

taskPromise.then(() =>
  taskToast.update({
    message: 'Task completed!',
    duration: 2000,
    theme: 'success',
  }),
);`}</CommonHighlighter>
          </div>
        </div>

        <div id="infinity-duration" className={styles.area}>
          <h3>Infinity Duration</h3>

          <p className={styles.description}>
            If you want to create a toast notification that stays on the screen indefinitely until
            manually closed, you can pass <code>Infinity</code> as the duration. This will create an
            "infinite toast". The example below shows how to create an infinite toast and provide a
            button for manually closing it. This can be useful in scenarios where you want to make
            sure a critical message is not missed by the user.
          </p>

          <br />
          <h4>
            With <code>clickClosable</code>
          </h4>
          <div className={styles.playground}>
            <Button
              onClick={() => toast('Hello, World!', { duration: Infinity, clickClosable: true })}
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast, { Toast } from 'react-simple-toasts';

export default function App() {
  const handleShowClick = () => {
    toast('Hello, World!', {
      duration: Infinity,
      clickClosable: true,
    });
  };

  return (
    <button onClick={handleShowClick}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>

          <br />
          <h4>Manual Control</h4>

          <div className={styles.playground}>
            <Button
              disabled={!!infiniteToast}
              onClick={() => setInfiniteToast(toast('Hello, World!', Infinity))}
            >
              Show Toast
            </Button>
            <Button
              disabled={!infiniteToast}
              onClick={() => {
                infiniteToast?.close();
                setInfiniteToast(null);
              }}
            >
              Close Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast, { Toast } from 'react-simple-toasts';

export default function App() {
  const [infiniteToast, setInfiniteToast] = useState<Toast | null>(null);

  const handleShowClick = () => {
    const infiniteToast = toast('Hello, World!', { duration: Infinity });
    setInfiniteToast(infiniteToast);
  };

  const handleCloseClick = () => {
    infiniteToast?.close();
    setInfiniteToast(null);
  };

  return (
    <>
      <button
        disabled={infiniteToast}
        onClick={handleShowClick}
      >
        Show Toast
      </button>
      <button
        disabled={!infiniteToast} 
        onClick={handleCloseClick}
      >
        Close Toast
      </button>
    </>
  );
}`}</CommonHighlighter>
          </div>
        </div>

        <div id="updating-toast" className={styles.area}>
          <h3>Updating Toasts in Real-time</h3>

          <p className={styles.description}>
            The example below demonstrates how to dynamically update the content of a toast message
            in real-time. Here, a countdown timer is implemented to show the remaining lifetime of
            the toast. It's updated every 100 milliseconds until the toast is automatically closed
            after 5 seconds. The <code>update</code> function of the toast instance is used to
            accomplish this.
          </p>

          <div className={styles.playground}>
            <Button
              onClick={() => {
                const toastCreatedAt = Date.now();
                const updatableToast = toast('Toast will close in 5s', {
                  duration: 5000,
                  onClose: () => clearInterval(interval),
                });
                const interval = setInterval(() => {
                  const remainingTime = Math.max(0, 5000 - (Date.now() - toastCreatedAt));
                  updatableToast?.update(
                    `Toast will close in ${(remainingTime / 1000).toFixed(1)}s`,
                  );
                }, 100);
              }}
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  const handleClick = () => {
    const DURATION = 5000;
    const toastCreatedAt = Date.now();
    
    const myToast = toast('Toast will close in 5s', {
      duration: DURATION,
      onClose: () => clearInterval(interval),
    });

    const interval = setInterval(() => {
      const remainingTime = Math.max(0, DURATION - (Date.now() - toastCreatedAt));
      myToast.update(\`Toast will close in \${(remainingTime / 1000).toFixed(1)}s\`);
    }, 100);
  };

  return (
    <Button onClick={handleClick}>
      Show Toast
    </Button>
  );
}`}</CommonHighlighter>
          </div>
        </div>
      </section>

      <section id="custom-example">
        <h2>🎨 Custom Example</h2>
        <p>Want to get creative? Here's how you can customize our package:</p>
        <br />

        <div className={styles.area}>
          <h3>render</h3>
          <div className={styles.default}>
            default: <code>undefined</code>
          </div>
          <p className={styles.description}>
            The <code>render</code> prop allows you to fully customize the content of the toast. You
            can return a JSX or a React component to replace the default toast content. However,
            note that when this prop is used, only the base animation applies and all default styles
            are discarded.
          </p>
          <div className={styles.playground}>
            <Button
              onClick={() =>
                toast('Hello, World! 👋', {
                  render: (message) => <MyMessage>{message}</MyMessage>,
                })
              }
            >
              Show Toast
            </Button>
          </div>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast from 'react-simple-toasts';

export default function App() {
  const handleClick = () => {
    toast('Hello, World! 👋', {
      render: (message) => <MyMessage>{message}</MyMessage>,
    });
  };

  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
          <p className={styles.description}>
            The <code>render</code> option is typically used with <code>createToast</code> or{' '}
            <code>toastConfig</code> for creating more complex and customizable toast notifications.
          </p>
          <br />
          <h4>createToast</h4>
          <div className={styles.code}>
            <CommonHighlighter>{`import { createToast } from 'react-simple-toasts';

const myToast = createToast({
  className: 'my-toast',
  render: (message) => <MyMessage>{message}</MyMessage>,
});

export default function App() {
  return (
    <button onClick={() => myToast('Hello, World! 👋')}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
          <br />
          <h4>toastConfig</h4>
          <div className={styles.code}>
            <CommonHighlighter>{`import toast, { toastConfig } from 'react-simple-toasts';

toastConfig({
  className: 'my-toast',
  render: (message) => <MyMessage>{message}</MyMessage>,
});

export default function App() {
  return (
    <button onClick={() => toast('Hello, World! 👋')}>
      Show Toast
    </button>
  );
}`}</CommonHighlighter>
          </div>
          <p className={styles.description}>
            For the differences between <code>createToast</code> and <code>toastConfig</code>,
            please refer to the <Link to="/api#toast-config">API documentation</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Example;
