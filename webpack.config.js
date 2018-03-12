if(!Object.create){
Object.create = function(proto, propertiesObject) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object: " + proto);
  } else if (proto === null) {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
    );
  }

  if (typeof propertiesObject != "undefined") {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support a second argument."
    );
  }

  function F() {}
  F.prototype = proto;

  return new F();
};
}

module.exports = {
  entry: './src/main.js',
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
          plugins: [ "transform-es3-member-expression-literals", "transform-es3-property-literals"]
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