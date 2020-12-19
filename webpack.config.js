module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "./dist/main.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },

            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
};