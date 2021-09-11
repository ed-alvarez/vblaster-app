const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');

const common = require('./common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        host: '0.0.0.0',
        port: 8443,
        hot: true,
		historyApiFallback: true,
        https: {
            cert: fs.readFileSync(path.join(__dirname, 'ssl/localhost.crt')),
            key: fs.readFileSync(path.join(__dirname, 'ssl/localhost.key'))
        }
    }
});
