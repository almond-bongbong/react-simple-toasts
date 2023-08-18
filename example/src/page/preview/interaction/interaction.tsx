import React from 'react';
import { createToast } from 'react-simple-toasts';
import Button from '../../../component/button';
import styles from './interaction.module.css';

const myToast = createToast({
  theme: 'dark',
  offsetY: 400,
});

function Interaction() {
  return (
    <div className={styles.container}>
      <Button
        type="button"
        className={styles.button}
        onClick={() => myToast('Your toast is ready! 🍞')}
      >
        Show Toast
      </Button>
    </div>
  );
}

export default Interaction;
