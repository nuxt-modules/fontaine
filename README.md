# Nuxt Fontaine

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> Font metric fallback implementation for [Nuxt 3](https://v3.nuxtjs.org)

- [✨ &nbsp;Changelog](https://github.com/nuxt-modules/fontaine/blob/main/CHANGELOG.md)
- [▶️ &nbsp;Online playground](https://stackblitz.com/github/nuxt-modules/fontaine/tree/main/playground)

## Features

**⚠️ `@nuxtjs/fontaine` is under active development. ⚠️**

- 💪 Reduces CLS by using local font fallbacks with crafted font metrics.
- ✨ Generates font metrics and fallbacks automatically.
- ⚡️ Pure CSS, zero runtime overhead.

On the playground project, enabling/disabling this module makes the following differences rendering `/`, with no customisation required:

|             | Before | After   |
| ----------- | ------ | ------- |
| CLS         | `0.34` | `0.013` |
| Performance | `88`   | `98`    |

## What's next

For best performance, you will need to inline _all_ your CSS, not just the font-face fallback rules (which this module does automatically), or there will still be a layout shift when the stylesheet loads (which is why the number above is not zero).

[This PR](https://github.com/nuxt/framework/pull/7160) aims to bring that ability to Nuxt itself.

## Installation

With `pnpm`

```bash
pnpm add -D @nuxtjs/fontaine
```

Or, with `npm`

```bash
npm install -D @nuxtjs/fontaine
```

Or, with `yarn`

```bash
yarn add -D @nuxtjs/fontaine
```

## Usage

```js
export default defineNuxtConfig({
  modules: ['@nuxtjs/fontaine'],
  // If you are using a Google font or you don't have a @font-face declaration
  // for a font you're using, you can declare them here.
  //
  // In most cases this is not necessary.
  //
  // fontMetrics: {
  //   fonts: ['Inter', { family: 'Some Custom Font', src: '/path/to/custom/font.woff2' }],
  // },
})
```

That's it!

## How it works

Nuxt will scan your `@font-face` rules and generate fallback rules with the correct metrics. For example:

```css
@font-face {
  font-family: 'Roboto';
  font-display: swap;
  src: url('/fonts/Roboto.woff2') format('woff2'), url('/fonts/Roboto.woff') format('woff');
  font-weight: 700;
}
/* This will be generated. */
@font-face {
  font-family: 'Roboto fallback';
  src: local('BlinkMacSystemFont'), local('Segoe UI'), local('Roboto'), local('Helvetica Neue'),
    local('Arial'), local('Noto Sans');
  ascent-override: 92.7734375%;
  descent-override: 24.4140625%;
  line-gap-override: 0%;
}
```

Then, whenever you use `font-family: 'Roboto'`, Nuxt will add the fallback to the font-family:

```css
:root {
  font-family: 'Roboto';
  /* This becomes */
  font-family: 'Roboto', 'Roboto fallback';
}
```

## Using outside of Nuxt

The core of this module will work outside of Nuxt, and has been separated into a separate library: [`fontaine`](https://github.com/unjs/fontaine). Check it out!

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## Credits

This would not have been possible without:

- amazing tooling and generated metrics from [capsizecss](https://seek-oss.github.io/capsize)
- suggestion and algorithm from [Katie Hempenius](https://katiehempenius.com/) & [Kara Erickson](https://github.com/kara) on the Google Aurora team - see [notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub).

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/fontaine?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/fontaine
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/fontaine?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/fontaine
[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt-modules/fontaine/ci/main?style=flat-square
[github-actions-href]: https://github.com/nuxt-modules/fontaine/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/nuxt-modules/fontaine/main?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-modules/fontaine
