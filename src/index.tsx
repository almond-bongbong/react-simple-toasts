import React, { ReactNode, SyntheticEvent } from 'react';
import { addRootElement, createElement } from './lib/generateElement';
import { render as reactRender } from './lib/react-render';
import { createId, isBrowser } from './lib/utils';
import { SET_TIMEOUT_MAX, Themes, ToastPosition as Position } from './lib/constants';
import {
  Theme,
  Toast,
  ToastClickHandler,
  ToastComponent,
  ToastOptions,
  ToastPosition,
  ToastUpdateArgs,
  ToastUpdateOptions,
} from './type/common';
import ToastMessage from './component/toast-message';
import { isToastUpdateOptions } from './lib/type-guard';
import ToastContainer from './component/toast-container';

let toastComponentList: ToastComponent[] = [];

const init = () => {
  const toastContainer = isBrowser() && document.getElementById('#toast__container');
  if (isBrowser() && !toastContainer) {
    addRootElement(createElement('#toast__container'));
  }
  if (!toastComponentList || !Array.isArray(toastComponentList)) {
    toastComponentList = [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const defaultOptions: Required<ToastOptions> = {
  duration: 3000,
  className: '',
  position: 'bottom-center',
  offsetX: 30,
  offsetY: 30,
  gap: 10,
  clickClosable: false,
  render: null,
  maxVisibleToasts: null,
  isReversedOrder: false,
  theme: null,
  loadingText: 'loading',
  zIndex: 1000,
  clickable: false,
  onClick: noop,
  onClose: noop,
  onCloseStart: noop,
  loading: false,
};

const isValidPosition = (position: ToastPosition): boolean => {
  const positionList = Object.values(Position);
  if (!positionList.includes(position)) {
    throw new Error(
      `Invalid position value. Expected one of ${positionList.join(', ')} but got ${position}`,
    );
  }

  return true;
};

const validateOptions = (options: ToastOptions) => {
  options.position && isValidPosition(options.position);
};

export const toastConfig = (options: ToastOptions) => {
  if (!isBrowser()) return;

  validateOptions(options);

  Object.assign(defaultOptions, options);
};

const renderDOM = () => {
  if (!isBrowser()) return;
  const toastContainer = document.getElementById('#toast__container');
  if (!toastContainer) return;

  reactRender(
    <ToastContainer toastComponentList={toastComponentList} onToastEnter={renderDOM} />,
    toastContainer,
  );
};

export const clearToasts = () => {
  toastComponentList.forEach((toast) => (toast.isExit = true));
  renderDOM();
};

function closeToast(id: number) {
  const index = toastComponentList.findIndex((t) => t.id === id);
  if (toastComponentList[index]) {
    toastComponentList[index].isExit = true;
  }
  renderDOM();
}

function renderToast(message: ReactNode, _options?: ToastOptions): Toast {
  const dummyReturn = {
    close: () => null,
    updateDuration: () => null,
    update: () => null,
  };
  if (!isBrowser()) return dummyReturn;

  let closeTimer: number;
  const id = createId();

  const options = {
    ...defaultOptions,
    ..._options,
  };

  const {
    loading,
    loadingText,
    onClose,
    onCloseStart,
    clickClosable,
    position,
    onClick,
    gap,
    theme,
    duration,
    isReversedOrder,
    maxVisibleToasts,
  } = options || {};

  const durationTime = duration === undefined ? defaultOptions.duration : duration;

  if (!isValidPosition(position)) {
    return dummyReturn;
  }

  init();

  const handleClick: ToastClickHandler = (e: SyntheticEvent<HTMLDivElement>) => {
    if (clickClosable) {
      if (closeTimer) {
        clearTimeout(closeTimer);
      }
      closeToast(id);
    }
    onClick?.(e);
  };

  const handleClose = () => {
    toastComponentList = toastComponentList.filter((t) => t.id !== id);
    renderDOM();
    onClose?.();
  };

  const startCloseTimer = (duration = options.duration) => {
    if (duration === null || duration === 0 || duration > SET_TIMEOUT_MAX) return;
    if (closeTimer) {
      clearTimeout(closeTimer);
    }
    closeTimer = window.setTimeout(() => {
      closeToast(id);
    }, duration);
  };

  const newToastComponent = {
    id,
    message,
    position,
    startCloseTimer,
    gap,
    component: (
      <ToastMessage
        {...options}
        id={id}
        message={message}
        onClick={handleClick}
        onClose={handleClose}
        onCloseStart={onCloseStart}
      />
    ),
  };
  if (isReversedOrder) toastComponentList.unshift(newToastComponent);
  else toastComponentList.push(newToastComponent);

  if (maxVisibleToasts) {
    const toastsToRemove = toastComponentList.length - maxVisibleToasts;
    for (let i = 0; i < toastsToRemove; i++) {
      closeToast(toastComponentList[i].id);
    }
  }

  renderDOM();

  return {
    close: () => closeToast(id),
    updateDuration: (newDuration = durationTime) => {
      startCloseTimer(newDuration);
    },
    update: (
      messageOrOptions: ReactNode | ToastUpdateOptions,
      updateDuration?: ToastOptions['duration'],
    ) => {
      const toast = toastComponentList.find((t) => t.id === id && !t.isExit);

      if (toast) {
        const newDuration = isToastUpdateOptions(messageOrOptions)
          ? messageOrOptions.duration
          : updateDuration;

        const finalMessage =
          (isToastUpdateOptions(messageOrOptions) ? messageOrOptions.message : messageOrOptions) ??
          message;
        const finalLoading = isToastUpdateOptions(messageOrOptions)
          ? messageOrOptions.loading ?? loading
          : false;
        const finalTheme = isToastUpdateOptions(messageOrOptions)
          ? messageOrOptions.theme || theme
          : theme;

        toast.message = finalMessage;
        toast.component = (
          <ToastMessage
            {...options}
            id={id}
            message={finalMessage}
            theme={finalTheme}
            loading={finalLoading}
            loadingText={loadingText}
            onClick={handleClick}
            onClose={handleClose}
            onCloseStart={onCloseStart}
          />
        );

        renderDOM();

        if (newDuration !== undefined) {
          startCloseTimer(newDuration);
        }
      }
    },
  };
}

function toast(message: ReactNode, duration?: number | null): Toast;
function toast(message: ReactNode, options?: ToastOptions): Toast;
function toast(message: ReactNode, durationOrOptions?: number | null | ToastOptions): Toast {
  const options =
    typeof durationOrOptions === 'number' || durationOrOptions === null
      ? { duration: durationOrOptions }
      : durationOrOptions;
  return renderToast(message, options);
}

export const createToast = (options: ToastOptions): typeof toast => {
  return (message, durationOrOptions) => {
    if (typeof durationOrOptions === 'number') {
      return renderToast(message, {
        duration: durationOrOptions || options.duration,
      });
    }
    if (durationOrOptions === undefined || typeof durationOrOptions === 'object') {
      const mergedOptions = {
        ...options,
        ...durationOrOptions,
      };
      return renderToast(message, mergedOptions);
    }

    throw new Error('Invalid durationOrOptions type');
  };
};

export default toast;

export { Themes, toast };

export type {
  ToastPosition,
  Theme,
  ToastClickHandler,
  ToastOptions,
  Toast,
  ToastComponent,
  ToastUpdateOptions,
  ToastUpdateArgs,
};
