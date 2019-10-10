import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  time: 5000,
  className: 'my-toast-message'
});

ReactDOM.render(<App />, document.getElementById('root'));
