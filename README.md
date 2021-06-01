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
toast(message)
// or
toast(message, millisecond = 3000)
```

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

[Live Demo](https://almond-bongbong.github.io/-react-max-modal/)

## Options

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| visible | `boolean` | `false` | |
| children | `ReactNode` | | |
| onClose | `() => void` | | |
| title | `ReactNode` | | |
| width | `number` | `string` | `520` | |
| zIndex | `number` | `1000` | |
| mask | `boolean` | `true` | |
| closeButton | `ReactNode` | | |
| showsCloseButton | `boolean` | `true` | |
| isMaskClosable | `boolean` | `true` | |
| isEscKeyClosable | `boolean` | `true` | |
| isCenteredMode | `boolean` | `false` | |
| isExpandedMode | `boolean` | `false` | |
| modalClassName | `string` | | |
| maskClassName | `string` | | |
| bodyClassName | `string` | | |
| contentClassName | `string` | | |
| modalStyle | `CSSProperties` | | |
| maskStyle | `CSSProperties` | | |
| bodyStyle | `CSSProperties` | | |
| contentStyle | `CSSProperties` | | |

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

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| time | number | `3000` | The millisecond time that the message is displayed. |
| className | string | `''` | Can be used to customize styles. |
| position | string | `center` | left, center, right |

<br>
<br>

## Thanks
Support it by joining __[stargazers](https://github.com/almond-bongbong/-react-max-modal/stargazers)__ for this repository. :star:


## License

MIT © [almond-bongbong](https://github.com/almond-bongbong)
