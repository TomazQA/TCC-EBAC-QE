export const config = {
  runner: 'local',
  port: 4723,

  specs: ['../test/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:automationName': 'UiAutomator2',
      // O app já está instalado no emulador (br.com.lojaebac).
      // Usamos appPackage/appActivity em vez de "app" para não precisar
      // versionar o APK (arquivo binário grande) no repositório Git.
      'appium:appPackage': 'br.com.lojaebac',
      'appium:appActivity': '.MainActivity',
      'appium:noReset': true,
      'appium:autoGrantPermissions': true,
    },
  ],

  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  reporters: ['spec'],
};
