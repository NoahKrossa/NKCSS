const {resolve} = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const basePath = __dirname

module.exports = (env, options) => {
  const isDevelopment = options.mode == 'development'

  const webpackConfig = {
    resolve: {
      extensions:  ['.js']
    },

    entry: {
      nkCSS: [
        '@babel/polyfill',
        resolve(basePath, 'src', 'js', 'main.js')
      ]
    },

    output: {
      path: resolve(basePath, 'dist'),
      filename: isDevelopment? '[name].dev.js':'[chunkhash]-[name].min.js',
    },

    module: {
      rules: [
        /** babel config */
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        },

        /* CSS config */
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      contentBase: resolve(basePath, 'dist'),
      port: 9000,
      open: true
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: isDevelopment? '[name].dev.css': '[chunkhash]-name.min.css',
      }),
      new OptimizeCSSAssetPlugin({
        cssProcessor: require('cssnano'), /* It's a CSS compressor */
        cssProcessorPluginOptions: {
          preset: [
            'default', 
            { 
              discardComments: { 
                removeAll: true 
              } 
            }
          ],
        },
      }),
      new HTMLWebpackPlugin({
        template: resolve(basePath, 'src', 'index.html'),
        filename: 'index.html'
      })
    ]
  }
  
  
  
  return webpackConfig;
}