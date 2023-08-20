import React, { ReactElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import styles from '../style.css';
import { ToastEnterEvent, ToastOptions } from '../type/common';
import { ToastPosition } from '../lib/constants';
import moduleClassNames from '../theme/theme-classnames.json';

export interface ToastMessageProps
  extends Pick<
    ToastOptions,
    'className' | 'clickable' | 'position' | 'render' | 'theme' | 'onClick'
  > {
  id: number;
  message: ReactNode;
  isExit?: boolean;
  offsetX?: string;
  offsetY?: string;
  baseOffsetX?: number;
  baseOffsetY?: number;
  zIndex?: number;
  _onEnter?: (e: ToastEnterEvent) => void;
}

function ToastMessage({
  id,
  message,
  className,
  clickable,
  position,
  isExit,
  render,
  theme,
  offsetX,
  offsetY,
  baseOffsetX,
  baseOffsetY,
  zIndex,
  onClick,
  _onEnter,
}: ToastMessageProps): ReactElement {
  const messageDOM = useRef<HTMLDivElement>(null);
  const hasTopPosition = position?.includes('top');
  const hasBottomPosition = position?.includes('bottom');
  const hasRightPosition = position?.includes('right');
  const hasLeftPosition = position?.includes('left');
  const hasCenterPosition = position?.includes('-center');
  const isCenterPosition = position === ToastPosition.CENTER;
  const [isEnter, setIsEnter] = useState(false);
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({
    transform: `translate(${offsetX}, ${
      isCenterPosition
        ? 'calc(50% - 20px)'
        : `${parseInt(offsetY || '0') + 20 * (hasTopPosition ? -1 : 1)}px`
    })`,
  });

  const top = isCenterPosition ? '50%' : hasTopPosition ? baseOffsetY : undefined;
  const bottom = hasBottomPosition ? baseOffsetY : undefined;
  const right = hasRightPosition ? baseOffsetX : undefined;
  const left =
    hasCenterPosition || isCenterPosition ? '50%' : hasLeftPosition ? baseOffsetX : undefined;

  useLayoutEffect(() => {
    const transform = `translate(${offsetX}, ${offsetY})`;

    setMessageStyle({
      top,
      right,
      bottom,
      left,
      zIndex,
      transform,
      WebkitTransform: transform,
    });
  }, [offsetX, offsetY, zIndex, top, right, bottom, left]);

  useLayoutEffect(() => {
    if (messageDOM.current == null || isEnter) return;

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

  const messageClassNames = [
    styles['toast-message'],
    styles[position || 'bottom-center'],
    moduleClassNames[`toast-${theme}-wrapper`],
    isEnter ? 'toast-enter-active' : '',
    isExit ? 'toast-exit-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentClassNames = [
    styles['toast-content'],
    clickable ? styles['clickable'] : '',
    moduleClassNames[`toast-${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div ref={messageDOM} id={id.toString()} className={messageClassNames} style={messageStyle}>
      {render ? (
        <div {...(clickable && clickableProps)}>{render(message)}</div>
      ) : (
        <div className={contentClassNames} {...(clickable && clickableProps)}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ToastMessage;
