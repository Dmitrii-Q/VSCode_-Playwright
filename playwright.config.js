const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false,
    slowMo: 5000,
    devtools: true,
    baseURL: 'https://netology.ru',
  },
});
