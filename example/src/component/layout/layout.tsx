import React, { ReactNode, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import githubIcon from '../../assets/images/common/github-icon.png';
import { AtLeast } from '../../type/utils';
import styles from './layout.module.css';

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
        name: 'Toast',
        hash: '#toast',
      },
      {
        name: 'Toast Config',
        hash: '#toast-config',
      },
      {
        name: 'Clearing Toasts',
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
        children: [
          {
            name: 'Basic Usage',
            hash: '#basic-usage',
          },
          {
            name: 'Duration',
            hash: '#duration',
          },
          {
            name: 'Theme',
            hash: '#theme',
          },
          {
            name: 'Class Name',
            hash: '#class-name',
          },
          {
            name: 'Clickable',
            hash: '#clickable',
          },
          {
            name: 'Click Closable',
            hash: '#click-closable',
          },
          {
            name: 'Position',
            hash: '#position',
          },
          {
            name: 'Max Visible',
            hash: '#max-visible',
          },
          {
            name: 'Loading',
            hash: '#loading',
          },
        ],
      },
      {
        name: 'Advanced Example',
        hash: '#advanced-example',
        children: [
          {
            name: 'Promise Based Loading',
            hash: '#Promise-based-loading',
          },
          {
            name: 'Infinity Duration',
            hash: '#infinity-duration',
          },
          {
            name: 'Updating Toast',
            hash: '#updating-toast',
          },
        ],
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
    const topOffset = 80;

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
                    const link = child.path ? child.path : `${menu.path}${child.hash}`;
                    const isActive = `${location.pathname}${location.hash}` === link;

                    return (
                      <li key={child.name}>
                        <NavLink to={link} className={() => (isActive ? 'active' : '')}>
                          {child.name}
                        </NavLink>

                        {child.children && (
                          <ul>
                            {child.children.map((grandChild) => {
                              const link = `${menu.path}${grandChild.hash}`;
                              const isActive = `${location.pathname}${location.hash}` === link;

                              return (
                                <li key={grandChild.name}>
                                  <NavLink to={link} className={() => (isActive ? 'active' : '')}>
                                    {grandChild.name}
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        )}
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
