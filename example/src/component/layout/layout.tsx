import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import logo from '../../assets/images/common/logo.png';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
            <span>React Simple Toasts</span>
          </Link>
        </h1>
      </header>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/getting-started">Getting Started</Link>
          </li>
        </ul>
      </nav>
      <article className={styles.content}>{children}</article>
      <footer className={styles.footer}>footer</footer>
    </>
  );
}

export default Layout;
