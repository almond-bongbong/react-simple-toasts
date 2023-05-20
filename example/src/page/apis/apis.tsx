import React from 'react';
import styles from './apis.module.css';

function Apis() {
  return (
    <div className={styles.apis}>
      <section>
        <h2>📖 API Reference</h2>
        <p>The following are the APIs provided by React Simple Toasts:</p>
      </section>

      <section id="toast">
        <h3>toast(message, durationOrOptions)</h3>
        <p>Displays a toast notification with the given message and duration.</p>
        <ul>
          <li><b>message:</b> The message to be displayed. Can be any valid React Node.</li>
          <li><b>durationOrOptions:</b> Either a duration for the toast in milliseconds, or a ToastOptions object to further customize the toast.</li>
        </ul>
      </section>

      <section id="createToast">
        <h3>createToast(options)</h3>
        <p>Creates a new toast function with the provided options.</p>
        <ul>
          <li><b>options:</b> An object with the same options available in ToastOptions, minus the 'time' field.</li>
        </ul>
      </section>

      <section id="clearToasts">
        <h3>clearToasts()</h3>
        <p>Clears all currently displayed toasts.</p>
      </section>

      <section id="toastConfig">
        <h3>toastConfig(options)</h3>
        <p>Sets global configuration options for all toasts.</p>
        <ul>
          <li><b>options:</b> An object specifying the global options to be used for all toasts. See ToastOptions for more details.</li>
        </ul>
      </section>
    </div>
  );
}

export default Apis;
