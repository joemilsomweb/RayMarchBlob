const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copy_plugin = new CopyWebpackPlugin([ 
        {
         from : "./src/CDN_PATH/css",
         to : path.resolve('./dist/CDN_PATH/css')
        },
        {
         from : "./src/CDN_PATH/images",
         to : path.resolve('./dist/CDN_PATH/images')
        },
        {
         from : "src/CDN_PATH/shaders",
         to : path.resolve('./dist/CDN_PATH/shaders')
        }
 ]);

module.exports = copy_plugin;