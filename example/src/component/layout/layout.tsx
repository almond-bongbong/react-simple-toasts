import React, { ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './layout.module.css';
import logo from '../../assets/images/common/logo.png';
import githubIcon from '../../assets/images/common/github-icon.png';
import { AtLeast } from '../../type/utils';

interface Props {
  children: ReactNode;
}

interface Menu {
  name: string;
  path: string;
  hash?: string;
  children?: AtLeast<Menu, 'name'>[];
}

const MENU: Menu[] = [
  {
    name: 'Getting Started',
    path: '/getting-started',
    children: [
      {
        name: 'Installation',
        hash: '#installation',
      },
      {
        name: 'Usage',
        hash: '#usage',
      },
    ],
  },
  {
    name: 'API',
    path: '/api',
  },
  {
    name: 'Components',
    path: '/components',
  },
  {
    name: 'Example',
    path: '/example',
  },
];

function Layout({ children }: Props) {
  const location = useLocation();

  const handleHash = (hash: string) => () => {
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (!target) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const positionY = target.getBoundingClientRect().top + scrollTop;
      const topOffset = 120;

      window.scrollTo({
        top: positionY - topOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
            <span>React Simple Toasts</span>
          </Link>
        </h1>
        <div className={styles.meta}>
          <a
            className={styles.github}
            href="https://github.com/almond-bongbong/react-simple-toasts"
            target="_blank"
          >
            <img src={githubIcon} alt="github icon" />
          </a>
        </div>
      </header>
      <nav className={styles.navigation}>
        <ul>
          {MENU.map((menu) => (
            <li key={menu.name}>
              <NavLink to={menu.path}>{menu.name}</NavLink>
              {menu.children && (
                <ul>
                  {menu.children.map((child) => {
                    const link = child.path
                      ? child.path
                      : `${menu.path}${child.hash}`;

                    return (
                      <li key={child.name}>
                        <NavLink
                          to={link}
                          className={() =>
                            `${location.pathname}${location.hash}` === link
                              ? 'active'
                              : ''
                          }
                          onClick={
                            child.hash ? handleHash(child.hash) : undefined
                          }
                        >
                          {child.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <main className={styles.container}>
        <article className={styles.content}>{children}</article>
        <footer className={styles.footer}>&copy; 2023. MIT License.</footer>
      </main>
    </>
  );
}

export default Layout;
