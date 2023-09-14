# React Simple Toasts

Instant, lightweight toast notifications for React. No providers or containers needed. 🍃

[![NPM](https://img.shields.io/npm/v/react-simple-toasts.svg)](https://www.npmjs.com/package/react-simple-toasts)
![NPM Downloads](https://img.shields.io/npm/dw/react-simple-toasts.svg)
![Size](https://img.shields.io/bundlephobia/min/react-simple-toasts)
![License](https://img.shields.io/npm/l/react-simple-toasts)
<br/>
[![✅ Test](https://github.com/almond-bongbong/react-simple-toasts/actions/workflows/00_test.yml/badge.svg)](https://github.com/almond-bongbong/react-simple-toasts/actions/workflows/00_test.yml)
[![Deploy to GitHub Pages](https://github.com/almond-bongbong/react-simple-toasts/actions/workflows/01_deploy_to_github_pages.yml/badge.svg)](https://github.com/almond-bongbong/react-simple-toasts/actions/workflows/01_deploy_to_github_pages.yml)

<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/preview.gif" alt="preview" />
</p>

## 🚀 Getting Started

### 📦 Installation

```sh
npm install react-simple-toasts
```

### 💡 Usage Example

```jsx
import toast, { Themes, toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; // choose your theme

toastConfig({ theme: Themes.DARK });

function MyComponent() {
  return (
    <button onClick={() => toast('Your toast is ready! 🍞')}>
      Show Toast
    </button>
  );
}
```

## 🌟 Key Features

- **Ease of use**: Simple installation and intuitive API
- **Highly customizable**: Control over appearance, duration, user interaction, and more
- **Browser compatibility**: Seamless operation across various browsers
- **Interactive**: Clickable, with an option to close on click
- **Multiple toasts management**: Control multiple toasts at once

## 📘 Comprehensive Documentation

Looking for more details, examples, and customization options? **Explore the full capabilities of React Simple Toasts and try out live examples on our [documentation page](https://almond-bongbong.github.io/react-simple-toasts/)**. It's your one-stop destination for everything you need to know about using this library.

## 🎨 Themes

React Simple Toasts offers fun built-in themes, and the flexibility doesn't stop there. Feel free to customize the themes to match your application's branding. Your toast, your style!

<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/theme-showcase.gif" alt="theme-showcase" />
</p>

## 🤝 Support and Contribution

If you find this library useful, please give us a star on [GitHub!](https://github.com/almond-bongbong/react-simple-toasts/stargazers) Your support greatly helps the project grow. Contributions are always welcome!

## 📜 License

Licensed under the MIT License.
