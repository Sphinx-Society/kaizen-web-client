const webpack = require('webpack');
require('dotenv').config();

module.exports = new webpack.EnvironmentPlugin([
  'API_URL',
]);
