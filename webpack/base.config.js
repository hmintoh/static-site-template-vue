const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "../src/app/index.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "~App": path.resolve(__dirname, "../src/app"),
      "~Styles": path.resolve(__dirname, "../src/styles"),
      "~Scripts": path.resolve(__dirname, "../src/scripts"),
      "~Assets": path.resolve(__dirname, "../src/assets"),
      "~Components": path.resolve(__dirname, "../src/components"),
      "~Views": path.resolve(__dirname, "../src/views")
    }
  },
  plugins: [
    new VueLoaderPlugin(),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/public/index.html"),
      filename: path.resolve(__dirname, "../dist/index.html"),
      inject: "head",
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/public"),
        to: path.resolve(__dirname, "../dist")
      },
      {
        from: path.resolve(__dirname, "../src/assets/images"),
        to: path.resolve(__dirname, "../dist/_assets/images")
      },
      {
        from: path.resolve(__dirname, "../src/assets/fonts"),
        to: path.resolve(__dirname, "../dist/_assets/fonts")
      }
    ])
  ]
};
