const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    viewportWidth: 2000,
    viewportHeight: 1500,
    video: true,
    screenshotOnRunFailure: true,

    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json"
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
