const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: false,
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }), new TerserPlugin({
            sourceMap: true,
        })]
    }
});