import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addRootElement, createElement } from './lib/generateElement';

const toastContainer = document.getElementById(styles['toast_container']);
if (!toastContainer) addRootElement(createElement(styles['toast_container']));
const toastComponentList: any[] = [];

const renderDOM = () => {
  const container = document.getElementById(styles['toast_container']);

  ReactDOM.render(
    <div className={styles['toast-list']}>
      <TransitionGroup classnames="list">
        {toastComponentList.map(t => (
          <CSSTransition key={t.id} timeout={300} classNames="toast">
            {t.component}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>,
    container,
  );
};

interface IToastProps {
  message: string;
}

const Toast: React.FunctionComponent<IToastProps> = ({ message }) => {
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

  return (
    <div
      ref={messageDOM}
      className={`${styles['toast-message']}`}
    >
      <div className={styles['toast-content']}>{message}</div>
    </div>
  );
};

const toast = (message: string, time = 3000) => {
  renderDOM();

  const id = Date.now();
  toastComponentList.push({
    id,
    component: <Toast message={message} />,
  });

  renderDOM();
  setTimeout(() => {
    const index = toastComponentList.findIndex(t => t.id === id);
    toastComponentList.splice(index, 1);
    renderDOM();
  }, time);
};

export default toast;
