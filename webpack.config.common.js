var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader'} ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader'} ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                use: [{ loader: 'file-loader?name=assets/[name].[hash].[ext]' }]
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=/[name].[ext]' }]
              },
              {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=/[name].[ext]' }]
              },
              {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=/[name].[ext]' }]
              },
              {
                test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=/[name].[ext]' }]
              },
              {
                test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{ loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=/[name].[ext]' }]
              }
        ],
        exprContextCritical: false
    }
};