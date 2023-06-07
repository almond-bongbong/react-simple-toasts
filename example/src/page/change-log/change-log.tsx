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

      <section>
        <h3>4.0.0</h3>
        <div className={styles.date}>
          {dayjs(1686100642000).format('YYYY.MM.DD')}
        </div>

        <h4 className={styles.sub_title}>New Features</h4>
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
