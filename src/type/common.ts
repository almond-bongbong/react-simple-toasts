import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { Themes, ToastPosition as Position } from '../lib/constants';

export type ToastPosition = (typeof Position)[keyof typeof Position];

export type Theme = (typeof Themes)[keyof typeof Themes];

export type ToastClickHandler = (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;

export interface ToastOptions {
  duration?: number | null;
  className?: string;
  clickable?: boolean;
  clickClosable?: boolean;
  position?: ToastPosition;
  maxVisibleToasts?: number | null;
  isReversedOrder?: boolean;
  render?: ((message: ReactNode) => ReactNode) | null;
  theme?: Theme | null;
  zIndex?: number | null;
  onClick?: ToastClickHandler;
  onClose?: () => void;
  onCloseStart?: () => void;
}

export type ToastEnterEvent = { target: HTMLDivElement; width: number; height: number };

export type ConfigArgs = Pick<
  ToastOptions,
  | 'duration'
  | 'className'
  | 'clickClosable'
  | 'position'
  | 'maxVisibleToasts'
  | 'render'
  | 'theme'
  | 'zIndex'
  | 'isReversedOrder'
> & {
  offsetX?: number;
  offsetY?: number;
  gap?: number;
};

export interface Toast {
  close: () => void;
  updateDuration: (duration?: ToastOptions['duration']) => void;
  update: (message: ReactNode, duration?: number) => void;
}

export interface ToastComponent {
  id: number;
  message: ReactNode;
  position: ToastPosition;
  component: ReactElement;
  isExit?: boolean;
  width?: number;
  height?: number;
  gap: number;
  startCloseTimer: (duration?: number, callback?: () => void) => void;
}
