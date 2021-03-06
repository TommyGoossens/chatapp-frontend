// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: "src",
    browsers: ["ChromeHeadless"],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage/frontend"),
      fixWebpackSourcePaths: true,
      reports: ["html", "lcovonly", "text-summary"],
    },
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    logLevel: config.LOG_INFO,
    plugins: [
      require("karma-jasmine"),
      require('karma-chrome-launcher'),
      // require("karma-phantomjs-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    port: 9876,
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ["progress", "coverage-istanbul"]
      : ["progress", "kjhtml"],
    restartOnFileChange: true,
    singleRun: true,
  });
};

//
// module.exports = function (config) {
//   config.set({
//     frameworks: ['mocha', 'chai'],
//     basePath: "src",
//     files: ['*.spec.ts'],
//     reporters: ['progress'],
//     port: 9876,  // karma web server port
//     colors: true,
//     logLevel: config.LOG_INFO,
//     browsers: ['ChromeHeadless'],
//     autoWatch: false,
//     // singleRun: false, // Karma captures browsers, runs the tests and exits
//     concurrency: Infinity
//   })
// }
