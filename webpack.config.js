const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./node_modules'),
    ]
}
 
};