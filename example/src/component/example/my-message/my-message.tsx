import React from 'react';
import styles from './my-message.module.css';

interface Props {
  children: React.ReactNode;
}

function MyMessage({ children }: Props) {
  return <div className={styles.message}>{children}</div>;
}

export default MyMessage;
