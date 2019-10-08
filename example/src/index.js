import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { config } from 'react-simple-toasts'

config({
  time: 5000,
  className: 'my-toast-name',
});

ReactDOM.render(<App />, document.getElementById('root'));
