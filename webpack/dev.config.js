const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    clientLogLevel: "none",
    compress: true,
    contentBase: path.resolve(__dirname, "../dist"),
    disableHostCheck: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 3000,
    // noInfo: true,
    overlay: true,
    watchContentBase: true
  }
});
