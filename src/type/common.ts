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
  theme?: Theme | string | null;
  zIndex?: number | null;
  loading?: boolean | Promise<unknown>;
  loadingText?: ReactNode;
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
  | 'onClick'
  | 'onCloseStart'
  | 'onClose'
  | 'loadingText'
> & {
  offsetX?: number;
  offsetY?: number;
  gap?: number;
};

export type ToastUpdateOptions = {
  message?: ReactNode;
  duration?: number;
  loading?: boolean;
  theme?: Theme;
};
export type ToastUpdateArgs =
  | [message: ReactNode, duration?: ToastOptions['duration']]
  | [options: ToastUpdateOptions];

export interface Toast {
  close: () => void;
  updateDuration: (duration?: ToastOptions['duration']) => void;
  update: (...args: ToastUpdateArgs) => void;
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
