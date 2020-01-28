const path = require("path");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const CopyPlugin = require("copy-webpack-plugin");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [
    withCSS,
    {
      distDir: "build",
      webpack: function(config) {
        config.plugins.push(
          new CopyPlugin([
            {
              from: "server/",
              to: path.join(__dirname, "./build/server/[name].[ext]"),
              context: path.resolve(__dirname),
              toType: "template"
            }
          ])
        ),
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 100000,
                name: "[name].[ext]"
              }
            }
          });
        return config;
      }
    }
  ],
  [
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]"
      }
    }
  ]
]);
