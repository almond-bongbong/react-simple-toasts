import React, { cloneElement, Fragment, ReactNode, SyntheticEvent } from 'react';
import { addRootElement, createElement } from './lib/generateElement';
import { render as reactRender } from './lib/react-render';
import { createId, isBrowser, reverse } from './lib/utils';
import { SET_TIMEOUT_MAX, Themes, ToastPosition as Position } from './lib/constants';
import {
  ConfigArgs,
  Theme,
  Toast,
  ToastClickHandler,
  ToastComponent,
  ToastEnterEvent,
  ToastOptions,
  ToastPosition,
  ToastUpdateOptions,
} from './type/common';
import ToastMessage from './component/toast-message';
import { isToastUpdateOptions } from './lib/type-guard';

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

const defaultOptions: Required<ConfigArgs> = {
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
  zIndex: null,
  loadingText: 'loading',
  onClick: noop,
  onCloseStart: noop,
  onClose: noop,
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

export const toastConfig = (options: ConfigArgs) => {
  if (!isBrowser()) return;

  if (options.theme) defaultOptions.theme = options.theme;
  if (options.duration) defaultOptions.duration = options.duration;
  if (options.className) defaultOptions.className = options.className;
  if (options.position && isValidPosition(options.position))
    defaultOptions.position = options.position;
  if (options.clickClosable) defaultOptions.clickClosable = options.clickClosable;
  if (options.render) defaultOptions.render = options.render;
  if (options.maxVisibleToasts) defaultOptions.maxVisibleToasts = options.maxVisibleToasts;
  if (options.isReversedOrder) defaultOptions.isReversedOrder = options.isReversedOrder;
  if (options.zIndex != null) defaultOptions.zIndex = options.zIndex;
  if (options.offsetX != null) defaultOptions.offsetX = options.offsetX;
  if (options.offsetY != null) defaultOptions.offsetY = options.offsetY;
  if (options.gap != null) defaultOptions.gap = options.gap;
  if (options.loadingText) defaultOptions.loadingText = options.loadingText;
  if (options.onClick) defaultOptions.onClick = options.onClick;
  if (options.onCloseStart) defaultOptions.onCloseStart = options.onCloseStart;
  if (options.onClose) defaultOptions.onClose = options.onClose;
};

function ToastContainer() {
  const handleToastEnter = (t: ToastComponent, e: ToastEnterEvent) => {
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
        const toastComponents = t.position.includes('top')
          ? reverse(toastComponentList)
          : toastComponentList;

        const currentIndex = toastComponents.findIndex((toast) => toast.id === t.id);
        const bottomToasts = toastComponents
          .slice(currentIndex + 1)
          .filter((toast) => toast.position === t.position && !toast.isExit);

        const bottomToastsHeight = bottomToasts.reduce((acc, toast) => {
          return acc + (toast.height ?? 0) + t.gap;
        }, 0);

        const offsetX = t.position.includes('left') || t.position.includes('right') ? '0%' : '-50%';
        const offsetYAlpha = t.position.includes('top') ? 1 : -1;
        const baseOffsetY = bottomToastsHeight * offsetYAlpha;
        const offsetY =
          t.position === 'center' ? `calc(-50% - ${baseOffsetY * -1}px)` : `${baseOffsetY}px`;

        return (
          <Fragment key={t.id}>
            {cloneElement(t.component, {
              isExit: t.isExit,
              offsetX,
              offsetY,
              _onEnter: (event: ToastEnterEvent) => handleToastEnter(t, event),
            } as unknown as React.ReactElement)}
          </Fragment>
        );
      })}
    </>
  );
}

const renderDOM = () => {
  if (!isBrowser()) return;
  const toastContainer = document.getElementById('#toast__container');
  if (!toastContainer) return;

  reactRender(<ToastContainer />, toastContainer);
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

function renderToast(
  message: ReactNode,
  options?: ToastOptions & {
    toastInstanceId?: number;
    offsetX?: number;
    offsetY?: number;
    gap?: number;
  },
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
    offsetX = defaultOptions.offsetX,
    offsetY = defaultOptions.offsetY,
    gap = defaultOptions.gap,
    maxVisibleToasts = defaultOptions.maxVisibleToasts,
    isReversedOrder = defaultOptions.isReversedOrder,
    render = defaultOptions.render,
    theme = defaultOptions.theme,
    zIndex = defaultOptions.zIndex,
    onClick = defaultOptions.onClick,
    onClose = defaultOptions.onClose,
    onCloseStart = defaultOptions.onCloseStart,
    loadingText = defaultOptions.loadingText,
    loading,
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

  const startCloseTimer = (duration = durationTime) => {
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
        id={id}
        message={message}
        className={className}
        clickable={clickable || clickClosable}
        position={position}
        baseOffsetX={offsetX}
        baseOffsetY={offsetY}
        render={render}
        theme={theme}
        zIndex={zIndex || undefined}
        loading={loading}
        loadingText={loadingText}
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
            id={id}
            message={finalMessage}
            className={className}
            clickable={clickable || clickClosable}
            position={position}
            baseOffsetX={offsetX}
            baseOffsetY={offsetY}
            render={render}
            theme={finalTheme}
            zIndex={zIndex || undefined}
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

export const createToast = (options: ConfigArgs): typeof toast => {
  const toastInstanceId = createId();

  return (message, durationOrOptions) => {
    if (typeof durationOrOptions === 'number') {
      return renderToast(message, {
        toastInstanceId,
        duration: durationOrOptions || options.duration,
      });
    }
    if (durationOrOptions === undefined || typeof durationOrOptions === 'object') {
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

export { Themes, toast };

export type {
  ToastPosition,
  Theme,
  ToastClickHandler,
  ToastOptions,
  ConfigArgs,
  Toast,
  ToastComponent,
};
