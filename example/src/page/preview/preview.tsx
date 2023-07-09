import React from 'react';
import styles from './preview.module.css';

function Preview() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=dark" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=light" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=frosted-glass" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=plain" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=success" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=info" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=warning" />
      </div>
      <div className={styles.section}>
        <iframe src="/preview/section?theme=failure" />
      </div>
      <div className={styles.section} />
    </div>
  );
}

export default Preview;
