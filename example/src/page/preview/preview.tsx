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
      <div className={styles.section}>section3</div>
      <div className={styles.section}>section4</div>
    </div>
  );
}

export default Preview;
