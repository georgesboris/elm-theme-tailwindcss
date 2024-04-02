const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const elmTheme = require("../src/elm_theme.js");

describe("theme handler", () => {
  it("adds elm theme variables regardless of options", () => {

    const themeKeys = ["fontFamily", "colors", "borderRadius"];
    const extraColors = ["purple", "pink"];

    const responseNoOptions = elmTheme.themeHandler();
    const responseExtraColors = elmTheme.themeHandler({ extraColors });

    assert.ok(hasKeys(responseNoOptions.theme.extend, themeKeys));
    assert.ok(hasKeys(responseExtraColors.theme.extend, themeKeys));

    const responseStrict = elmTheme.themeHandler({ strict: true });
    const responseBoth = elmTheme.themeHandler({ strict: true, extraColors });

    assert.ok(hasKeys(responseStrict.theme, themeKeys));
    assert.ok(hasKeys(responseBoth.theme, themeKeys));

  });
});

/**
 * Helpers
 */

function hasKeys(obj, targetKeys) {
  const keys = Object.getOwnPropertyNames(obj);

  
  return targetKeys.every((k) => {
    return keys.includes(k);
  });
}
