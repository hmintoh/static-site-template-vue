const path = require("path");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
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
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: "vue-style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              ident: "postcss",
              plugins: [tailwindcss, autoprefixer]
            }
          }
        ],
        include: path.resolve(__dirname, "../")
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          { loader: "url-loader?limit=100000" },
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
});
