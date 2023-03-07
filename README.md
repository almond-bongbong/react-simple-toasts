# React Simple Toasts

React Simple Toasts is a simple and easy-to-use toast message popup for React.

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center">
<img src="https://res.cloudinary.com/dfyuv19ig/image/upload/v1575989735/github/2019-12-10_23-52-52.2019-12-10_23_53_26_ljp6x1.gif" />
</p>

## Installation

You can install the package via npm:

```sh
npm install react-simple-toasts
```

## Usage
To use React Simple Toasts, simply call the toast function with a message to display:

```jsx
import toast from 'react-simple-toasts';

function MyComponent() {
  return (
    <div>
      <button onClick={() => toast('Hello, world!')}>
        Show Toast
      </button>
    </div>
  );
}
```

By default, the toast message will be displayed for 3 seconds. You can customize this duration by passing a second argument to the toast function:

```jsx
toast('Hello, world!', 5000);
```

You can also customize the appearance and behavior of the toast message by passing options to the toast function:

```jsx
toast('Hello, world!', {
  time: 5000,
  position: 'top-right',
  clickable: true,
  clickClosable: true,
  className: 'custom-toast',
  render: message => <CustomToast message={message} />,
  onClick: event => console.log('Toast clicked!'),
});
```

React Simple Toasts also allows you to set default options for all toast messages by calling the toastConfig function:

```jsx
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  time: 5000,
  position: 'bottom-right',
  clickClosable: true,
  className: 'custom-toast',
  render: message => <CustomToast message={message} />,
});
```

## API

### toast(message, options)

Displays a toast message with the given message and options.

**Parameters**
- `message` (string | ReactNode): The message to display in the toast.
- `options` (object): An optional object containing options to customize the appearance and behavior of the toast message. The following options are available:
  - `time` (number): The duration (in milliseconds) that the toast message will be displayed. Default is `3000`.
  - `className` (string): A string of classes to apply to the toast container.
  - `clickable` (boolean): A boolean value that determines whether the toast message is clickable. Default is `false`.
  - `position` (string): A string that sets the position of the toast message. Available options are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'top-left'`, `'top-center'`, and `'top-right'`. Default is `'bottom-center'`.
  - `render` (function): A function that returns a ReactNode to render as the toast message. The function takes a `message` argument, which is the message to display in the toast. Default is `null`.
  - `onClick` (function): A function to be called when the toast message is clicked. This function takes an `event` argument, which is the click event. Must be used with `clickable: true`.


### toastConfig(options)

Sets default options for all toast messages.

**Parameters**
- `options` (object): An object containing options to customize the appearance and behavior of all toast messages. The following options are available:
  - `time` (number): The duration (in milliseconds) that the toast message will be displayed. Default is `3000`.
  - `className` (string): A string of classes to apply to the toast container.
  - `position` (string): A string that sets the position of the toast message. Available options are `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'top-left'`, `'top-center'`, and `'top-right'`. Default is `'bottom-center'`.
  - `clickClosable` (boolean): A boolean value that determines whether the toast message can be closed by clicking on it. Default is `false`.
  - `render` (function): A function that returns a ReactNode to render as the toast message. The function takes a `message` argument, which is the message to display in the toast. Default is `null`.

## Live Demo

Try React Simple Toasts in action with [live demo](https://almond-bongbong.github.io/react-simple-toasts/).

## Contributing

Contributions are always welcome! If you want to contribute to this project.

## License

This project is licensed under the MIT License.
