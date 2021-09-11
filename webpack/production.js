const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./common');

module.exports = merge(common, {
    output: {
        filename: '[hash].js'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});
