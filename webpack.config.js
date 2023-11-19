const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const { mode = 'development' } = argv;

    return {
        mode: mode,
        target: 'node',
        entry: Path.resolve(__dirname, './src/index.js'),
        output: {
            path: [__dirname, 'dist/'].join('/'),
            filename: 'bundle.js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    Path.resolve(__dirname, './src/index.html')
                ],
            }),
        ],
        externals: {
            bufferutil: "bufferutil",
            "utf-8-validate": "utf-8-validate",
        },
    }
};
