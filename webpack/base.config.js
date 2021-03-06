const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const DEV_ENV = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "../src/app/index.js")
  },
  output: {
    filename: DEV_ENV
      ? "[name].bundle.[hash].js"
      : "[name].bundle.[hash].min.js",
    chunkFilename: DEV_ENV
      ? "[name].bundle.[chunkhash].js"
      : "[name].bundle.[chunkhash].min.js",
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
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: DEV_ENV ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            options: DEV_ENV
              ? { sourceMap: true }
              : {
                  publicPath: path.resolve(
                    __dirname,
                    "../dist/~assets/stylesheets"
                  )
                }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: DEV_ENV ? true : false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: DEV_ENV ? true : false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: DEV_ENV ? true : false,
              ident: "postcss",
              plugins: [tailwindcss, autoprefixer]
            }
          }
        ],
        include: path.resolve(__dirname, "../")
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{ loader: "url-loader", options: { limit: 100000 } }]
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
