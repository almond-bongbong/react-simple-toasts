import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={[styles.button, props.className].join(' ')} />
  );
}

export default Button;
