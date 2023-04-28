# React Simple Toasts 🍞

React Simple Toasts is a lightweight, user-friendly toast message library for React applications.

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts)
![NPM Downloads](https://img.shields.io/npm/dt/react-simple-toasts.svg)
![Size](https://img.shields.io/bundlephobia/min/react-simple-toasts)
![License](https://img.shields.io/npm/l/react-simple-toasts)


<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/preview.gif" />
</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [API](#api)
  - [toast(message, options)](#toastmessage-options)
  - [Toast Return Object](#toast-return-object)
  - [toastConfig(options)](#toastconfigoptions)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package via npm, run:

```sh
npm install react-simple-toasts
```

## Usage
To utilize React Simple Toasts, invoke the toast function with a message to display:

```jsx
import toast from 'react-simple-toasts';

function MyComponent() {
  return (
    <div>
      <button onClick={() => toast('Hello, world!')}>
        Display Toast
      </button>
    </div>
  );
}
```

By default, the toast message is displayed for 3 seconds. Modify the duration by providing a second argument to the `toast` function:

```jsx
toast('Hello, world!', 5000);
```

Adjust the appearance and behavior of the toast message by supplying an options object to the toast function:

```jsx
toast('Hello, world!', {
  duration: 5000,
  position: 'top-right',
  clickable: true,
  clickClosable: true,
  className: 'custom-toast',
  render: message => <CustomToast message={message} />,
  onClick: event => console.log('Toast clicked!'),
});
```

Configure default options for all toast messages by calling the `toastConfig` function:

```jsx
// index.js
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  duration: 5000,
  position: 'bottom-right',
  clickClosable: true,
  className: 'custom-toast',
  render: message => <CustomToast message={message} />,
});
```

## Live Demo

Experience React Simple Toasts in action with our [live demo](https://almond-bongbong.github.io/react-simple-toasts/).

## API

### toast(message, options)

Displays a toast message with the specified message and options.

| Parameter | Type                  | Description                                                                                                                                                                                                                   |
| --- |-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` | `string`, `ReactNode` | The message to display in the toast.                                                                                                                                                                                          |
| `options` | `object`              | An optional object containing options to customize the appearance and behavior of the toast message. The following options are available:                                                                                     |
| `options.duration` | `number`              | The duration (in milliseconds) for which the toast message will be displayed. Default is `3000`.                                                                                                                                   |
| `options.className` | `string`              | A string of classes to apply to the toast container.                                                                                                                                                                          |
| `options.clickable` | `boolean`             | A boolean value that determines whether the toast message is clickable. Default is `false`.                                                                                                                                   |
| `options.clickClosable` | `boolean` | A boolean value that determines whether the toast message can be closed by clicking on it. Default is `false`.                                                                                                                |
| `options.position` | `string`              | A string that sets the position of the toast message. Available options are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'top-left'`, `'top-center'`, `'top-right'`, and `'center'`. Default is `'bottom-center'`. |
| `options.maxVisibleToasts` | `number`          | The maximum number of toast messages that can be displayed simultaneously. Default is `null`, which allows an unlimited number of toasts.                                                                                   |
| `options.render` | `function`            | A function that returns a ReactNode to render as the toast message. The function takes a `message` argument, which is the message to display in the toast. Default is `null`.                                                 |
| `options.onClick` | `function`            | A function to be called when the toast message is clicked. This function takes an `event` argument, which is the click event. Must be used with `clickable: true`.                                                            |
| `options.onClose` | `function`            | A function to be called when the toast message is closed and the closing animation is finished.                                                             |
| `options.onCloseStart` | `function`            | A function to be called when the toast message starts closing, right before the closing animation begins.                                                             |

### Toast Return Object

When the `toast` function is called, it returns an object with a single method, `close()`, allowing you to manually close the toast message currently being displayed.

| Method | Description | Version |
|--------|-------------|---------|
| `close()` | Closes the currently displayed toast message.| 3.3.0   |
| `updateDuration(newDuration: number)` | Updates the duration of the currently displayed toast message.| 3.5.0   |
| `update(message: ReactNode, duration?: number)` | Updates the message and duration of the currently displayed toast message. | 3.5.0   |

You can invoke this method at any time to close the toast message before its duration has elapsed. For instance, you might call it in response to a user interaction, such as a button click.

```jsx
const myToast = toast('Hello, world!');
// ...
<button onClick={() => myToast.close()}>
  Close Toast Message
</button>
```


### toastConfig(options)

Sets default options for all toast messages.

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | `object`              | An optional object containing options to customize the appearance and behavior of the toast message. The following options are available:                                                                                      |
| `options.duration` | `number`              | The duration (in milliseconds) for which the toast message will be displayed. Default is `3000`.                                                                                                                                    |
| `options.className` | `string`              | A string of classes to apply to the toast container.                                                                                                                                                                           |
| `options.clickClosable` | `boolean` | A boolean value that determines whether the toast message can be closed by clicking on it. Default is `false`.                                                                                                                 |
| `options.position` | `string`              | A string that sets the position of the toast message. Available options are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'top-left'`, `'top-center'`, `'top-right'`, and `'center'`. Default is `'bottom-center'`. |
| `options.maxVisibleToasts` | `number`          | The maximum number of toast messages that can be displayed simultaneously. Default is `null`, which allows an unlimited number of toasts.                                                                                    |
| `options.render` | `function`            | A function that returns a ReactNode to render as the toast message. The function takes a `message` argument, which is the message to display in the toast. Default is `null`.                                                  |


## Contributing

Contributions are always welcome! If you want to contribute to this project.

## License

This project is licensed under the MIT License.
