const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'eval-source-map',

    entry: path.resolve(__dirname, 'src/main.tsx'),

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: 'ts-loader', options: { transpileOnly: true } },
          exclude: /node_modules/,
        },
        {
          oneOf: [
            {
              test: /\.module\.css$/,
              use: [
                styleLoader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: isProd
                        ? '[hash:base64:8]'
                        : '[name]__[local]',
                    },
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: [styleLoader, 'css-loader'],
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      ...(isProd
        ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]
        : []),
    ],

    devServer: {
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
