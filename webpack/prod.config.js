const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");

module.exports = merge(baseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // {
        //   loader: "sass-resources-loader",
        //   options: {
        //     resources: [
        //       path.resolve(__dirname, "../src/styles/tokens/_.scss")
        //     ]
        //   }
        // }
        include: path.resolve(__dirname, "../")
      }
    ]
  },
  plugins: [
    // Optimise images
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: {
        // Lossless conversion to progressive.
        progressive: true
      },
      optipng: {
        optimizationLevel: 5
      },
      pngquant: {
        // Instructs pngquant to use the least amount of colors required
        // to meet or exceed the max quality.
        // Min and max are numbers in range 0 (worst) to 1 (perfect), similar to JPEG.
        quality: "50-80"
      },
      gifsicle: {
        // Interlace gif for progressive rendering.
        interlaced: true,
        // Determines how much optimization is done
        optimizationLevel: 3
      },
      svgo: {
        options: {
          cleanupAttrs: true,
          removeDoctype: true
        }
      }
    }),

    // Extract imported CSS into .css files
    new MiniCssExtractPlugin({
      filename: "[name].[hash].min.css",
      chunkFilename: "[id].[hash].min.css"
    }),

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
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
