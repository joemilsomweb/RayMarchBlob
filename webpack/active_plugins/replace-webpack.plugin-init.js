//TODO make functional
const webpack = require("webpack");

//replaces uses of specified strings in the output polder
const replacePlugin = new webpack.DefinePlugin({
  CDN_PATH: JSON.stringify("teststring")
});


module.exports = replacePlugin;