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
    overlay: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000 }
          }
        ]
      }
    ]
  }
});
