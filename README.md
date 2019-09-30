# react-simple-toasts

> Simple toast popup for React

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-simple-toasts
```

## Usage

```tsx
import * as React from 'react'
import toast from 'react-simple-toasts'

export default class App extends Component {
  render () {
    return (
      <div className="example">
        <button onClick={() => toast('Hello toast!')}>Toast</button>
      </div>
    )
  }
}


```

## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
