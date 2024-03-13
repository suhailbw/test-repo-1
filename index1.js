const i18next = require('i18next');
const fs = require("fs");

const files = fs.readdirSync("lang/");
const translationMap = {};
for(const f of files) {
    const data = fs.readFileSync(`lang/${f}`, {encoding: "utf-8"});
    const code = f.split(".")[0];
    const d = JSON.parse(data);
    const transMap = {}
    for(const source in d) {
        transMap[source] = d[source].string;
    }
    translationMap[code] = transMap;
}

// Initialize i18next
i18next.init({
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language if the current language translations are missing
  resources: {
    en: {
      translation: translationMap["en"]
    },
    es: {
      translation: translationMap["es"]
    },
    fr: {
        translation: translationMap["fr"]
    },
    hi: {
        translation: translationMap["hi"]
    }
  },
  interpolation: {
    prefix: '{',
    suffix: '}'
  }
}, (err, t) => {
    if (err) return console.error(err);

    // Use i18next to get translated strings with variable replacement
    console.log(t('Hello, {name} !', { name: 'John' }), ".."); // Output: "Hello, John!"
  
    // Change language to Spanish and get the translated string
    i18next.changeLanguage('es', () => {
      console.log(t('Hello, {name} !', { name: 'John' })); // Output: "¡Hola, John!"
    });

    // Change language to Spanish and get the translated string
    i18next.changeLanguage('es', () => {
        console.log(t('Hello, {name} !', { name: 'John' })); // Output: "¡Hola, John!"
      });
});
