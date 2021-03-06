const path = require("path");
const common = require("./webpack.config");
const {merge} = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});