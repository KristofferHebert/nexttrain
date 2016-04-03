// Based off tutorials from
//
// https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack
// https://blog.scalac.io/2016/03/03/introduction-to-webpack-with-es2015-and-react.html


var webpack = require('webpack')

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
    entry: {
        helloWorld: getEntrySources([
            './js/app.jsx'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: './js/bundle.js'
    },
    module: {
        loaders: [
            { test : /\.jsx?/, exclude: /(node_modules|bower_components)/, loaders : ['react-hot','babel?cacheDirectory'] },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
