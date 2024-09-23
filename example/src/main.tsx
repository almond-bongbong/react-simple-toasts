import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';

import.meta.globEager('/node_modules/react-simple-toasts/dist/theme/*.css');

toastConfig({
  theme: 'dark',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
