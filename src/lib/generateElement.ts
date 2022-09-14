export const createElement = (id: string): HTMLElement => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

export const addRootElement = (rootElem: HTMLElement) => {
  document.body.appendChild(rootElem);
  return rootElem;
};
