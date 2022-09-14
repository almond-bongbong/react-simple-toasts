import React, {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useRef,
} from 'react';
import styles from './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addRootElement, createElement } from './lib/generateElement';
import { isBrowser } from './lib/environment';
import { render as reactRender } from './lib/react-render';

type ClickHandler = (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;

export interface ToastOptions {
  time?: number;
  className?: string;
  clickable?: boolean;
  clickClosable?: boolean;
  render?: ((message: string) => ReactNode) | null;
  onClick?: ClickHandler;
}

export interface ConfigArgs
  extends Pick<
    ToastOptions,
    'time' | 'clickClosable' | 'className' | 'render'
  > {
  position?: 'left' | 'center' | 'right';
}

export interface ToastProps
  extends Pick<ToastOptions, 'className' | 'clickable' | 'render' | 'onClick'> {
  message: string;
}

const SET_TIMEOUT_MAX = 2147483647;

let toastComponentList: {
  id: number;
  message: string;
  component: ReactNode;
}[] = [];

const init = () => {
  const toastContainer =
    isBrowser() && document.getElementById(styles['toast_container']);
  if (isBrowser() && !toastContainer) {
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
  clickClosable: false,
  render: null,
};

export const toastConfig = (options: ConfigArgs) => {
  if (options.time) defaultOptions.time = options.time;
  if (options.className) defaultOptions.className = options.className;
  if (options.position) defaultOptions.position = options.position;
  if (options.clickClosable)
    defaultOptions.clickClosable = options.clickClosable;
  if (options.render) defaultOptions.render = options.render;
};

const renderDOM = () => {
  const toastContainer = document.getElementById(styles['toast_container']);
  if (!toastContainer) return;

  reactRender(
    <TransitionGroup
      appear
      className={`${styles['toast-list']} ${styles['center']}`}
    >
      {toastComponentList.map(t => (
        <CSSTransition key={t.id} timeout={300} classNames="toast">
          {t.component}
        </CSSTransition>
      ))}
    </TransitionGroup>,
    toastContainer,
  );
};

const Toast = ({
  message,
  className,
  clickable,
  render,
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
  ]
    .filter(Boolean)
    .join(' ');

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div ref={messageDOM} className={`${styles['toast-message']} ${className}`}>
      {render ? (
        render(message)
      ) : (
        <div className={contentClassNames} {...(clickable && clickableProps)}>
          {message}
        </div>
      )}
    </div>
  );
};

const closeToast = (id: number) => {
  const index = toastComponentList.findIndex(t => t.id === id);
  toastComponentList.splice(index, 1);
  renderDOM();
};

function toast(message: string, time?: number): void;
function toast(message: string, options?: ToastOptions): void;
function toast(message: string, timeOrOptions?: number | ToastOptions): void {
  let closeTimer: number;
  const id = Date.now();
  const {
    time = defaultOptions.time,
    clickable = false,
    clickClosable = defaultOptions.clickClosable,
    className = defaultOptions.className,
    render = defaultOptions.render,
    onClick = undefined,
  } =
    typeof timeOrOptions === 'number'
      ? { time: timeOrOptions }
      : timeOrOptions || {};

  init();

  const handleClick: ClickHandler = (...args) => {
    if (clickClosable) {
      if (closeTimer) {
        clearTimeout(closeTimer);
      }
      closeToast(id);
    }
    if (onClick) onClick(...args);
  };

  toastComponentList.push({
    id,
    message,
    component: (
      <Toast
        message={message}
        className={className}
        clickable={clickable || clickClosable}
        render={render}
        onClick={handleClick}
      />
    ),
  });

  renderDOM();

  if (time <= SET_TIMEOUT_MAX) {
    closeTimer = window.setTimeout(() => {
      closeToast(id);
    }, time);
  }
}

export default toast;
