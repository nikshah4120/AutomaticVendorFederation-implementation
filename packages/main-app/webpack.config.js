var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
//const {DynamicFederationPlugin} = require('dynamic-federation-plugin/index');
module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output:{

        publicPath: "http://localhost:3000/"
    },
    module:{
        rules:[
           {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use: {
                loader: 'babel-loader',
                options:{
                    presets: [
                       '@babel/preset-env',
                       '@babel/preset-react'
                    ]
                 }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader','style-loader','sass-loader']
            },
            {
                test: /\.(jpe?g|svg|gif|png)$/i,
                use: 'file-loader'
            }
        ]
    },
    devServer:{
     contentBase: path.join(__dirname,"dist"),
      port: 3000
    },
    optimization: {
        splitChunks: {
         cacheGroups: {
             vendor:{
                test: /node_modules/,
                chunks: "initial",
                name: "vendor",
                enforce: true
             }
        }
    }
      },
      plugins:[
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,'public/index.html'),
            filename: 'index.html'
        }),
       new ModuleFederationPlugin({
            name:'app_main',
            library: {type:'var', name:'app_main'},
            remotes:{
              app_home: 'app_home',
              app_introduction: 'app_introduction',
              app_contact: 'app_contact',
            },
            shared:['react','react-dom']
        }),
      //    new DynamicFederationPlugin({
        //     remotes:{
          //     app_contact: 'app_contact',
           // },
        //}),
        
    ],


}