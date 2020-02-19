const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isDev = mode => mode === "development";

module.exports = (env, { mode } = { mode: "development" }) => ({
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "docs"),
    chunkFilename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(png|ttf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
    mainFiles: ["index"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        // disable default chunks
        default: false,
        vendors: false,

        // put modules required from node_modules or vendor folders in vendor chunk
        vendor: {
          test: /node_modules/,
          chunks: "all"
        }
      }
    }
  },

  devtool: isDev(mode) ? "cheap-eval-source-map" : false,

  devServer: {
    compress: true,
    port: 1234
  }
});
