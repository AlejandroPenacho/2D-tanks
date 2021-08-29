
module.exports = {
    mode : "development",
    entry : {
        "main" : `${__dirname}/src/main.ts`
    },
    output : {
        filename : "[name].js",
        path : `${__dirname}/build/`
    },
    module : {
        rules : [
            {
                test : /\.svelte/,
                use : {
                    loader : "svelte-loader",
                    options : {preprocess : require('svelte-preprocess')({})}
                }
            },
            {
                test : /\.ts$/,
                use : "ts-loader",
                exclude : /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".svelte"]
    }
}