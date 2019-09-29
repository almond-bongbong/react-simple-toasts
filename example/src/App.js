import React, { Component } from 'react'
import toast from 'react-simple-toasts'

export default class App extends Component {
  render () {
    return (
      <div className="example">
        <button onClick={() => toast('Hello toast!', 100000)}>Toast</button>
        <button onClick={() => toast('This message is displayed for 1 second.', 1000)}>One-second toast</button>
        <button onClick={() => toast('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')}>Long Message</button>
      </div>
    )
  }
}

