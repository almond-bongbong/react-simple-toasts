import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { toastConfig } from 'react-simple-toasts';

import.meta.globEager('/node_modules/react-simple-toasts/dist/theme/*.css');

toastConfig({
  theme: 'dark',
  duration: null,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
