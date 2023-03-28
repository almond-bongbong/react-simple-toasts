import React, {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './style.css';
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
  maxVisibleToasts?: number | null;
  render?: ((message: ReactNode) => ReactNode) | null;
  onClick?: ClickHandler;
}

export interface ConfigArgs
  extends Pick<
    ToastOptions,
    'time' | 'className' | 'clickClosable' | 'position' | 'maxVisibleToasts' | 'render'
  > {}

export interface ToastProps
  extends Pick<
    ToastOptions,
    'className' | 'clickable' | 'position' | 'render' | 'onClick'
  > {
  message: ReactNode;
  isExit?: boolean;
}

export interface Toast {
  close: () => void;
}

const SET_TIMEOUT_MAX = 2147483647;

let toastComponentList: {
  id: number;
  message: ReactNode;
  position: Position;
  component: ReactElement;
  isExit?: boolean;
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
  maxVisibleToasts: null,
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
  if (options.maxVisibleToasts) {
    defaultOptions.maxVisibleToasts = options.maxVisibleToasts;
  }
};

const renderDOM = () => {
  if (!isBrowser()) return;
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
      <div
        key={position}
        className={`${styles['toast-list']} ${styles[position]}`}
      >
        {toastsByPosition.map(t => <Fragment key={t.id}>
          {cloneElement(t.component, {
            isExit: t.isExit,
          })}
        </Fragment>)}
      </div>
    ),
  );

  reactRender(<>{toastListComponent}</>, toastContainer);
};

const Toast = ({
  message,
  className,
  clickable,
  position,
  isExit,
  render,
  onClick,
}: ToastProps): ReactElement => {
  const messageDOM = useRef<HTMLDivElement>(null);
  const [isEnter, setIsEnter] = useState(false);

  useLayoutEffect(() => {
    if (messageDOM.current && messageDOM.current.clientHeight) {
      const height = messageDOM.current.clientHeight;
      messageDOM.current.style.height = '0px';
      setTimeout(() => {
        if (messageDOM.current) messageDOM.current.style.height = `${height}px`;
        setIsEnter(true);
      }, 0);
    }
  }, []);

  useLayoutEffect(() => {
    if (isExit && position && position.indexOf('top') > -1) {
      if (messageDOM.current) messageDOM.current.style.height = '0px';
    }
  }, [isExit]);

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
    <div ref={messageDOM} className={`${styles['toast-message']} ${isEnter ? 'toast-enter-active' : ''} ${isExit ? 'toast-exit-active' : ''} ${className}`}>
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

function closeToast(id: number) {
  const index = toastComponentList.findIndex(t => t.id === id);
  toastComponentList[index].isExit = true;
  renderDOM();

  setTimeout(() => {
    toastComponentList = toastComponentList.filter(t => t.id !== id);
    renderDOM();
  }, 300);
}

function toast(message: ReactNode, time?: number): Toast;
function toast(message: ReactNode, options?: ToastOptions): Toast;
function toast(message: ReactNode, timeOrOptions?: number | ToastOptions): Toast {
  const dummyReturn = { close: () => {} };
  if (!isBrowser()) return dummyReturn;

  let closeTimer: number;
  const id = Date.now();
  const {
    time = defaultOptions.time,
    clickable = false,
    clickClosable = defaultOptions.clickClosable,
    className = defaultOptions.className,
    position = defaultOptions.position,
    maxVisibleToasts = defaultOptions.maxVisibleToasts,
    render = defaultOptions.render,
    onClick = undefined,
  } =
    typeof timeOrOptions === 'number'
      ? { time: timeOrOptions }
      : timeOrOptions || {};

  if (!isValidPosition(position)) {
    return dummyReturn;
  }

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
  const visibleToastOffset = maxVisibleToasts && toastComponentList.length - maxVisibleToasts;
  if (visibleToastOffset) toastComponentList.slice(visibleToastOffset);

  if (maxVisibleToasts) {
    const toastsToRemove = toastComponentList.length - maxVisibleToasts;
    for (let i = 0; i < toastsToRemove; i++) {
      closeToast(toastComponentList[i].id);
    }
  }

  renderDOM();

  if (time <= SET_TIMEOUT_MAX) {
    closeTimer = window.setTimeout(() => {
      closeToast(id);
    }, time);
  }

  return {
    close: () => closeToast(id),
  };
}

export default toast;
