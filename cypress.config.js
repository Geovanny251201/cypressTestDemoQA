const { defineConfig } = require("cypress");
const fs = require('fs'); // Necesario para la tarea 'deleteFile'
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    viewportWidth: 2000,
    viewportHeight: 1500,
    video: true,
    screenshotOnRunFailure: true,

    // reporter: "cypress-multi-reporters",
    reporter: 'junit',
      reporterOptions: {
      mochaFile: 'results/test-results.xml',
      jenkinsMode: true,
      outputs: true,
      testCaseSwitchClassnameAndName: true
    },

    setupNodeEvents(on, config) {
      
      on('task', {
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return `${filePath} deleted`;
          }
          return `File not found at ${filePath}`;
        },
      });
      return config;
    },
    
     chromeWebSecurity: false // <--- desactiva la seguridad de origen cruzado
  },
});
