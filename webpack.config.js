const path = require('path');
const fs = require('fs');


let wpPlugins = [];
//look in active plugins directory
const activePluginsDir = path.resolve(__dirname, 'webpack/active_plugins');
const pluginPaths = fs.readdirSync(activePluginsDir);

for(p of pluginPaths){
    //only initialise files that have a plugin init extension
    if(p.indexOf("plugin-init.js") !== -1){
      //require them as modules, need to remove the js for node to require properly
      wpPlugins.push(require(activePluginsDir + '/' + p.split(".js")[0]));
    }
}

module.exports = {
  entry: {
  	//TODO use path resolver
  	filename: path.resolve(__dirname,'src/CDN_PATH/js/main.js')
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/CDN_PATH')
  },
  devServer : {
  	contentBase: path.join(__dirname, '/dist'),
    // compress: true,
  	port : 9000
  },
  plugins : wpPlugins,
  resolve: {
    modules: [
      path.resolve('./src/CDN_PATH/js'),
      path.resolve('./node_modules'),
    ]
}
 
};