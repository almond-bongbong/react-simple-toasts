import React, {
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from '../style.css';
import { ToastEnterEvent, ToastOptions } from '../type/common';

export interface ToastMessageProps
  extends Pick<
    ToastOptions,
    | 'className'
    | 'clickable'
    | 'position'
    | 'render'
    | 'theme'
    | 'onClick'
    | 'isReversedOrder'
  > {
  id: number;
  message: ReactNode;
  isExit?: boolean;
  offsetX?: string;
  offsetY?: string;
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
  zIndex,
  isReversedOrder,
  onClick,
  _onEnter,
}: ToastMessageProps): ReactElement {
  const messageDOM = useRef<HTMLDivElement>(null);
  const isTopPosition = position?.includes('top');
  const [isEnter, setIsEnter] = useState(false);
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({
    transform: `translate(${offsetX}, ${
      isTopPosition
        ? parseInt(offsetY || '0') - 20
        : isReversedOrder
        ? parseInt(offsetY || '0') + 20
        : 20
    }px)`,
  });

  useLayoutEffect(() => {
    if (isExit) return;

    const transform = `translate(${offsetX}, ${offsetY})`;

    setMessageStyle({
      zIndex,
      transform,
      WebkitTransform: transform,
    });
  }, [isExit, offsetX, offsetY, zIndex]);

  useLayoutEffect(() => {
    if (messageDOM.current?.clientHeight == null || isEnter) return;

    const height = messageDOM.current.clientHeight;
    if (messageDOM.current) {
      _onEnter?.({
        target: messageDOM.current,
        height,
      });
    }

    setIsEnter(true);
  }, [isEnter, _onEnter]);

  const messageClassNames = [
    styles['toast-message'],
    styles[position || 'bottom-center'],
    isEnter ? 'toast-enter-active' : '',
    isExit ? 'toast-exit-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentClassNames = [
    styles['toast-content'],
    clickable ? styles['clickable'] : '',
    `toast-${theme}`,
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
    <div
      ref={messageDOM}
      id={id.toString()}
      className={messageClassNames}
      style={messageStyle}
    >
      {render ? (
        render(message)
      ) : (
        <div className={contentClassNames} {...(clickable && clickableProps)}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ToastMessage;
