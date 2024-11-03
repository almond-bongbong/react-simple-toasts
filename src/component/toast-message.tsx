import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { ToastEnterEvent, ToastOptions } from '../type/common';
import { ToastPosition } from '../lib/constants';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import { classes, rgbToRgba } from '../lib/utils';

interface LoadingProps {
  color?: string;
  children: ReactNode;
}

function Loading({ color, children }: LoadingProps) {
  const translucentColor = color && rgbToRgba(color, 0.3);

  return (
    <span className={'toast__spinner-wrap'}>
      <span
        className={'toast__spinner'}
        style={{ border: `2px solid ${translucentColor}`, borderTopColor: color }}
      >
        {children}
      </span>
    </span>
  );
}

export interface ToastMessageProps
  extends Required<
    Pick<
      ToastOptions,
      | 'className'
      | 'clickable'
      | 'position'
      | 'render'
      | 'theme'
      | 'onClick'
      | 'clickClosable'
      | 'offsetX'
      | 'offsetY'
      | 'zIndex'
      | 'loading'
      | 'loadingText'
      | 'onClose'
      | 'onCloseStart'
    >
  > {
  id: number;
  message: ReactNode;
  isExit?: boolean;
  deltaOffsetX?: string;
  deltaOffsetY?: string;
  _onEnter?: (e: ToastEnterEvent) => void;
}

const TransitionClassNames = {
  enter: 'toast__message--enter-active',
  exit: 'toast__message--exit-active',
};

function ToastMessage({
  id,
  message,
  className,
  clickable: clickableProp,
  clickClosable,
  position,
  isExit,
  render,
  theme,
  offsetX,
  offsetY,
  deltaOffsetX,
  deltaOffsetY,
  zIndex,
  loading,
  loadingText,
  onClick,
  onClose,
  onCloseStart,
  _onEnter,
}: ToastMessageProps): ReactElement {
  const clickable = clickableProp || clickClosable;

  const messageDOM = useRef<HTMLDivElement>(null);
  const hasTopPosition = position?.includes('top');
  const hasBottomPosition = position?.includes('bottom');
  const hasRightPosition = position?.includes('right');
  const hasLeftPosition = position?.includes('left');
  const hasCenterPosition = position?.includes('-center');
  const isCenterPosition = position === ToastPosition.CENTER;
  const [isEnter, setIsEnter] = useState(false);
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({
    transform: `translate(${deltaOffsetX}, ${
      isCenterPosition
        ? 'calc(50% - 20px)'
        : `${parseInt(deltaOffsetY || '0') + 20 * (hasTopPosition ? -1 : 1)}px`
    })`,
  });
  const [localLoading, setLocalLoading] = useState<boolean>(!!loading);
  const [loadingColor, setLoadingColor] = useState<string>();

  const top = isCenterPosition ? '50%' : hasTopPosition ? offsetY : undefined;
  const bottom = hasBottomPosition ? offsetY : undefined;
  const right = hasRightPosition ? offsetX : undefined;
  const left =
    hasCenterPosition || isCenterPosition ? '50%' : hasLeftPosition ? offsetX : undefined;

  useIsomorphicLayoutEffect(() => {
    const transform = `translate(${deltaOffsetX}, ${deltaOffsetY})`;

    setMessageStyle({
      top,
      right,
      bottom,
      left,
      zIndex,
      transform,
      WebkitTransform: transform,
    });
  }, [deltaOffsetX, deltaOffsetY, zIndex, top, right, bottom, left]);

  useIsomorphicLayoutEffect(() => {
    if (messageDOM.current?.clientHeight == null || isEnter) return;

    const width = messageDOM.current.clientWidth;
    const height = messageDOM.current.clientHeight;
    if (messageDOM.current) {
      _onEnter?.({
        target: messageDOM.current,
        width,
        height,
      });
    }

    setIsEnter(true);
  }, [isEnter, _onEnter]);

  useIsomorphicLayoutEffect(() => {
    if (!messageDOM.current) return;

    const messageText = messageDOM.current.querySelector('span');
    const textColor = messageText && window.getComputedStyle(messageText).color;
    if (!textColor) return;

    setLoadingColor(textColor);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (loading instanceof Promise) {
      setLocalLoading(true);
      loading.then(() => {
        setLocalLoading(false);
      });
      return;
    }
    setLocalLoading(!!loading);
  }, [loading]);

  useIsomorphicLayoutEffect(() => {
    if (isExit) {
      onCloseStart();
    }
  }, [isExit]);

  const messageClassNames = classes(
    'toast__message',
    `toast__message--${position || 'bottom-center'}`,
    `toast__${theme}-wrapper`,
    isEnter ? TransitionClassNames.enter : '',
    isExit ? TransitionClassNames.exit : '',
    localLoading ? 'toast__message--loading' : '',
  );

  const contentClassNames = classes(
    'toast__content',
    clickable ? 'toast__content--clickable' : '',
    !render && theme ? `toast__${theme}` : '',
    !render && theme ? 'toast__theme-content' : '',
    theme || '',
    className,
  );

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div
      ref={messageDOM}
      id={id.toString()}
      className={messageClassNames}
      style={messageStyle}
      onTransitionEnd={() => {
        if (messageClassNames.includes(TransitionClassNames.exit)) {
          onClose();
        }
      }}
    >
      <div className={contentClassNames} {...(clickable && clickableProps)}>
        {localLoading && <Loading color={loadingColor}>{loadingText}</Loading>}
        {render ? render(message) : message}
      </div>
    </div>
  );
}

export default ToastMessage;
