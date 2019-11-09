'use strict';

const path = require('path');

module.exports = {
    entry: {
        workerDefault: './workers/default.ts',
        countryService: './countries/CountryService.ts',
        currencyService: './currencies/currencies.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve(__dirname, 'countries', 'node_modules'),
            path.resolve(__dirname, 'currencies', 'node_modules')
        ],
    }
};