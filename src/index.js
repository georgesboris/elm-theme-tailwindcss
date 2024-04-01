const plugin = require("tailwindcss/plugin");

/**
 * Constants
 */

const NAMESPACE = "w";

/**
 * Fonts
 */

const fontVariables = {
  heading: "font-heading",
  text: "font-text",
  code: "font-code",
};

const fontFamily = {
  heading: `var(--${NAMESPACE}-${fontVariables.heading})`,
  text: `var(--${NAMESPACE}-${fontVariables.text})`,
  code: `var(--${NAMESPACE}-${fontVariables.code})`,
};

/**
 * Colors
 */

const colorVariants = [
  "bg",
  "bg-soft",
  "tint-soft",
  "tint",
  "tint-hover",
  "tint-active",
  "line-soft",
  "line",
  "line-hover",
  "line-active",
  "solid-soft",
  "solid",
  "solid-hover",
  "solid-active",
  "text-soft",
  "text"
];

const colorVariables = [
  "base",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger"
];

const colors = colorVariables.reduce((acc, variable) => {
  return colorVariants.reduce((acc, variant) => {
    return acc[`${variable}-${variant}`] = `var(--${NAMESPACE}-${variable}-${variant})`;
  }, acc),
  {}
});

/**
 * Colors
 */


module.exports = plugin.withOptions(
  (userOptions) => {
    const options = userOptions ?? {};

    return ({ addBase }) => {
      if (options.strict) {
        addBase({
          body: {
            background: colors["base-bg"],
            color: colors["base-text"],
            fontFamily: fontFamily.text,
          },
          h1: {
            fontFamily: fontFamily.heading,
          },
          h2: {
            fontFamily: fontFamily.heading,
          },
          h3: {
            fontFamily: fontFamily.heading,
          },
          h4: {
            fontFamily: fontFamily.heading,
          },
          h5: {
            fontFamily: fontFamily.heading,
          },
          h6: {
            fontFamily: fontFamily.heading,
          },
          code: {
            fontFamily: fontFamily.code,
          },
        });
      }
    };
  },
  (userOptions) => {
    const options = userOptions ?? {};
    const extraColors = options.colors || {};

    if (options.strict) {
      return {
        theme: {
          fontFamily,
          colors: {
            black: "#000000",
            white: "#ffffff",
            current: "currentColor",
            transparent: "transparent",
            ...extraColors,
            ...colors,
          },
        },
      };
    }

    return {
      theme: {
        extend: {
          fontFamily,
          colors: {
            ...extraColors,
            ...colors,
          },
        },
      },
    };
  }
);
