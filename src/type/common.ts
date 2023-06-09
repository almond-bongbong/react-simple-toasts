import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { Themes, ToastPosition as Position } from '../lib/constants';

export type ToastPosition = (typeof Position)[keyof typeof Position];

export type Theme = (typeof Themes)[keyof typeof Themes];

export type ToastClickHandler = (
  e: SyntheticEvent<HTMLDivElement>,
) => void | Promise<void>;

export interface ToastOptions {
  /**
   * @deprecated The time option is deprecated. Use duration instead.
   */
  time?: number;
  duration?: number;
  className?: string;
  clickable?: boolean;
  clickClosable?: boolean;
  position?: ToastPosition;
  maxVisibleToasts?: number | null;
  render?: ((message: ReactNode) => ReactNode) | null;
  theme?: Theme | null;
  onClick?: ToastClickHandler;
  onClose?: () => void;
  onCloseStart?: () => void;
}

export type ToastEnterEvent = { target: HTMLDivElement; height: number };

export interface ConfigArgs
  extends Pick<
    ToastOptions,
    | 'time'
    | 'duration'
    | 'className'
    | 'clickClosable'
    | 'position'
    | 'maxVisibleToasts'
    | 'render'
    | 'theme'
  > {}

export interface Toast {
  close: () => void;
  updateDuration: (duration?: number) => void;
  update: (message: ReactNode, duration?: number) => void;
}

export interface ToastComponent {
  id: number;
  message: ReactNode;
  position: ToastPosition;
  component: ReactElement;
  isExit?: boolean;
  height?: number;
  startCloseTimer: (duration?: number, callback?: () => void) => void;
}
