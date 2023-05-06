export const createId = () =>
  Date.now() + Math.floor(Math.random() * 10000000000000000);

export const isBrowser = () => typeof window !== 'undefined';
