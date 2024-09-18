# React Simple Toasts 🍞🚀

Elevate your React applications with ultra-sleek toast notifications! With React Simple Toasts, you get an instant, lightweight, and highly customizable toast notification system - all without the hassle of complex setups. Let's make your user notifications pop!

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

> **🚀 Version 6.0.0 Update Notice**
>
> We've made significant changes in version 6.0.0:
>
> - Switched to BEM styling for easier customization
> - Now requires explicit import of `style.css`

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Key Features](#Key-Features)
- [Themes](#Themes)
- [Documentation](#Documentation)
- [Contribute](#Contribute)
- [License](#License)

<a name="Installation"></a>

## Installation 📦

Get started in seconds!

```bash
npm install react-simple-toasts
```

<a name="Usage"></a>

## Usage 💡

Integrate with ease. Customize with flair.

```jsx
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark' });

function MyComponent() {
  return <button onClick={() => toast('Your toast is ready! 🍞')}>Show Toast</button>;
}
```

<a name="Key-Features"></a>

## Key Features 🌟

- **Ease of Use**: Set up in minutes, not hours!
- **Customizable**: Tailor to your style – themes, durations, interactions.
- **Browser Friendly**: Consistent experience across all major browsers.
- **Interactive**: Engaging, clickable toasts with auto-close options.
- **Multi-Toast Control**: Manage multiple notifications effortlessly.

<a name="Themes"></a>

## Themes 🎨

Your style, your toast. Choose from built-in themes or create your own.

### Standard Theme

<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/theme_standard.gif" alt="standard theme showcase" />
</p>

### Creative Theme

<p align="center">
  <img src="https://raw.githubusercontent.com/almond-bongbong/react-simple-toasts/master/docs/theme_creative.gif" alt="creative theme showcase" />
</p>

<a name="Documentation"></a>

## Documentation 📘

Explore full [documentation](https://almond-bongbong.github.io/react-simple-toasts/) for in-depth guides, examples, and API details.

<a name="Contribute"></a>

## Contribute 🤝

<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/almond-bongbong">
                    <img src="https://avatars.githubusercontent.com/u/42146674?v=4" width="100;" alt="almond-bongbong"/>
                    <br />
                    <sub><b>Max</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Kim-Yeon-ho">
                    <img src="https://avatars.githubusercontent.com/u/81131715?v=4" width="100;" alt="Kim-Yeon-ho"/>
                    <br />
                    <sub><b>Hardy</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/hemengke1997">
                    <img src="https://avatars.githubusercontent.com/u/49073282?v=4" width="100;" alt="hemengke1997"/>
                    <br />
                    <sub><b>Minko</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/ammuench">
                    <img src="https://avatars.githubusercontent.com/u/2099658?v=4" width="100;" alt="ammuench"/>
                    <br />
                    <sub><b>Alex Muench</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/THEmmanuel">
                    <img src="https://avatars.githubusercontent.com/u/36299715?v=4" width="100;" alt="THEmmanuel"/>
                    <br />
                    <sub><b>Emmanuel Ayodele Bello</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/silverwind">
                    <img src="https://avatars.githubusercontent.com/u/115237?v=4" width="100;" alt="silverwind"/>
                    <br />
                    <sub><b>silverwind</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->

Join our growing community! [Star us on GitHub](https://github.com/almond-bongbong/react-simple-toasts/stargazers) and contribute to making React Simple Toasts better.

<a name="License"></a>

## License 📜

React Simple Toasts is MIT licensed.
