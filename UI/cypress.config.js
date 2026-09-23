const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports',
    overwrite: false,
    html: true,
    json: true
  }
});
