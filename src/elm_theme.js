/**
 * Constants
 */

const NAMESPACE = "w";

function cssVar(id) {
  return `var(--${NAMESPACE}-${id})`;
}

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
 * Border Radius
 */

const borderRadius = {
  none: "0",
  xs: cssVar("--border-xs"),
  sm: cssVar("--border-sm"),
  DEFAULT: cssVar("--border-md"),
  lg: cssVar("--border-lg"),
  xl: cssVar("--border-xl"),
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
  return colorVariants.reduce((accum, variant) => {
    accum[`${variable}-${variant}`] = `var(--${NAMESPACE}-${variable}-${variant})`;
    return accum;
  }, acc);
}, {});

/**
 * Colors
 */


module.exports = {
  optionsHandler: (userOptions) => {
    const options = userOptions || {};

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
  themeHandler: (userOptions) => {
    const options = userOptions || {};
    const extraColors = options.extraColors || {};

    const values = {
      fontFamily,
      borderRadius, 
      colors: {
        black: "#000000",
        white: "#ffffff",
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        ...extraColors,
        ...colors,
      },
    };

    return (options.strict)
      ? { theme: values }
      : { theme: { extend: values } };
  }
};
