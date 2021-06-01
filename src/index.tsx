import React, { ReactElement, SyntheticEvent, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addRootElement, createElement } from './lib/generateElement';

export interface ToastOptions {
  time?: number;
  className?: string;
  clickable?: boolean;
  onClick?: (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;
}

export interface ConfigArgs extends Pick<ToastOptions, 'time' | 'className'> {
  position?: 'left' | 'center' | 'right';
}

export interface ToastProps extends Pick<ToastOptions, 'className' | 'clickable' | 'onClick'> {
  message: string;
}

let toastComponentList: any[] = [];
const init = () => {
  const toastContainer = document.getElementById(styles['toast_container']);
  if (!toastContainer) {
    addRootElement(createElement(styles['toast_container']));
  }
  if (!toastComponentList || !Array.isArray(toastComponentList)) {
    toastComponentList = [];
  }
};

const defaultOptions: Required<ConfigArgs> = {
  time: 3000,
  className: '',
  position: 'center',
};

export const toastConfig = (options: ConfigArgs) => {
  if (options.time) defaultOptions.time = options.time;
  if (options.className) defaultOptions.className = options.className;
  if (options.position) defaultOptions.position = options.position;
};

const renderDOM = () => {
  const container = document.getElementById(styles['toast_container']);
  const position = defaultOptions.position || 'center';

  ReactDOM.render(
    <div className={`${styles['toast-list']} ${styles[position]}`}>
      <TransitionGroup classnames="list">
        {toastComponentList.map(t => (
          <CSSTransition key={t.id} timeout={300} classNames="toast">
            {t.component}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>,
    container,
  );
};

const Toast = ({
  message,
  className,
  clickable,
  onClick,
 }: ToastProps): ReactElement => {
  const messageDOM: any = useRef();

  useLayoutEffect(() => {
    if (messageDOM.current && messageDOM.current.clientHeight) {
      const height = messageDOM.current.clientHeight;
      messageDOM.current.style.height = '0px';
      setTimeout(() => {
        messageDOM.current.style.height = `${height}px`;
      }, 0);
    }
  }, [messageDOM.current]);

  const contentClassNames = [
    styles['toast-content'],
    clickable ? styles['clickable'] : '',
  ].filter(Boolean).join(' ');

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div ref={messageDOM} className={`${styles['toast-message']} ${className}`}>
      <div
        className={contentClassNames}
        {...clickable && clickableProps}
      >
        {message}
      </div>
    </div>
  );
};

function toast(message: string, time?: number): void;
function toast(message: string, options?: ToastOptions): void;
function toast(message: string, timeOrOptions?: number | ToastOptions): void {
  const {
    time = defaultOptions.time,
    clickable = false,
    className = defaultOptions.className,
    onClick = undefined,
  } = typeof timeOrOptions === 'number' ? { time: timeOrOptions } : (timeOrOptions || {});

  init();
  renderDOM();

  const id = Date.now();
  toastComponentList.push({
    id,
    component: (
      <Toast
        message={message}
        className={className}
        clickable={clickable}
        onClick={onClick}
      />
    ),
  });

  renderDOM();
  setTimeout(() => {
    const index = toastComponentList.findIndex(t => t.id === id);
    toastComponentList.splice(index, 1);
    renderDOM();
  }, time);
}

export default toast;
