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

const fontFamily = {
  heading: cssVar("font-heading"),
  text: cssVar("font-text"),
  code: cssVar("font-code"),
};

/**
 * Border Radius
 */

const borderRadius = {
  none: "0",
  xs: cssVar("border-xs"),
  sm: cssVar("border-sm"),
  DEFAULT: cssVar("border-md"),
  lg: cssVar("border-lg"),
  xl: cssVar("border-xl"),
};

/**
 * Colors
 */

const colorVariants = [
  ["", "bg"],
  ["-dark", "bg-dark"],
  ["-tint-light", "tint-light"],
  ["-tint", "tint"],
  ["-tint-dark", "tint-dark"],
  ["-detail-dark", "detail-dark"],
  ["-detail", "detail"],
  ["-detail-light", "detail-light"],
  ["-solid-dark", "solid-dark"],
  ["-solid", "solid"],
  ["-solid-light", "solid-light"],
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
  return colorVariants.reduce((accum, [k, v]) => {
    accum[`${variable}${k}`] = cssVar(`${variable}-${v})`);
    return accum;
  }, acc);
}, {});

/**
 * Text Colors
 */

const textColorVariants = [
  ["", "text"],
  ["-light", "text-light"],
  ["-solid", "solid-text"]
];

const textColors = colorVariables.reduce((acc, variable) => {
  return textColorVariants.reduce((accum, [k, v]) => {
    if (variable === "base" && k === "") {
      accum[`${variable}-text`] = cssVar(`${variable}-${v}`);
    } else {
      accum[`${variable}${k}`] = cssVar(`${variable}-${v}`);
    }

    return accum;
  }, acc);
}, {
  light: cssVar("base-text-light"),
  default: cssVar("base-text")
});

/**
 * Text Components (default color inside backgrounds)
 */

const textComponents = colorVariables.reduce((acc, variable) => {
  acc[`.bg-${variable}-solid, .bg-${variable}-solid-light, .bg-${variable}-solid-dark`] = {
    color: cssVar(`${variable}-solid-text`)
  };

  return acc;
}, {});

/**
 * Export
 */

module.exports = {
  optionsHandler: (options = {}) => {
    return ({ addBase, addComponents }) => {
      if (options.strict) {
        addBase({
          body: {
            background: colors["base-bg"],
            color: textColors.default,
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

      addComponents(textComponents)
    };
  },
  themeHandler: (options = {}) => {
    const extraColors = options.extraColors || {};
    const strictTextColors = options.strictTextColors ?? true;


    const textColor = strictTextColors ? { textColor: textColors } : {};
    const textColorExtended = strictTextColors ? {} : { textColor: textColors };

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
      ...textColor
    };

    return options.strict
      ? { theme: { ...values, extend: textColorExtended } }
      : { theme: { extend: { ...values, ...textColorExtended }, ...textColor } };
  }
};
