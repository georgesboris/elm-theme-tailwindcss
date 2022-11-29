# elm-theme-tailwindcss

Use [elm-theme](https://package.elm-lang.org/packages/uncover-co/elm-theme/latest/) with [Tailwind CSS](https://tailwindcss.com/).

## Setup

Install this package as a development dependency.

```
npm i -D elm-theme-tailwindcss
```

Then set it up as a [tailwind plugin](https://tailwindcss.com/docs/plugins).

```js
// tailwind.config.js

module.exports = {
  plugins: [
    require("elm-theme-tailwindcss")
  ]
}
```

## Strict Mode

If you want to make sure your codebase can only use elm-theme values, you can set `strict` option to `true`. This will disable tailwind's default colors and font families. It will also set some base styles so all your html elements are using your theme design tokens.

```js
  
// tailwind.config.js

module.exports = {
  plugins: [
    require("elm-theme-tailwindcss")({strict: true})
  ]
}
```

## Extra Colors

You can pass in your [elm-theme's extra colors](https://package.elm-lang.org/packages/uncover-co/elm-theme/2.0.0/Theme#withExtraValues) to your config as well if you wanna add extra colors to your theme (e.g. data visualization colors that fall out of the scope of the usual primary, secondary, etc, color schema).

Note that this can be used with or without strict mode.

```js
  
// tailwind.config.js

module.exports = {
  plugins: [
    require("elm-theme-tailwindcss")({colors: ["cyan", "magenta", "yellow", "black"]})
  ]
}
```
