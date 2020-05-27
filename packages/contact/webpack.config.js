var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const AutomaticVendorFederation = require("@module-federation/automatic-vendor-federation");
const exclude =['webpack','webpack-cli','webpack-dev-server','html-webpack-plugin'];
const packageJson=require('./package.json');
const ignoreVersion=['react','react-dom'];
module.exports = {
    mode: 'development',
    entry:"./src/index.js",
    output:{
        publicPath: "http://localhost:3003/"
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
      port: 3003
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
            name:'app_contact',
            filename: 'remoteEntry.js',
            library: {type:'var', name:'app_contact'},
            exposes:{
             AppContainer:'./src/index',
            },
            //shared:['react','react-dom','react-bootstrap']
            shared:AutomaticVendorFederation({
                ignoreVersion,
                packageJson,
                ignorePatchVersion:true,
                shareFrom:["dependencies","devDependencies"],
                exclude,
            })
        }),

        
    ],


}