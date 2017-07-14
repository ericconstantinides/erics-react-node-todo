module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/app.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/public/',
    filename: './public/js/bundle.js'
  },
  module: {
    rules: [ // was "loaders"
      {
        // test: /\.jsx?$/,
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { // was "use"
          presets: [
            'react',
            'es2015',
            'stage-1'
          ],
          plugins: [
            'react-html-attrs', // lets you use attribute "class" instead of "className" and "for" instead of "htmlFor"
            'transform-class-properties', // ES7 feature to allow for "static" class properties
            'transform-decorators-legacy', // allows us to use "decorators"
          ],
        }
      }
    ]
  }
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './'
  // }
}


/*

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/js'), // "__dirname" is the root
    // publicPath: "/assets/",
    // filename: 'app.bundle.js'
    filename: '[name].bundle.js' // [name] dynamically assigns based on entry names above
  },
  module: {
    rules: [ // was "loaders"
      {
        // test: /\.jsx?$/,
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { // was "use"
          presets: [
            // 'react',
            'es2015',
            'stage-0'
          ],
          // plugins: [
            // 'react-html-attrs', // lets you use attribute "class" instead of "className" and "for" instead of "htmlFor"
            // 'transform-class-properties', // ES7 feature to allow for "static" class properties
            // 'transform-decorators-legacy', // allows us to use "decorators"
          // ],
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // make
      filename: "app.css",
      disable: true, // doesn't work with HMR
      allChunks: true
    }),
    // enable HMR globally:
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates:
    new webpack.NamedModulesPlugin(),
  ]
};
*/