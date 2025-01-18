import React, { cloneElement, Fragment } from 'react';
import { reverse } from '../lib/utils';
import { ToastComponent, ToastEnterEvent } from '../type/common';

export interface ToastContainerProps {
  toastComponentList: ToastComponent[];
  onToastEnter: () => void;
}

function ToastContainer(props: ToastContainerProps) {
  const { toastComponentList, onToastEnter } = props;

  const handleToastEnter = (t: ToastComponent, e: ToastEnterEvent) => {
    toastComponentList.forEach((toast) => {
      if (toast.id !== t.id) return;
      toast.startCloseTimer();
      toast.height = e.height;
    });

    onToastEnter();
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

        const deltaOffsetX =
          t.position.includes('left') || t.position.includes('right') ? '0%' : '-50%';
        const offsetYAlpha = t.position.includes('top') ? 1 : -1;
        const baseOffsetY = bottomToastsHeight * offsetYAlpha;
        const deltaOffsetY =
          t.position === 'center' ? `calc(-50% - ${baseOffsetY * -1}px)` : `${baseOffsetY}px`;

        return (
          <Fragment key={t.id}>
            {cloneElement(t.component, {
              isExit: t.isExit,
              deltaOffsetX,
              deltaOffsetY,
              _onEnter: (event: ToastEnterEvent) => handleToastEnter(t, event),
            })}
          </Fragment>
        );
      })}
    </>
  );
}

export default ToastContainer;
