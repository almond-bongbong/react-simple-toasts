import React, {
  cloneElement,
  Fragment,
  ReactNode,
  SyntheticEvent,
} from 'react';
import styles from './style.css';
import { addRootElement, createElement } from './lib/generateElement';
import { render as reactRender } from './lib/react-render';
import { createId, isBrowser } from './lib/utils';
import { SET_TIMEOUT_MAX, ToastPosition as Position } from './lib/constants';
import {
  ConfigArgs,
  Theme,
  Toast,
  ToastClickHandler,
  ToastComponent,
  ToastEnterEvent,
  ToastOptions,
  ToastPosition,
} from './type/common';
import ToastMessage from './component/toast-message';

let toastComponentList: ToastComponent[] = [];

export interface ToastProps
  extends Pick<
    ToastOptions,
    | 'className'
    | 'clickable'
    | 'position'
    | 'isReversedOrder'
    | 'render'
    | 'onClick'
  > {
  message: ReactNode;
  isExit?: boolean;
}

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
  duration: 3000,
  className: '',
  position: 'bottom-center',
  clickClosable: false,
  render: null,
  maxVisibleToasts: null,
  isReversedOrder: false,
  theme: null,
  zIndex: null,
};

const isValidPosition = (position: ToastPosition): boolean => {
  const positionList = Object.values(Position);
  if (!positionList.includes(position)) {
    throw new Error(
      `Invalid position value. Expected one of ${positionList.join(
        ', ',
      )} but got ${position}`,
    );
  }

  return true;
};

