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
        <p>Displays a toast notification with the given message and options.</p>
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
                Either the duration for the toast (in milliseconds) or an object
                containing options for the toast.
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>duration</td>
              <td>number</td>
              <td>
                The duration (in milliseconds) for which the toast message will
                be displayed. Default is `3000`.
              </td>
            </tr>
            {/* Add other properties similarly */}
          </tbody>
        </table>
      </section>

      <section id="createToast">
        <h3>createToast(options)</h3>
        <p>Creates a new toast function with the provided options.</p>
        <ul>
          <li>
            <b>options:</b> An object with the same options available in
            ToastOptions, minus the 'time' field.
          </li>
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
          <li>
            <b>options:</b> An object specifying the global options to be used
            for all toasts. See ToastOptions for more details.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Apis;
