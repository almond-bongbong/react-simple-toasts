import React, { ReactNode, useEffect, useRef } from 'react';
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
    children: [
      {
        name: 'toast',
        hash: '#toast',
      },
      {
        name: 'createToast, toastConfig',
        hash: '#toast-config',
      },
      {
        name: 'clearToasts',
        hash: '#clear-toasts',
      },
    ],
  },
  {
    name: 'Example',
    path: '/example',
    children: [
      {
        name: 'Simple Example',
        hash: '#simple-example',
      },
      {
        name: 'Advanced Example',
        hash: '#advanced-example',
      },
      {
        name: 'Custom Example',
        hash: '#custom-example',
      },
    ],
  },
  {
    name: 'Theme',
    path: '/theme',
    children: [
      {
        name: 'Introduction',
        hash: '#introduction',
      },
      {
        name: 'Built-in Themes',
        hash: '#built-in-themes',
      },
      {
        name: 'Setting a Theme',
        hash: '#setting-a-theme',
      },
      {
        name: 'Custom Theme',
        hash: '#custom-theme',
      },
      {
        name: 'Contributing Theme',
        hash: '#contributing-theme',
      },
    ],
  },
  {
    name: 'Change Log',
    path: '/change-log',
  },
];

function Layout({ children }: Props) {
  const location = useLocation();
  const isScrollingProgrammaticallyRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const positionY = target.getBoundingClientRect().top + scrollTop;
    const topOffset = 100;

    isScrollingProgrammaticallyRef.current = true;
    window.scrollTo({
      top: positionY - topOffset,
      behavior: 'smooth',
    });
  }, [location.hash]);

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
            <span>RST</span>
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
                    const isActive =
                      `${location.pathname}${location.hash}` === link;

                    return (
                      <li key={child.name}>
                        <NavLink
                          to={link}
                          className={() => (isActive ? 'active' : '')}
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
