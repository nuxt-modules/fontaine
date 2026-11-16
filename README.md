# Nuxt Fontaine

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]
[![nuxt.care health](https://img.shields.io/endpoint?url=https://nuxt.care/api/badge/fontaine)](https://nuxt.care/?search=fontaine)

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

```bash
npx nuxi@latest module add fontaine
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

### Tailwind CSS

If you use Tailwind CSS and use your custom font via the config file, you will need to manually add the fallback font.

```ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default <Partial<Config>> {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Roboto fallback', ...fontFamily.sans],
      },
    },
  },
}
```

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
  src: local('Segoe UI'), local('Roboto'), local('Helvetica Neue'), local('Arial'), local('Noto Sans');
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

## Using Sass, Less or Stylus

The module runs fontaine before your preprocessor, so it only sees the raw source of the files your bundler treats as modules. If your `@font-face` rules live in a Sass, Less or Stylus partial, come from a mixin, or are pulled in with an `@import`, fontaine never sees them: the preprocessor inlines all of that first. A `font-family` set from a preprocessor variable has the same problem, because the variable still has no value when fontaine reads the source.

For these setups, turn off the module's transform and run the PostCSS plugin from the core [`fontaine`](https://github.com/unjs/fontaine) package instead. PostCSS runs after your preprocessor, so it reads plain CSS:

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/fontaine'],
  fontMetrics: { inject: false },
  postcss: {
    plugins: {
      'fontaine/postcss': {
        fallbacks: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans'],
      },
    },
  },
})
```

Do not run both at once. With the module's transform left on, the fallbacks are generated twice.

The trade-off is that the fallback `@font-face` rules are no longer inlined into the page head with `inject: false`, so the stylesheet serves them instead. The core [`fontaine`](https://github.com/unjs/fontaine#using-sass-less-or-stylus) docs cover the PostCSS plugin in more detail.

## Using outside of Nuxt

The core of this module will work outside of Nuxt, and has been separated into a separate library: [`fontaine`](https://github.com/unjs/fontaine). Check it out!

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
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

[npm-version-src]: https://npmx.dev/api/registry/badge/version/@nuxtjs/fontaine
[npm-version-href]: https://npmx.dev/package/@nuxtjs/fontaine
[npm-downloads-src]: https://npmx.dev/api/registry/badge/downloads/@nuxtjs/fontaine
[npm-downloads-href]: https://npm.chart.dev/@nuxtjs/fontaine
[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt-modules/fontaine/ci/main?style=flat-square
[github-actions-href]: https://github.com/nuxt-modules/fontaine/actions/workflows/ci.yml
[codecov-src]: https://img.shields.io/codecov/c/gh/nuxt-modules/fontaine/main?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-modules/fontaine
