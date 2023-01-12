import React, { ReactElement, ReactNode, SyntheticEvent, useLayoutEffect, useRef } from 'react';
import styles from './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addRootElement, createElement } from './lib/generateElement';
import { render as reactRender } from './lib/react-render';

const isBrowser = () => typeof window !== 'undefined';

export const ToastPosition = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
} as const;

type ClickHandler = (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;
type Position = typeof ToastPosition[keyof typeof ToastPosition];

export interface ToastOptions {
  time?: number;
  className?: string;
  clickable?: boolean;
  clickClosable?: boolean;
  position?: Position;
  render?: ((message: string) => ReactNode) | null;
  onClick?: ClickHandler;
}

export interface ConfigArgs
  extends Pick<
    ToastOptions,
    'time' | 'clickClosable' | 'className' | 'position' | 'render'
  > {}

export interface ToastProps
  extends Pick<
    ToastOptions,
    'className' | 'clickable' | 'position' | 'render' | 'onClick'
  > {
  message: string;
}

const SET_TIMEOUT_MAX = 2147483647;

let toastComponentList: {
  id: number;
  message: string;
  position: Position;
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
  position: 'bottom-center',
  clickClosable: false,
  render: null,
};

const isValidPosition = (position: Position): boolean => {
  const positionList = Object.values(ToastPosition);
  if (!positionList.includes(position)) {
    throw new Error(
      `Invalid position value. Expected one of ${Object.values(
        ToastPosition,
      ).join(', ')} but got ${position}`,
    );
  }

  return true;
};

export const toastConfig = (options: ConfigArgs) => {
  if (options.time) {
    defaultOptions.time = options.time;
  }
  if (options.className) {
    defaultOptions.className = options.className;
  }
  if (options.position && isValidPosition(options.position)) {
    defaultOptions.position = options.position;
  }
  if (options.clickClosable) {
    defaultOptions.clickClosable = options.clickClosable;
  }
  if (options.render) {
    defaultOptions.render = options.render;
  }
};

const renderDOM = () => {
  const toastContainer = document.getElementById(styles['toast_container']);
  if (!toastContainer) return;

  const defaultToastList = Object.values(ToastPosition).reduce(
    (acc, position) => ({
      ...acc,
      [position]: [],
    }),
    {},
  );
  const toastListByPosition = toastComponentList.reduce<
    Record<string, typeof toastComponentList>
  >((acc, toast) => {
    acc[toast.position].push(toast);
    return acc;
  }, defaultToastList);

  const toastListComponent = Object.entries(toastListByPosition).map(
    ([position, toastsByPosition]) => (
      <TransitionGroup
        key={position}
        appear
        className={`${styles['toast-list']} ${styles[position]}`}
      >
        {toastsByPosition.map(t => (
          <CSSTransition
            key={t.id}
            timeout={300}
            classNames="toast"
            {...(position.includes('top') && {
              onExit: element => (element.style.height = '0px'),
            })}
          >
            {t.component}
          </CSSTransition>
        ))}
      </TransitionGroup>
    ),
  );

  reactRender(<>{toastListComponent}</>, toastContainer);
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
    position = defaultOptions.position,
    render = defaultOptions.render,
    onClick = undefined,
  } =
    typeof timeOrOptions === 'number'
      ? { time: timeOrOptions }
      : timeOrOptions || {};

  if (!isValidPosition(position)) return;

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
    position,
    component: (
      <Toast
        message={message}
        className={className}
        clickable={clickable || clickClosable}
        position={position}
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
