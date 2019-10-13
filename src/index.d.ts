export interface ConfigArgs {
  time?: number;
  className?: string;
  position?: 'left' | 'center' | 'right';
}

export interface ToastProps {
  className: string;
  message: string;
}
