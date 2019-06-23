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
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     sourceMap: true
          //   }
          // },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [tailwindcss, autoprefixer]
            }
          }
          // {
          // loader: "sass-resources-loader"
          // options: {
          //   resources: [
          //     path.resolve(__dirname, "../src/styles/tokens/_.scss")
          //   ]
          // }
          // }
        ],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
});
