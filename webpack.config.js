// Based off tutorials from
//
// https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack

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
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test : /\.jsx?/, exclude: /(node_modules|bower_components)/, loaders : ['react-hot','babel?cacheDirectory'] },
            { test: /\.scss$/, exclude: /(node_modules|bower_components)/, loaders: ['style', 'css', 'sass'] }
        ]
    }
};
