// let debug = process.env.NODE_ENV !== 'production';
const debug = false;

const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'scripts'),
  build: path.join(__dirname, 'dist'),
};

module.exports = {
  devtool: 'inline-sourcemap',
  entry: {
    app: PATHS.app,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs','transform-class-properties','transform-decorators-legacy']
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:
            {
              importLoaders: 1,
             }
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=dist/assets/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
          'url-loader?limit=100000'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
      },
    ],
  },
  output: {
    path: PATHS.build,
    filename: 'experience.js',
  },
  plugins: []
};
