const plugin = require("tailwindcss/plugin");

/**
 * Constants
 */

const namespace = "theme";

const fontVariables = {
    heading: "font-heading",
    text: "font-text",
    code: "font-code",
};

const colorVariants = ["-bg", "-fg", "-aux"];
const colorChannels = "-ch";
const colorVariables = [
    "base",
    "neutral",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
];

/**
 * Fonts
 */

const fontFamily = {
    heading: toVar(`--${namespace}-${fontVariables.heading}`),
    text: toVar(`--${namespace}-${fontVariables.text}`),
    code: toVar(`--${namespace}-${fontVariables.code}`),
};

/**
 * Colors
 */

let colors = {};

colorVariables.forEach((variable) => {
    colorVariants.forEach((variant) => {
        colors[`${variable}${variant}`] = withOpacityValue(
            `--${namespace}-${variable}${variant}${colorChannels}`
        );
    });
});

module.exports = plugin.withOptions(
    (userOptions) => {
        const options = userOptions ?? {};

        return ({ addBase }) => {
            if (options.strict) {
                addBase({
                    body: {
                        background: toVar(`--${namespace}-base-bg`),
                        color: toVar(`--${namespace}-base-fg`),
                        fontFamily: toVar(fontFamily.text),
                    },
                    h1: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    h2: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    h3: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    h4: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    h5: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    h6: {
                        fontFamily: toVar(fontFamily.heading),
                    },
                    code: {
                        fontFamily: toVar(fontFamily.code),
                    },
                });
            }
        };
    },
    (userOptions) => {
        const options = userOptions ?? {};
        const extraColors = (options.colors || []).reduce((acc, color) => {
            acc[color] = withOpacityValue(`--${color}`);
            return acc;
        }, {});

        if (options.strict) {
            return {
                theme: {
                    fontFamily,
                    colors: {
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

/**
 * Helpers
 */

function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`;
        }
        return `rgb(var(${variable}) / ${opacityValue})`;
    };
}

function toVar(str) {
    return `var(${str})`;
}
