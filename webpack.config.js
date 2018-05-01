
module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'collections.js',
    library: "Collections",
    libraryTarget: "umd", 
    umdNamedDefine: true
  },,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ ['es2015', {"loose": true}]],  
          plugins: [ ["transform-es3-member-expression-literals"], ["transform-es3-property-literals"], ["transform-proto-to-assign"], 
          ["transform-es2015-classes", {"loose": true}], ["transform-object-set-prototype-of-to-assign"]]
        }, 
  
      }, 
       {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        watch: true
      }
    ]
  }
};