export const toastConfig = (options: ConfigArgs) => {
  if (!isBrowser()) return;

  if (options.theme) {
    defaultOptions.theme = options.theme;
  }
  if (options.duration) {
    defaultOptions.duration = options.duration;
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
  if (options.zIndex) {
    defaultOptions.zIndex = options.zIndex;
  }
  if (options.isReversedOrder) {
    defaultOptions.isReversedOrder = options.isReversedOrder;
  }
};

function ToastContainer() {
  const handleToastEnter = (t: ToastComponent, e: { height: number }) => {
    toastComponentList.forEach((toast) => {
      if (toast.id !== t.id) return;
      toast.startCloseTimer();
      toast.height = e.height;
    });

    renderDOM();
  };

  return (
    <>
      {toastComponentList.map((t) => {
        const bottomToasts = [];
        const cloneToastComponentList = [...toastComponentList];

        if (t.position.includes('top')) cloneToastComponentList.reverse();

        for (let i = cloneToastComponentList.length - 1; i >= 0; i--) {
          const toast = cloneToastComponentList[i];
          if (toast.id === t.id) break;
          if (toast.position === t.position && !toast.isExit) {
            bottomToasts.push({ id: toast.id, height: toast.height });
          }
        }

        const bottomToastsHeight = bottomToasts.reduce((acc, toast) => {
          const MARGIN = 10;
          return acc + (toast.height ?? 0) + MARGIN;
        }, 0);

        const offsetX =
          t.position.includes('left') || t.position.includes('right')
            ? '0%'
            : '-50%';
        const offsetYAlpha = t.position.includes('top') ? 1 : -1;
        const baseOffsetY = bottomToastsHeight * offsetYAlpha;
        const offsetY =
          t.position === 'center'
            ? `calc(-50% - ${baseOffsetY * -1}px)`
            : `${baseOffsetY}px`;

        return (
          <Fragment key={t.id}>
            {cloneElement(t.component, {
              isExit: t.isExit,
              offsetX,
              offsetY,
              _onEnter: (event: ToastEnterEvent) => handleToastEnter(t, event),
            })}
          </Fragment>
        );
      })}
    </>
  );
}

const renderDOM = () => {
  if (!isBrowser()) return;
  const toastContainer = document.getElementById(styles['toast_container']);
  if (!toastContainer) return;

  reactRender(<ToastContainer />, toastContainer);
};

export const clearToasts = () => {
  toastComponentList.forEach((toast) => (toast.isExit = true));
  renderDOM();
};

function closeToast(
  id: number,
  options: Pick<ToastOptions, 'onClose' | 'onCloseStart'>,
) {
  const index = toastComponentList.findIndex((t) => t.id === id);
  if (toastComponentList[index]) {
    toastComponentList[index].isExit = true;
  }
  options.onCloseStart?.();
  renderDOM();

  setTimeout(() => {
    toastComponentList = toastComponentList.filter((t) => t.id !== id);
    options.onClose?.();
    renderDOM();
  }, 300);
}

function renderToast(
  message: ReactNode,
  options?: ToastOptions & { toastInstanceId?: number },
): Toast {
  const dummyReturn = {
    close: () => null,
    updateDuration: () => null,
    update: () => null,
  };
  if (!isBrowser()) return dummyReturn;

  let closeTimer: number;
  const id = createId();
  const {
    duration,
    clickable = false,
    clickClosable = defaultOptions.clickClosable,
    className = defaultOptions.className,
    position = defaultOptions.position,
    maxVisibleToasts = defaultOptions.maxVisibleToasts,
    isReversedOrder = defaultOptions.isReversedOrder,
    render = defaultOptions.render,
    theme = defaultOptions.theme,
    zIndex = defaultOptions.zIndex,
    onClick = undefined,
    onClose = undefined,
    onCloseStart = undefined,
  } = options || {};
  const durationTime = duration || defaultOptions.duration;
  const closeOptions = { onClose, onCloseStart };

  if (!isValidPosition(position)) {
    return dummyReturn;
  }

  init();

  const handleClick: ToastClickHandler = (
    e: SyntheticEvent<HTMLDivElement>,
  ) => {
    if (clickClosable) {
      if (closeTimer) {
        clearTimeout(closeTimer);
      }
      closeToast(id, closeOptions);
    }
    onClick?.(e);
  };

  const startCloseTimer = (duration = durationTime, callback?: () => void) => {
    if (duration > SET_TIMEOUT_MAX) return;
    if (closeTimer) {
      clearTimeout(closeTimer);
    }
    closeTimer = window.setTimeout(() => {
      closeToast(id, {
        ...closeOptions,
        onCloseStart: () => {
          callback?.();
          closeOptions.onClose?.();
        },
      });
    }, duration);
  };

  const newToastComponent = {
    id,
    message,
    position,
    startCloseTimer,
    component: (
      <ToastMessage
        id={id}
        message={message}
        className={className}
        clickable={clickable || clickClosable}
        position={position}
        isReversedOrder={isReversedOrder}
        render={render}
        theme={theme}
        zIndex={zIndex || undefined}
        onClick={handleClick}
      />
    ),
  };
  if (isReversedOrder) toastComponentList.unshift(newToastComponent);
  else toastComponentList.push(newToastComponent);

  if (maxVisibleToasts) {
    const toastsToRemove = toastComponentList.length - maxVisibleToasts;
    for (let i = 0; i < toastsToRemove; i++) {
      closeToast(toastComponentList[i].id, closeOptions);
    }
  }

  renderDOM();

  return {
    close: () => closeToast(id, closeOptions),
    updateDuration: (newDuration = durationTime) => {
      startCloseTimer(newDuration);
    },
    update: (newMessage: ReactNode, newDuration?: number) => {
      const index = toastComponentList.findIndex((t) => t.id === id);
      if (toastComponentList[index]) {
        toastComponentList[index].message = newMessage;
        toastComponentList[index].component = (
          <ToastMessage
            id={id}
            message={newMessage}
            className={className}
            clickable={clickable || clickClosable}
            position={position}
            isReversedOrder={isReversedOrder}
            render={render}
            theme={theme}
            onClick={handleClick}
          />
        );
      }
      renderDOM();

      if (newDuration) {
        startCloseTimer(newDuration);
      }
    },
  };
}

function toast(message: ReactNode, duration?: number): Toast;
function toast(message: ReactNode, options?: ToastOptions): Toast;
function toast(
  message: ReactNode,
  durationOrOptions?: number | ToastOptions,
): Toast {
  const options =
    typeof durationOrOptions === 'number'
      ? { duration: durationOrOptions }
      : durationOrOptions;
  return renderToast(message, options);
}

export const createToast = (options: ConfigArgs): typeof toast => {
  const toastInstanceId = createId();

  return (message, durationOrOptions) => {
    if (typeof durationOrOptions === 'number') {
      return renderToast(message, {
        toastInstanceId,
        duration: durationOrOptions || options.duration,
      });
    }
    if (
      durationOrOptions === undefined ||
      typeof durationOrOptions === 'object'
    ) {
      const mergedOptions = {
        toastInstanceId,
        ...options,
        ...durationOrOptions,
      };
      return renderToast(message, mergedOptions);
    }

    throw new Error('Invalid durationOrOptions type');
  };
};

export default toast;

export type {
  ToastPosition,
  Theme,
  ToastClickHandler,
  ToastOptions,
  ConfigArgs,
  Toast,
  ToastComponent,
};
