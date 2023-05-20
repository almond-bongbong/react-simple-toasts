import React from 'react';
import styles from './home.module.css';
import toast from 'react-simple-toasts';
import Button from '../../component/button';

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.section}>
        <h2>🔍 Overview</h2>
        <p>
          React Simple Toasts is a lightweight, easy-to-use library for creating
          toast notifications in your React applications.
        </p>
        <br />
        <Button onClick={() => toast('Hello, World')}>
          🍞 Try a Toast!
        </Button>
      </section>

      <section className={styles.section}>
        <h2>🔑 Key Features</h2>
        <ul className={styles.features}>
          <li>
            <b>Ease of use</b>: With a simple installation process and an
            intuitive API, you can get started with the library in no time.
          </li>
          <li>
            <b>Highly customizable</b>: You can control various aspects of your
            toast messages, from their appearance and duration to their behavior
            upon user interaction.
          </li>
          <li>
            <b>Custom rendering</b>: The library supports custom rendering,
            allowing you to tailor the look of your toast messages to match your
            application's branding.
          </li>
          <li>
            <b>Positioning</b>: The library allows you to position your toasts
            at any corner or center of the viewport, offering a high level of
            control over where your messages appear.
          </li>
          <li>
            <b>Browser compatibility</b>: The library includes utility functions
            to ensure that it works seamlessly across different browsers.
          </li>
          <li>
            <b>Interactive</b>: The library allows toasts to be clickable and to
            close on click if desired, enabling user interaction.
          </li>
          <li>
            <b>Multiple toasts management</b>: It provides functionality to
            manage multiple toasts by controlling the maximum number of visible
            toasts at a time.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>💖 Support Us</h2>
        <p>
          If you find this library useful, consider giving us a star on{' '}
          <a
            href="https://github.com/almond-bongbong/react-simple-toasts/stargazers"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          ! Your support is greatly appreciated and it helps the project grow.
        </p>
      </section>

      <section className={styles.section}>
        <h2>⚖️ License</h2>
        <p>This project is licensed under the terms of the MIT license.</p>
      </section>
    </div>
  );
}

export default Home;
