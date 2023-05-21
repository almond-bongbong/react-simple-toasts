# React Simple Toasts 🍞

React Simple Toasts is a lightweight, user-friendly toast message library for React applications.

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts)
![NPM Downloads](https://img.shields.io/npm/dt/react-simple-toasts.svg)
![Size](https://img.shields.io/bundlephobia/min/react-simple-toasts)
![License](https://img.shields.io/npm/l/react-simple-toasts)

<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/preview.gif" />
</p>

## Documentation

Explore the full capabilities of React Simple Toasts and try out live examples in our [documentation page](https://almond-bongbong.github.io/react-simple-toasts/).

## Key Features

- **Ease of use**: With a simple installation process and an intuitive API, you can get started with the library in no time.
- **Highly customizable**: You can control various aspects of your toast messages, from their appearance and duration to their behavior upon user interaction.
- **Custom rendering**: The library supports custom rendering, allowing you to tailor the look of your toast messages to match your application's branding.
- **Positioning**: The library allows you to position your toasts at any corner or center of the viewport, offering a high level of control over where your messages appear.
- **Browser compatibility**: The library includes utility functions to ensure that it works seamlessly across different browsers.
- **Interactive**: The library allows toasts to be clickable and to close on click if desired, enabling user interaction.
- **Multiple toasts management**: It provides functionality to manage multiple toasts by controlling the maximum number of visible toasts at a time.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [toast(message, options)](#toastmessage-options)
  - [Toast Return Object](#toast-return-object)
  - [Configuring Toasts: createToast and toastConfig](#configuring-toasts-createtoast-and-toastconfig)
- [Contributing](#contributing)
- [Support Us](#support-us)
- [License](#license)

## Installation

Install the package via npm:

```sh
npm install react-simple-toasts
```

## Usage

Import and call the toast function with a message to display:

```jsx
import toast from 'react-simple-toasts';

function MyComponent() {
  return <button onClick={() => toast('Hello, world!')}>Display Toast</button>;
}
```

## API

### toast(message, options)

Displays a toast message with the specified message and options. Detailed options can be found on our [documentation page](https://almond-bongbong.github.io/react-simple-toasts/api#toast).

### Toast Return Object

The `toast` function returns a control object with methods to manage the displayed toast. You can find examples of usage on our [documentation page](https://almond-bongbong.github.io/react-simple-toasts/api#toast).

### Configuring Toasts: `createToast` and `toastConfig`

The `createToast` and `toastConfig` functions allow for advanced configuration of your toast notifications. Use `createToast` to generate a toast function with specific settings, and `toastConfig` to set default options for all toast messages in your application. See our [documentation page](https://almond-bongbong.github.io/react-simple-toasts/api#toast-config) for more details.

## Contributing

Contributions are always welcome!

## Support Us

If you find this library useful, consider giving us a star on [GitHub!](https://github.com/almond-bongbong/react-simple-toasts/stargazers) Your support is greatly appreciated and it helps the project grow.

## License

This project is licensed under the MIT License.
