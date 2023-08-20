export const createId = () => Date.now() + Math.floor(Math.random() * 10000000000000000);

export const isBrowser = () => typeof window !== 'undefined';

export const reverse = <T>(arr: T[]) => {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
};

export const rgbToRgba = (rgb: string, alpha: number) => {
  const [r, g, b] = rgb
    .replace(/[rgb(]|[)]/g, '')
    .split(',')
    .map((v) => v.trim());
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const classes = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

export const generateMessage = () => {
  return `message ${Math.random().toString(36).substring(2)}`;
};
