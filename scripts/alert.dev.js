// @ts-check
const { join } = require("path");
const base = (path) => join(__dirname, "../", path);

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
    mode: "development",
    entry: {
        alert2: "./src/haiwell/Alert/index.tsx",
    },
    output: {
        library: '[name]',
        libraryTarget: "var",
        filename: '[name].dev.js',
        path: base("./dist"),
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },

    optimization: {
        minimize: false
    },

    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    configFile: base("./tsconfig.dev.json"),
                },
            },
            {
                test: /\.less?$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

