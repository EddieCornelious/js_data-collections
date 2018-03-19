
module.exports = {
  entry: [
  "core-js/fn/array/map",
  "core-js/fn/array/filter",
  "core-js/fn/array/for-each",
  "core-js/fn/array/index-of",
  "core-js/fn/object/define-property",
  "core-js/fn/object/keys",
  "core-js/fn/object/get-own-property-descriptor",
  "core-js/fn/object/get-own-property-names", 
  "core-js/fn/object/create",
  './src/main.js'],
  output: {
    path: __dirname,
    filename: 'collections.js',
    library: "Collections",
    libraryTarget: "umd", 
    umdNamedDefine: true
  },
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