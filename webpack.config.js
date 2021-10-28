const MiniCssExactPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode:'none',
  entry:{
    index:'./src/index.js'
  },
  output:{
    filename:'[name].js',
    library: '[name]',
    libraryTarget: 'amd',
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use:[
          // {
          //   loader: MiniCssExactPlugin.loader
          // },
          "css-loader"
          ]
      }
    ]
  },
  plugins: [
    // new MiniCssExactPlugin({
    //   ignoreOrder:true
    // })
  ],
  externals:[
    (ctx)=>{
      return new Promise((resolve,reject)=>{
        const {
          getResolve,
        } = ctx;
        const resolver = getResolve();
        resolver(
          ctx.context,
          ctx.request
        ).then(
          (fullPath)=>{
            return resolve()
          },
          ()=>{
            return resolve(ctx.request)
          });
      });
    }
  ]
}