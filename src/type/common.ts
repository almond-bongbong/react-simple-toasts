import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { Themes, ToastPosition as Position } from '../lib/constants';

export type ToastPosition = (typeof Position)[keyof typeof Position];

export type Theme = (typeof Themes)[keyof typeof Themes];

export type ToastClickHandler = (e: SyntheticEvent<HTMLDivElement>) => void | Promise<void>;

export interface ToastOptions {
  duration?: number;
  className?: string;
  clickable?: boolean;
  clickClosable?: boolean;
  position?: ToastPosition;
  maxVisibleToasts?: number | null;
  isReversedOrder?: boolean;
  render?: ((message: ReactNode) => ReactNode) | null;
  theme?: Theme | null;
  zIndex?: number | null;
  loading?: boolean | Promise<unknown>;
  onClick?: ToastClickHandler;
  onClose?: () => void;
  onCloseStart?: () => void;
}

export type ToastEnterEvent = { target: HTMLDivElement; height: number };

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

export type ToastUpdateOptions = {
  message?: ReactNode;
  duration?: number;
  loading?: boolean;
  theme?: Theme;
};
export type ToastUpdateArgs =
  | [message: ReactNode, duration?: number]
  | [options: ToastUpdateOptions];

export interface Toast {
  close: () => void;
  updateDuration: (duration?: number) => void;
  update: (...args: ToastUpdateArgs) => void;
}

export interface ToastComponent {
  id: number;
  message: ReactNode;
  position: ToastPosition;
  component: ReactElement;
  isExit?: boolean;
  height?: number;
  gap: number;
  startCloseTimer: (duration?: number, callback?: () => void) => void;
}
