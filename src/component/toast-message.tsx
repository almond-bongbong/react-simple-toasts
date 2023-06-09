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
    'className' | 'clickable' | 'position' | 'render' | 'theme' | 'onClick'
  > {
  id: number;
  message: ReactNode;
  isExit?: boolean;
  offsetX?: number;
  offsetY?: number;
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
  onClick,
  _onEnter,
}: ToastMessageProps): ReactElement {
  const messageDOM = useRef<HTMLDivElement>(null);
  const [isEnter, setIsEnter] = useState(false);
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    setMessageStyle({
      transform: `translate(${offsetX}, ${offsetY})${
        isExit ? ' scale(0.95)' : ''
      }`,
    });
  }, [offsetY, isExit]);

  useLayoutEffect(() => {
    if (messageDOM.current?.clientHeight == null) return;

    const height = messageDOM.current.clientHeight;
    if (messageDOM.current) {
      _onEnter?.({
        target: messageDOM.current,
        height,
      });
    }

    setIsEnter(true);
  }, []);

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
