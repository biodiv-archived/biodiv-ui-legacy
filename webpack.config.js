module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
     { test: /\.coffee$/, loader: 'coffee-loader' },
     { test: /\.es6$/, loader: 'babel-loader' },
     { test: /\.jsx$/, loader: 'babel-loader'},
     // handle stylesheets required from node packages
     { test: /\.css$/, loader: 'style-loader!css-loader'},
     // need to load all react-infinte modules via babel since it contains es6
     { test: /\.js$/, include: path.join(rootPath, 'node_modules', 'react-infinite'), loader: 'babel-loader' },
     // expose flux instance globally as $flux... must use coffe-loader if coffee-script
     { test: path.join(rootPath, 'frontend', 'javascripts', 'flux'), loader: 'expose?$flux!coffee-loader'},
   ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host:"192.168.4.176",
    port: 3004
  }
};
