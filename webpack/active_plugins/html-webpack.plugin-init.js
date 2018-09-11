const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html_plugin = new HtmlWebpackPlugin({
            hash: true, //adds unique hash to js each time. would be better linked to git commit hash
            filename: path.resolve('./dist/index.html'),
            template : './src/index.html'
});

module.exports = html_plugin;
