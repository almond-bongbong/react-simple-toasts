# react-simple-toasts

> Simple toast message popup for React ⚛️

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center">
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1575989735/github/2019-12-10_23-52-52.2019-12-10_23_53_26_ljp6x1.gif" />
</p>

## Install

```bash
npm install --save react-simple-toasts
```

## Usage

a very simple use

```js
toast(message);
// or
toast(message, (millisecond = 3000));
// or
toast(message, { time: 3000, ...options });
```

```jsx
import React from 'react';
import toast from 'react-simple-toasts';

const Example = () => (
  <div className="example">
    <button onClick={() => toast('Hello toast!')}>Toast</button>
    <button onClick={() => toast('Message', 1000)}>One-second</button>
  </div>
);
```

[Live Demo](https://almond-bongbong.github.io/react-simple-toasts/)

## Options

| Name          | Type            | Default | Description                                                                      |
| ------------- | --------------- | ------- | -------------------------------------------------------------------------------- |
| time          | number          | `3000`  | The millisecond time that the message is displayed                               |
| className     | string          | `''`    | Can be used to customize styles                                                  |
| clickable     | string          | `false` | Can click the message                                                            |
| clickClosable | boolean         | `false` | Whether to close the toast when is clicked                                       |
| onClick       | (event) => void |         | Set the handler to handle click event <br /> Must be used with `clickable: true` |

## Config Defaults

You can specify config defaults.

`index.js`

```$jsx
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  time: 5000,
  className: 'my-toast-message',
});
```

| Name          | Type                           | Default  | Description                                                   |
| ------------- | ------------------------------ | -------- | ------------------------------------------------------------- |
| time          | number                         | `3000`   | The millisecond time that the message is displayed.           |
| className     | string                         | `''`     | Can be used to customize styles.                              |
| position      | string                         | `center` | left, center, right                                           |
| clickClosable | boolean                        | `false`  | Whether to close the toast when is clicked                    |
| render        | (message: string) => ReactNode | `null`   | Renderer of the toast. The return value should be a ReactNode |

<br>
<br>

## Thanks

Support it by joining **[stargazers](https://github.com/almond-bongbong/-react-max-modal/stargazers)** for this repository. :star:

## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
