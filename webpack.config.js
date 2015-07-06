module.exports = {
    entry: "./js/index.js",
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
