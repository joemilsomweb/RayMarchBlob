const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
  	//TODO use path resolver
  	filename: './src/js/main.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer : {
  	contentBase: path.join(__dirname, '/dist'),
    // compress: true,
  	port : 9000
  },
  //TODO put plugins into separate files for scalability
  plugins : [
	 new HtmlWebpackPlugin({
            hash: true, //adds unique hash to js each time. would be better linked to git commit hash
            filename: 'index.html',
            template : './src/index.html'
    }),
   //todo refactor with generic cdn
    new CopyWebpackPlugin([ 
        {
         from : "./src/css",
         to : path.resolve('./dist/css')
        },
        {
         from : "./src/images",
         to : path.resolve('./dist/images')
        },
        {
         from : "src/shaders",
         to : path.resolve('./dist/shaders')
        }
      ])

  ],
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./node_modules'),
    ]
}
 
};