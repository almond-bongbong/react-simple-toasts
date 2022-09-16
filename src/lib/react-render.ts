import type * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';
import { isBrowser } from './environment';

const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
};

type CreateRoot = (container: Element) => Root;
const { version, render: reactRender } = fullClone;

let createRoot: CreateRoot | undefined;
try {
  const mainVersion = Number((version || '').split('.')[0]);
  if (mainVersion >= 18) {
    createRoot = fullClone.createRoot;
  }
} catch (e) {
  // Do nothing;
}

function toggleWarning(skip: boolean) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

  if (
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
    typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
  ) {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint =
      skip;
  }
}

const ROOT_KEY = '__REACT_SIMPLE_TOAST_ROOT__';

function modernRender(node: React.ReactElement, container: Element) {
  toggleWarning(true);
  if (isBrowser() && !window[ROOT_KEY]) window[ROOT_KEY] = createRoot!(container);
  toggleWarning(false);
  if (!window[ROOT_KEY]) return;

  const root = window[ROOT_KEY];
  root.render(node);
}

function legacyRender(node: React.ReactElement, container: Element) {
  reactRender(node, container);
}

export function render(node: React.ReactElement, container: Element) {
  if (createRoot) {
    modernRender(node, container);
    return;
  }

  legacyRender(node, container);
}
