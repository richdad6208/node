const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  watch: true,
  plugins: [new MiniCssExtractPlugin({ filename: "css/style.css" })],
  output: {
    clean: true,
    filename: "js/main.js",
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};