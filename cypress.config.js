const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://demoqa.com', // URL base de tus pruebas
      reporter: 'mochawesome', // Habilita Mochawesome
      reporterOptions: {
      reportDir: 'cypress/reports', // Carpeta donde se guardarán los reportes
      overwrite: false, // No sobrescribas reportes previos
      html: true, // Generar reportes en HTML
      json: true, // Generar reportes en JSON
      },
      video: true, // Grabar videos de las pruebas
      screenshotOnRunFailure: true, // Capturar pantallas en caso de error

    setupNodeEvents(on, config) {
      // implement node event listeners here
       specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
       experimentalFetchPolyfill: false
      
   
    },

    viewportWidth: 2000,
    viewportHeight: 1500,
 
  },
});





module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com', // URL base de tus pruebas
    reporter: 'mochawesome', // Habilita Mochawesome
    reporterOptions: {
      reportDir: 'cypress/reports', // Carpeta donde se guardarán los reportes
      overwrite: false, // No sobrescribas reportes previos
      html: true, // Generar reportes en HTML
      json: true, // Generar reportes en JSON
    },
    video: true, // Grabar videos de las pruebas
    screenshotOnRunFailure: true, // Capturar pantallas en caso de error
  },
});
