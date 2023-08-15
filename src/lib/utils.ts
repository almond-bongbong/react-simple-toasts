export const createId = () => Date.now() + Math.floor(Math.random() * 10000000000000000);

export const isBrowser = () => typeof window !== 'undefined';

export const reverse = <T>(arr: T[]) => {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
};
