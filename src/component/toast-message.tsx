import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import styles from '../style.css';
import { ToastEnterEvent, ToastOptions } from '../type/common';
import { ToastPosition } from '../lib/constants';
import moduleClassNames from '../theme/theme-classnames.json';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import { classes, rgbToRgba } from '../lib/utils';

interface LoadingProps {
  color?: string;
}

function Loading({ color }: LoadingProps) {
  const translucentColor = color && rgbToRgba(color, 0.3);

  return (
    <span className={styles['spinner-wrap']}>
      <span
        className={styles.spinner}
        style={{ border: `2px solid ${translucentColor}`, borderTopColor: color }}
      >
        loading
      </span>
    </span>
  );
}

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
  loading?: boolean | Promise<unknown>;
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
  loading,
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
  const [localLoading, setLocalLoading] = useState<boolean>(!!loading);
  const [loadingColor, setLoadingColor] = useState<string>();

  const top = isCenterPosition ? '50%' : hasTopPosition ? baseOffsetY : undefined;
  const bottom = hasBottomPosition ? baseOffsetY : undefined;
  const right = hasRightPosition ? baseOffsetX : undefined;
  const left =
    hasCenterPosition || isCenterPosition ? '50%' : hasLeftPosition ? baseOffsetX : undefined;

  useIsomorphicLayoutEffect(() => {
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

  const messageClassNames = classes(
    styles['toast-message'],
    styles[position || 'bottom-center'],
    moduleClassNames[`toast-${theme}-wrapper`],
    isEnter ? 'toast-enter-active' : '',
    isExit ? 'toast-exit-active' : '',
    localLoading ? styles['loading'] : '',
  );

  const contentClassNames = classes(
    styles['toast-content'],
    clickable ? styles['clickable'] : '',
    !render && moduleClassNames[`toast-${theme}`],
    !render && theme ? styles['toast-theme-content'] : '',
    theme || '',
    className,
  );

  const clickableProps = {
    onClick,
    tabIndex: 0,
    role: 'button',
  };

  return (
    <div ref={messageDOM} id={id.toString()} className={messageClassNames} style={messageStyle}>
      <div className={contentClassNames} {...(clickable && clickableProps)}>
        {localLoading && <Loading color={loadingColor} />}
        {render ? render(message) : message}
      </div>
    </div>
  );
}

export default ToastMessage;
