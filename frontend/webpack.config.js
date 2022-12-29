module.exports = {
    resolve:{
        fallback:{"stream": require.resolve("stream-browserify"),
        "path": false,
        "zlib": false,
        "path": false,
        "util": false,
        "crypto-browserify": require.resolve('crypto-browserify')           
        }
}
}