import React from 'react';
import styles from './change-log.module.css';
import dayjs from 'dayjs';

function ChangeLog() {
  return (
    <div>
      <section id="introduction">
        <h2>📚 Introduction</h2>
        <p>
          This page provides information about the changes and updates made in
          each version of react-simple-toasts. Please refer to this page for the
          details of new features, improvements, and bug fixes in each version.
        </p>
      </section>

      <section className={styles.new}>
        <h3>5.0.0</h3>
        <div className={styles.date}>
          {dayjs(1686444450563).format('YYYY.MM.DD')}
        </div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>zIndex Options:</strong> We have added zIndex options. You can now set the css z-index property for individual toast messages or for the entire message.
          </li>
        </ul>

        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>HTML Structure of Toast Messages:</strong> We have improved and refactored the HTML structure of the toast messages. This was done for improved scalability with continuous updates.
          </li>
          <li>
            <strong>Animation Simplification:</strong> We have streamlined the overall animations. Particularly, the animation for toast messages appearing from the top has been improved to be more UX-friendly.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>4.0.0</h3>
        <div className={styles.date}>
          {dayjs(1686100642000).format('YYYY.MM.DD')}
        </div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Theme Support:</strong> react-simple-toasts now supports
            theming. You can use built-in themes ('dark' and 'light') or create
            your own custom themes using CSS.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ChangeLog;
