# react-simple-toasts

> Simple toast for React

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center">
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1570547628/github/react-simple-toasts-demo_vg6mgs.gif" />
</p>

## Install

```bash
npm install --save react-simple-toasts
```

## Usage

a very simple use

`toast('Hello toast')`

If you want to set the time, use the second parameter.

`toast(message, millisecond)`

```jsx
import React from 'react'
import toast from 'react-simple-toasts'

const Example = () => (
    <div className="example">
        <button onClick={() => toast('Hello toast!')}>Toast</button>
        <button onClick={() => toast('This message is displayed for 1 second.', 1000)}>One-second toast</button>
    </div>
);
```

## [Demo](https://almond-bongbong.github.io/react-simple-toasts/)

## Default Options

You can set the default settings if you want.

`index.js`
```$jsx
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  time: 5000,
  className: 'my-toast-message',
});
```

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| time | number | `3000` | The millisecond time that the message is displayed. |
| className | string | `` | Can be used to customize styles. |
| position | string | `center` | left, center, right |

## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
