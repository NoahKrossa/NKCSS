const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, options) => {
  
  const isDevelopment = options.mode === 'development'

  return {
    entry:[ "./js/main.js", './sass/main.scss'],

    output: {
      filename: isDevelopment? '[name].js': '[name]-[hash].min.js',
      chunkFilename: isDevelopment? '[id].js': '[id]-[hash].min.js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        /* JS config */
        {
          exclude: /node_modules/,
          test: /\.m?js$/,
          use: "babel-loader",
        },

        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isDevelopment? 'css/[name].min.css': 'css/[name]-[hash].min.css',
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader?-url'
            },
      
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.sass'],
    },
    devtool:isDevelopment? 'source-map': 'inline-source-map',

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })],
  };
};
