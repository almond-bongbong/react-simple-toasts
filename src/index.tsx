import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';
import { addRootElement, createElement } from './lib/generateElement';

const toastContainer = document.getElementById('toast_container');
if (!toastContainer) addRootElement(createElement('toast_container'));
const toastComponentList: any[] = [];

const ToastContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 1000;
  line-height: 1.5;
  transform: translateZ(0);
  
  & * {
    box-sizing: border-box;
  }
`;

interface IToastMessage {
  messageHeight: number,
}

const ToastMessage = styled.div`
  margin-bottom: 10px;
  text-align: right;
  font-size: 0;
  transition: height .3s, opacity .3s, transform .3s;

  &.toast-enter {
    opacity: 0;
    height: 0;
    transform: translateY(10px);
  }
  
  &.toast-enter-active {
    opacity: 1;
    height: ${(props: IToastMessage) => props.messageHeight}px;
    transform: translateY(0px);
  }
  
  &.toast-leave {
    opacity: 1;
    transform: translateY(0px);
  }
  
  &.toast-leave-active {
    opacity: 0;
    transform: translateY(-10px);
  }

  & .message {
    display: inline-block;
    overflow: hidden;
    min-width: 280px;
    max-width: 80%;
    padding: 10px 20px;
    background: rgba(0,0,10,0.4);
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    border-radius: 2px;
    color: #fff;
    font-size: 13px;
    text-align: center;
  }
`;

const renderDOM = () => {
  const container = document.getElementById('toast_container');
  ReactDOM.render(
    <ToastContainer>
      <ReactCSSTransitionGroup
        transitionName="toast"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {toastComponentList.map(t => t.component)}
      </ReactCSSTransitionGroup>
    </ToastContainer>,
    container,
  );
};

interface IToastProps {
  message: string
}

const Toast: React.FunctionComponent<IToastProps> = ({ message }) => {
  const messageDOM: any = useRef();
  const [messageHeight, setMessageHeight] = useState<number>(100);

  useLayoutEffect(() => {
    if (messageDOM.current) {
      setMessageHeight(messageDOM.current.clientHeight);
    }
  }, [messageDOM.current]);

  return (
    <ToastMessage ref={messageDOM} className={messageHeight ? 'toast-enter' : ''} messageHeight={messageHeight}>
      <div className="message">{message}</div>
    </ToastMessage>
  );
};

const toast = (message: string, time = 3000) => {
  renderDOM();

  const id = Date.now();
  toastComponentList.push({
    id,
    component: (
      <Toast key={id} message={message} />
    ),
  });

  renderDOM();
  setTimeout(() => {
    const index = toastComponentList.findIndex(t => t.id === id);
    toastComponentList.splice(index, 1);
    renderDOM();
  }, time);
};

export default toast;
