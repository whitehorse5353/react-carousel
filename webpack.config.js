var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  }
];
console.log(path.resolve('src', 'main.js'));
module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src',
'main.js'),
  output: {
     path: __dirname, filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  }
};
