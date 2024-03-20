const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //watchForFileChanges:false,
  //"chromeWebSecurity": false,
  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    baseUrl: 'https://qaspicexpress.kargo360tech.com/',
    // "specPattern":[],
    // "env":{
    //   "userName":"",
    //   "password":""
    // },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    testIsolation: false,
  },
  env:{
   // URL:'https://qaspicexpress.kargo360tech.com/'
  }
});
