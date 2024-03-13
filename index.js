/**
 * https://help.transifex.com/en/articles/6265125-github-installation-and-configuration
 * https://help.transifex.com/en/articles/6220794-gettext-po
 * https://developers.transifex.com/docs/cli
 * https://developers.transifex.com/docs/using-the-client
 * https://developers.transifex.com/docs/javascript-sdk-missing-translations
 * https://github.com/BetterWorks/haven/blob/main/src/plugins/transifex.ts
 * Token: 1/5664fccb18d7c9b9526ec21d2dde5056464825fc
 * Secret: 1/758d0cf022e935df6dc31b29824c02be50e53fb8
 *
 * push: ./node_modules/.bin/txjs-cli push index.js --token=1/5664fccb18d7c9b9526ec21d2dde5056464825fc --secret=1/758d0cf022e935df6dc31b29824c02be50e53fb8
 * fake push: ./node_modules/.bin/txjs-cli push index.js --token=1/5664fccb18d7c9b9526ec21d2dde5056464825fc --secret=1/758d0cf022e935df6dc31b29824c02be50e53fb8 --fake
 * pull:  ./node_modules/.bin/txjs-cli pull --token=1/5664fccb18d7c9b9526ec21d2dde5056464825fc --secret=1/758d0cf022e935df6dc31b29824c02be50e53fb8 -f lang/
 */

const { tx, t, SourceStringPolicy } = require("@transifex/native");

tx.init({
  missingPolicy: new SourceStringPolicy(),
  token: "1/5664fccb18d7c9b9526ec21d2dde5056464825fc",
  secret: "1/758d0cf022e935df6dc31b29824c02be50e53fb8",
});

async function loadAndUseTranslations() {
  // Fetch translations for the first locale (e.g., English)
  await tx.setCurrentLocale("en");
  await tx.fetchTranslations("en");

  // Use translations for the first locale
  console.log(t("Hello, {name} !", { name: "John" })); // Output should be "Hello, John!" in English

  // Fetch translations for the second locale (e.g., Spanish)
  await tx.setCurrentLocale("es");
  await tx.fetchTranslations("es");

  // Use translations for the second locale
  console.log(t("Hello, {name} !", { name: "John" })); // Output should be the Spanish translation

  // Fetch translations for the second locale (e.g., Spanish)
  await tx.setCurrentLocale("hi");
  await tx.fetchTranslations("hi");

  // Use translations for the second locale
  console.log(t("Hello, {name} !", { name: "John" })); // Output should be the hi translation

  // LOADS FROM THE CACHE AND DOES NOT MAKE THE NETWORK CALL
  await tx.setCurrentLocale("es");
  await tx.fetchTranslations("es");

  // Use translations for the second locale
  console.log(t("Hello, {name} !", { name: "John" })); // Output should be the Spanish translation
}

// Call the function to load and use translations
loadAndUseTranslations();
