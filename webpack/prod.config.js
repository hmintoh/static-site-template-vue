const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    // Pre-render the app
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, "../dist"),
      outputDir: path.join(__dirname, "../dist"),
      indexPath: path.join(__dirname, "../dist/index.html"),

      routes: ["/"],

      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: "app.rendered",
        inject: {
          prerendered: true
        },
        injectProperty: "__PRERENDER_INJECTED",
        headless: true
      })
    })
  ]
});
